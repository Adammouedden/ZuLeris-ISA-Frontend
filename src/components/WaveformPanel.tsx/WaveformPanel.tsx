// WaveformPanel.tsx
import React from 'react';

interface WaveformPanelProps {
  featureMapBlocks: number[][][]; // [block][channel][time]
}

const WaveformPanel: React.FC<WaveformPanelProps> = ({ featureMapBlocks }) => {
  if (!featureMapBlocks || featureMapBlocks.length === 0) return null;

  return (
    <div className="absolute bottom-8 left-8 w-[360px] bg-gray-900 p-4 rounded-lg shadow-lg text-white z-50">
      <h3 className="text-lg font-semibold mb-3">ConvBlock Waveforms</h3>
      <div className="space-y-4">
        {featureMapBlocks.map((block, idx) => {
          const numChannels = block.length;
          const signalLength = block[0].length;

          // Average across channels
          const avgWave = Array(signalLength).fill(0);
          for (let c = 0; c < numChannels; c++) {
            for (let t = 0; t < signalLength; t++) {
              avgWave[t] += block[c][t] / numChannels;
            }
          }

          const min = Math.min(...avgWave);
          const max = Math.max(...avgWave);
          const norm = avgWave.map((v) => (v - min) / (max - min || 1));

          return (
            <div key={idx}>
              <div className="text-xs text-gray-300 mb-1">
                Conv Block {idx + 1}
              </div>
              <div className="h-16 w-full relative bg-gray-700 rounded overflow-hidden">
                <svg width="100%" height="100%">
                  <polyline
                    fill="none"
                    stroke="#10B981"
                    strokeWidth="2"
                    points={norm
                      .map((v, i) => `${(i / norm.length) * 300},${(1 - v) * 60}`)
                      .join(' ')}
                  />
                </svg>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WaveformPanel;
