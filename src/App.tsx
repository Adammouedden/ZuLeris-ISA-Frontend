import React, { useState } from 'react';
import { Radio, Zap, Brain, Settings } from 'lucide-react';
import SignalPropagator from './components/SignalPropagator';
import SignalVisualizer from './components/SignalVisualizer';
import IntegrationGuide from './components/IntegrationGuide';
import WaveformVisualizer from './components/WaveformVisualizer';

function App() {
  const [prediction, setPrediction] = useState<number | null>(null);
  const [featureMaps, setFeatureMaps] = useState<number[][]>([]);
  const [showGuide, setShowGuide] = useState(true);
  const [visualizationMode, setVisualizationMode] = useState<'neural' | 'waveform'>('neural');

  const handlePrediction = (result: { label: number; featureMaps: number[][] }) => {
    setPrediction(result.label);
    setFeatureMaps(result.featureMaps);
    setShowGuide(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%239C92AC%22 fill-opacity=%220.05%22%3E%3Ccircle cx=%2230%22 cy=%2230%22 r=%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40"></div>
      
      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-white/10 backdrop-blur-sm bg-black/20">
          <div className="max-w-7xl mx-auto px-6 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                  <Radio className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">RF Fingerprinter</h1>
                  <p className="text-sm text-gray-400">CNN-based Radio Signal Classification</p>
                </div>
              </div>
              
              <button
                onClick={() => setShowGuide(!showGuide)}
                className="flex items-center space-x-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-white"
              >
                <Settings className="w-4 h-4" />
                <span className="text-sm">Integration Guide</span>
              </button>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Integration Guide */}
          {showGuide && (
            <div className="mb-8">
              <IntegrationGuide />
            </div>
          )}

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Control Panel */}
            <div className="lg:col-span-1">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <Zap className="w-6 h-6 text-blue-400" />
                  <h2 className="text-xl font-semibold text-white">Signal Control</h2>
                </div>
                
                <SignalPropagator onPrediction={handlePrediction} />
                
                {/* Status Display */}
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
                        {prediction !== null ? `T${prediction}` : 'None'}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-400">Feature Maps</span>
                      <span className="text-sm text-white">
                        {featureMaps.length > 0 ? `${featureMaps.length} channels` : 'None'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Visualization Panel */}
            <div className="lg:col-span-2">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <Brain className="w-6 h-6 text-purple-400" />
                    <h2 className="text-xl font-semibold text-white">
                      {visualizationMode === 'neural' ? 'Neural Network Visualization' : 'Signal Waveforms'}
                    </h2>
                  </div>
                  
                  <div className="flex bg-white/10 rounded-lg p-1">
                    <button
                      onClick={() => setVisualizationMode('neural')}
                      className={`px-3 py-1.5 text-sm rounded-md transition-all ${
                        visualizationMode === 'neural'
                          ? 'bg-purple-500 text-white shadow-sm'
                          : 'text-gray-300 hover:text-white'
                      }`}
                    >
                      Neural
                    </button>
                    <button
                      onClick={() => setVisualizationMode('waveform')}
                      className={`px-3 py-1.5 text-sm rounded-md transition-all ${
                        visualizationMode === 'waveform'
                          ? 'bg-purple-500 text-white shadow-sm'
                          : 'text-gray-300 hover:text-white'
                      }`}
                    >
                      Waveform
                    </button>
                  </div>
                </div>
                
                {featureMaps.length > 0 || visualizationMode === 'waveform' ? (
                  visualizationMode === 'neural' ? (
                    <SignalVisualizer
                      predictedLabel={prediction}
                      featureMaps={featureMaps}
                    />
                  ) : (
                    <WaveformVisualizer />
                  )
                ) : (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-full flex items-center justify-center mb-4">
                      <Brain className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-300 mb-2">No Signal Processed</h3>
                    <p className="text-sm text-gray-500 max-w-md">
                      Select a transmitter and run a signal to see the CNN feature map activations and classification results.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Footer Stats */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Model Architecture</p>
                  <p className="text-lg font-semibold text-white">CNN</p>
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
                  <p className="text-lg font-semibold text-white">Real-time</p>
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