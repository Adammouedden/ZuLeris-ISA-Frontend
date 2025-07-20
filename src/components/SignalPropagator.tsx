import React, { useEffect, useState } from 'react';

// declare ort from global window after it's loaded
declare const ort: any;

interface SignalPropagatorProps {
  onPrediction: (result: { label: number; featureMapBlocks: number[][][] }) => void;
}

const SignalPropagator: React.FC<SignalPropagatorProps> = ({ onPrediction }) => {
  const [transmitters, setTransmitters] = useState<string[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [signals, setSignals] = useState<{ [key: string]: number[][][] }>({});
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    const initialize = async () => {
      try {
        const res = await fetch('/rf_signals.json');
        const json = await res.json();
        setSignals(json);
        setTransmitters(Object.keys(json));

        // Set WebAssembly config BEFORE creating session
        ort.env.wasm.wasmPaths = '/';
        ort.env.wasm.simd = true;
        ort.env.wasm.proxy = false;
        ort.env.wasm.numThreads = 1;

        await ort.env.ready;

        const session = await ort.InferenceSession.create('/cnn_rf_with_layers.onnx', {
          executionProviders: ['wasm'],
        });

        console.log('[SignalPropagator] ONNX model loaded:', session);
        console.log('Input:', session.inputNames);
        console.log('Output:', session.outputNames);
        setSession(session);
      } catch (err) {
        console.error('[SignalPropagator] Initialization failed:', err);
      }
    };

    initialize();
  }, []);

  const handleRun = async () => {
    if (!session || !selected || !signals[selected]) return;
    setLoading(true);

    try {
      const samples = signals[selected];
      const randomSample = samples[Math.floor(Math.random() * samples.length)];
      const flat = new Float32Array(randomSample.flat());
      const tensor = new ort.Tensor('float32', flat, [1, 2, 128]);

      const inputName = session.inputNames[0];
      const output = await session.run({ [inputName]: tensor });
      console.log(session.outputNames); // → should now contain: conv_block1, ..., logits
      
      //CORE LOGIC FOR SIGNAL PROPAGATION VISUALIZATIONS

      const convBlock = output['conv_block1'].data as Float32Array;
      const convShape = output['conv_block1'].dims; // e.g. [1, 16, 64]

      const featureMapBlocks: number[][][] = [];

      for (let i = 1; i <= 4; i++) {
        const key = `conv_block${i}`;
        const data = output[key].data as Float32Array;
        const dims = output[key].dims; // [1, channels, time]
        const [_, channels, timeSteps] = dims;

        const block: number[][] = [];
        for (let c = 0; c < Math.min(8, channels); c++) {
          const channel = [];
          for (let t = 0; t < timeSteps; t++) {
            const idx = c * timeSteps + t;
            channel.push(data[idx]);
          }
          block.push(channel);
        }

        featureMapBlocks.push(block);
      }

      const logits = output['logits'].data;
      const label = logits.indexOf(Math.max(...logits));

      onPrediction({ label, featureMapBlocks });


      
      console.log('[SignalPropagator] Prediction sent:', label);
    } catch (err) {
      console.error('[SignalPropagator] Inference failed:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-white mt-6 space-y-4">
      <h2 className="text-xl font-semibold text-center">Select a Radio Transmitter</h2>
      <div className="flex items-center justify-center space-x-4">
        <select
          className="bg-gray-800 text-white p-2 rounded-md"
          value={selected || ''}
          onChange={(e) => setSelected(e.target.value)}
        >
          <option value="" disabled>Select transmitter</option>
          {transmitters.map((t) => (
            <option key={t} value={t}>
              Transmitter {parseInt(t)+1}
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
