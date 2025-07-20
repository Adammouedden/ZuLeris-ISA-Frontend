import React, { useState } from 'react';
import { Radio, Zap, Brain } from 'lucide-react';
import SignalPropagator from './components/SignalPropagator';
import SignalVisualizer from './components/SignalVisualizer';
import ZuLerisIcon from './components/ZuLerisIcon';
import WaveformVisualizer from './components/WaveformVisualizer';


function App() {
  const [prediction, setPrediction] = useState<number | null>(null);
  const [featureMapBlocks, setFeatureMapBlocks] = useState<number[][][]>([]);
  const [showGuide, setShowGuide] = useState(true);

  const handlePrediction = ({
    label,
    featureMapBlocks,
  }: {
    label: number;
    featureMapBlocks: number[][][];
  }) => {
    setPrediction(label);
    setFeatureMapBlocks(featureMapBlocks);
    setShowGuide(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-black-900 to-slate-900">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%239C92AC%22 fill-opacity=%220.05%22%3E%3Ccircle cx=%2230%22 cy=%2230%22 r=%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40"></div>

      <div className="relative z-10">
        <header className="border-b border-white/10 backdrop-blur-sm bg-black/20">
          <div className="max-w-7xl mx-auto px-6 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <ZuLerisIcon size={40} className="ring-1 ring-white/20 shadow-md" />
                <div>
                  <h1 className="text-2xl font-bold text-white">ZuLeris Intelligence Spectrum Analyzer</h1>
                  <p className="text-sm text-gray-400">Deep Learning Model for RF Fingerprinting</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-6 py-8">
          {showGuide && <div className="mb-8">{/* Optional Guide Here */}</div>}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <Zap className="w-6 h-6 text-blue-400" />
                  <h2 className="text-xl font-semibold text-white">Signal Control</h2>
                </div>

                <SignalPropagator onPrediction={handlePrediction} />

                <div className="mt-8 p-4 bg-black/20 rounded-lg border border-white/10">
                  <h3 className="text-sm font-medium text-gray-300 mb-3">System Status</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-400">Model Status</span>
                      <span className="text-xs px-2 py-1 bg-green-500/20 text-green-400 rounded-full">
                        Ready
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-400">Last Prediction</span>
                      <span className="text-sm text-white font-mono">
                        {prediction !== null ? `T${prediction+1}` : 'None'}
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-400">Feature Map Blocks</span>
                      <span className="text-sm text-white">
                        {featureMapBlocks.length > 0
                          ? `${featureMapBlocks.length} blocks`
                          : 'None'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <Brain className="w-6 h-6 text-purple-400" />
                  <h2 className="text-xl font-semibold text-white">Neural Network Visualization</h2>
                </div>

                {featureMapBlocks.length > 0 ? (
                  <SignalVisualizer
                    predictedLabel={prediction}
                    featureMapBlocks={featureMapBlocks}
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-full flex items-center justify-center mb-4">
                      <Brain className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-300 mb-2">No Signal Processed</h3>
                    <p className="text-sm text-gray-500 max-w-md">
                      Select a transmitter and run a signal to see the CNN feature map activations rendered in two dimensions.
                    </p>
                  </div>
                )}
                   <WaveformVisualizer
                    featureMapBlocks={featureMapBlocks}
                  />
              </div>
            </div>
          </div>

          {/* Footer Stats */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Model Architecture</p>
                  <p className="text-lg font-semibold text-white">Custom Built CNN</p>
                  <p className="text-x1 font-bold text-white">98% Accurate</p>
                </div>
                <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <Brain className="w-5 h-5 text-blue-400" />
                </div>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Runtime</p>
                  <p className="text-lg font-semibold text-white">WebAssembly</p>
                </div>
                <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-purple-400" />
                </div>
              </div>
            </div>

            

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Signal Processing</p>
                  <p className="text-lg font-semibold text-white">Trained on ORACLE Dataset</p>
                </div>
                <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <Radio className="w-5 h-5 text-green-400" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  );
}

export default App;
