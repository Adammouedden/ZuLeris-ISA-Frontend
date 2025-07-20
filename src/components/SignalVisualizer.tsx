import React, { useState } from 'react';

interface SignalVisualizerProps {
  predictedLabel: number | null;
  featureMapBlocks: number[][][]; // shape: [4 blocks][channels][timeSteps]
}

function chunkTo2DGrid(channel: number[], width: number): number[][] {
  const grid: number[][] = [];
  for (let i = 0; i < channel.length; i += width) {
    grid.push(channel.slice(i, i + width));
  }
  return grid;
}

const SignalVisualizer: React.FC<SignalVisualizerProps> = ({
  predictedLabel,
  featureMapBlocks,
}) => {
  const [tooltip, setTooltip] = useState<{ value: number; x: number; y: number } | null>(null);

  const handleMouseEnter = (event: React.MouseEvent<HTMLDivElement>, value: number) => {
    setTooltip({
      value: parseFloat(value.toFixed(4)), // Format to 4 decimal places for display
      x: event.currentTarget.offsetLeft + event.currentTarget.offsetWidth / 2,
      y: event.currentTarget.offsetTop + event.currentTarget.offsetHeight / 2,
    });
  };

  const handleMouseLeave = () => {
    setTooltip(null);
  };

  return (
    <div className="text-white space-y-10 relative"> {/* Added relative for tooltip positioning */}
      <h3 className="text-center text-md text-yellow-150 font-bold">
        Predicted Transmitter Label:{' '}
        <span className="text-green-400 font-semibold">
          {predictedLabel !== null ? predictedLabel+1 : 'N/A'}
        </span>
      </h3>

      {featureMapBlocks.map((block, blockIdx) => (
        <div key={blockIdx} className="space-y-4">
          <h4 className="text-center text-yellow-400 font-bold text-lg">
            Conv Block {blockIdx + 1}
          </h4>

          <div className="grid grid-cols-4 gap-6 justify-items-center">
            {block.map((channel, chIdx) => {
              const width = Math.ceil(Math.sqrt(channel.length));
              const grid2D = chunkTo2DGrid(channel, width);

              return (
                <div key={chIdx} className="space-y-1">
                  <p className="text-xs text-center text-gray-400">Ch {chIdx}</p>
                  <div className="grid gap-0.5" style={{ gridTemplateColumns: `repeat(${width}, 1fr)` }}>
                    {grid2D.flat().map((value, idx) => (
                      <div
                        key={idx}
                        className="w-4 h-4 border border-gray-700 rounded-sm relative"
                        style={{
                          backgroundColor: `rgba(0, 255, 0, ${value})`,
                        }}
                        onMouseEnter={(e) => handleMouseEnter(e, value)}
                        onMouseLeave={handleMouseLeave}
                      >
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}

      {/* Tooltip */}
      {tooltip && (
        <div
          className="absolute z-50 px-2 py-1 bg-gray-800 text-white text-xs rounded shadow-lg transition-opacity duration-300 ease-in-out"
          style={{
            left: tooltip.x,
            top: tooltip.y - 30, // Position above the cell
            transform: 'translateX(-50%)', // Center the tooltip
          }}
        >
          {tooltip.value}
        </div>
      )}
    </div>
  );
};

export default SignalVisualizer;