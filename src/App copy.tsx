import React, { useState } from 'react';
import WasmSignalTest from './Components/WasmSignalTest';
import SignalVisualizer from './Components/SignalVisualizer';
import SignalPropagator from './Components/SignalPropagator';

const App = () => {
  const [prediction, setPrediction] = useState<number | null>(null);
  const [featureMaps, setFeatureMaps] = useState<number[][]>([]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-8 flex flex-col items-center space-y-10">
      <h1 className="text-3xl font-bold tracking-tight">ZuLeris RF Fingerprinter</h1>

      <SignalPropagator
        onPrediction={({ label, featureMaps }) => {
          setPrediction(label);
          setFeatureMaps(featureMaps);
        }}
      />

      <SignalVisualizer
        predictedLabel={prediction}
        featureMaps={featureMaps}
      />
    </div>
  );
};

export default App;
