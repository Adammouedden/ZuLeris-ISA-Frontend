import React from 'react';

interface SignalVisualizerProps {
  featureMaps: number[][];
  predictedLabel: number | null;
}

const SignalVisualizer: React.FC<SignalVisualizerProps> = ({ featureMaps, predictedLabel }) => {
  if (!featureMaps || featureMaps.length === 0) return null;

  return (
    <div className="mt-10 text-white space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold">🔬 CNN Feature Map Activations</h2>
        <p className="text-sm text-gray-400">Each grid represents one filter's activation pattern.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 px-4">
        {featureMaps.map((channel, idx) => {
          const cols = Math.ceil(Math.sqrt(channel.length));
          const rows = Math.ceil(channel.length / cols);

          const matrix = [];
          for (let r = 0; r < rows; r++) {
            const row = [];
            for (let c = 0; c < cols; c++) {
              const i = r * cols + c;
              row.push(channel[i] ?? 0);
            }
            matrix.push(row);
          }

          return (
            <div key={idx} className="p-2 bg-gray-800 rounded-lg shadow-md">
              <div className="text-sm text-center mb-2">Filter {idx}</div>
              <div
                className="grid gap-[1px]"
                style={{
                  gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
                }}
              >
                {matrix.flat().map((val, i) => (
                  <div
                    key={i}
                    className="w-3 h-3 rounded-sm transition duration-300"
                    style={{
                      backgroundColor: `rgba(0, 255, 100, ${Math.min(1, Math.max(0, val))})`,
                    }}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {predictedLabel !== null && (
        <div className="text-center mt-8">
          <h3 className="text-xl font-semibold text-green-400 animate-pulse">
            ✅ Predicted Transmitter: <span className="font-mono">T{predictedLabel}</span>
          </h3>
        </div>
      )}
    </div>
  );
};

export default SignalVisualizer;
