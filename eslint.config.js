import React from 'react';

interface SignalVisualizerProps {
  predictedLabel: number | null;
  featureMapBlocks: number[][][];
}

const SignalVisualizer: React.FC<SignalVisualizerProps> = ({
  predictedLabel,
  featureMapBlocks,
}) => {
  return (
    <div className="text-white">
      <h3 className="text-center text-md mb-4">
        Predicted Transmitter Label:{' '}
        <span className="text-green-400 font-semibold">
          {predictedLabel !== null ? predictedLabel : 'N/A'}
        </span>
      </h3>

      {featureMapBlocks.map((block, blockIndex) => (
        <div key={blockIndex} className="mb-10">
          <h4 className="text-yellow-400 text-lg font-bold text-center mb-3">
            Conv Block {blockIndex + 1}
          </h4>

          <div className="grid grid-cols-4 gap-4">
            {block.map((channel, chIdx) => (
              <div key={chIdx}>
                <h5 className="text-sm text-gray-300 text-center mb-1">Ch {chIdx}</h5>
                <div
                  className="grid gap-0.5"
                  style={{ gridTemplateColumns: `repeat(${channel.length}, 1fr)` }}
                >
                  {channel.map((value, idx) => (
                    <div key={idx} className="relative group">
                      <div
                        className="w-4 h-4 border border-gray-700 rounded-sm"
                        style={{
                          backgroundColor: `rgba(0, 255, 0, ${value})`,
                        }}
                      />
                      <span className="absolute left-1/2 -top-7 -translate-x-1/2 scale-0 group-hover:scale-100 transition-transform text-xs text-white bg-gray-800 border border-gray-600 px-1 py-0.5 rounded shadow-lg z-10 whitespace-nowrap">
                        {value.toFixed(4)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SignalVisualizer;
