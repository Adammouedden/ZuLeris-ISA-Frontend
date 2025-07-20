import React from 'react';

interface WaveformPanelProps {
  featureMapBlocks: number[][][]; // [block][channel][time]
}

const WaveformVisualizer: React.FC<WaveformPanelProps> = ({ featureMapBlocks }) => {
  if (!featureMapBlocks || featureMapBlocks.length === 0) return null;

  return (
    <div className="space-y-10">
      {featureMapBlocks.map((block, blockIdx) => {
        const numChannels = block.length;
        const length = block[0].length;
        const avg = Array(length).fill(0);

        for (let c = 0; c < numChannels; c++) {
          for (let i = 0; i < length; i++) {
            avg[i] += block[c][i] / numChannels;
          }
        }

        const min = Math.min(...avg);
        const max = Math.max(...avg);
        const norm = avg.map((v) => (v - min) / (max - min || 1));

        return (
          <>
          <hr></hr>
          <div key={blockIdx}>
            <h3 className="text-center text-yellow-400 font-bold text-lg">
              Input signal after Conv Block {blockIdx + 1}
            </h3>
            <div className="relative w-full h-24 bg-gray-800 rounded overflow-hidden">
              <svg width="100%" height="100%">
                <polyline
                  fill="none"
                  stroke="#03f560ff"
                  strokeWidth="2"
                  points={norm
                    .map((v, i) => `${(i / norm.length) * 600},${(1 - v) * 96}`)
                    .join(' ')}
                />
              </svg>
            </div>
          </div>
          </>
        );
      })}
    </div>
  );
};

export default WaveformVisualizer;
