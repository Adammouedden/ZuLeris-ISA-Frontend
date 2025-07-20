import React, { useEffect, useState } from 'react';
import { InferenceSession, Tensor, env } from 'onnxruntime-web';

interface SignalPropagatorProps {
  onPrediction: (result: { label: number; featureMaps: number[][] }) => void;
}

const SignalPropagator: React.FC<SignalPropagatorProps> = ({ onPrediction }) => {
  const [transmitters, setTransmitters] = useState<string[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Preload signal data and ONNX model
  const [signals, setSignals] = useState<{ [key: string]: number[][][] }>({});
  const [session, setSession] = useState<InferenceSession | null>(null);

  useEffect(() => {
    const initialize = async () => {
      const res = await fetch('/rf_signals.json');
      const json = await res.json();
      setSignals(json);
      setTransmitters(Object.keys(json));

      env.wasm.wasmPaths = '/';
      await env.ready;
      const model = await InferenceSession.create('/cnn_rf_model.onnx', {
        executionProviders: ['wasm'],
      });
      setSession(model);
    };
    initialize();
  }, []);

  const handleRun = async () => {
    if (!session || !selected || !signals[selected]) return;
    setLoading(true);

    try {
      // Random sample from selected transmitter
      const samples = signals[selected];
      const randomSample = samples[Math.floor(Math.random() * samples.length)];
      const flat = new Float32Array(randomSample.flat());
      const tensor = new Tensor('float32', flat, [1, 2, 128]);

      // Run inference
      const output = await session.run({ input: tensor });
      const logits = output.output.data as Float32Array;
      const label = logits.indexOf(Math.max(...logits));

      // Simulated feature maps (Conv1 output shape: [1, 8, 64])
      const dummyFeatureMap: number[][] = Array.from({ length: 8 }, () =>
        Array.from({ length: 64 }, () => Math.random())
      );

      // Emit
      onPrediction({ label, featureMaps: dummyFeatureMap });
    } catch (err) {
      console.error('Inference failed', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-white mt-6 space-y-4">
      <h2 className="text-xl font-semibold text-center">🎛️ Choose a Transmitter</h2>
      <div className="flex items-center justify-center space-x-4">
        <select
          className="bg-gray-800 text-white p-2 rounded-md"
          value={selected || ''}
          onChange={(e) => setSelected(e.target.value)}
        >
          <option value="" disabled>Select transmitter</option>
          {transmitters.map((t) => (
            <option key={t} value={t}>
              Transmitter {t}
            </option>
          ))}
        </select>
        <button
          onClick={handleRun}
          disabled={!selected || loading}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md disabled:opacity-50"
        >
          {loading ? 'Running...' : 'Run Signal'}
        </button>
      </div>
    </div>
  );
};

export default SignalPropagator;
