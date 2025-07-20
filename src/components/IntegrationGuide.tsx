import React from 'react';
import { FileText, Database, Cpu, AlertCircle } from 'lucide-react';

const IntegrationGuide: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-blue-500/10 to-purple-600/10 backdrop-blur-sm border border-blue-500/20 rounded-xl p-6">
      <div className="flex items-center space-x-3 mb-6">
        <AlertCircle className="w-6 h-6 text-blue-400" />
        <h2 className="text-xl font-semibold text-white">Integration Guide</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* ONNX Model */}
        <div className="bg-white/5 rounded-lg p-4 border border-white/10">
          <div className="flex items-center space-x-2 mb-3">
            <Cpu className="w-5 h-5 text-green-400" />
            <h3 className="font-medium text-white">ONNX Model</h3>
          </div>
          <div className="space-y-2 text-sm">
            <p className="text-gray-300">Place your ONNX model file in:</p>
            <code className="block bg-black/30 p-2 rounded text-green-400 font-mono text-xs">
              /public/cnn_rf_model.onnx
            </code>
            <p className="text-gray-400 text-xs">
              The model is loaded in SignalPropagator component at line 23
            </p>
          </div>
        </div>

        {/* JSON Data */}
        <div className="bg-white/5 rounded-lg p-4 border border-white/10">
          <div className="flex items-center space-x-2 mb-3">
            <Database className="w-5 h-5 text-blue-400" />
            <h3 className="font-medium text-white">Signal Data</h3>
          </div>
          <div className="space-y-2 text-sm">
            <p className="text-gray-300">Place your JSON data file in:</p>
            <code className="block bg-black/30 p-2 rounded text-blue-400 font-mono text-xs">
              /public/rf_signals.json
            </code>
            <p className="text-gray-400 text-xs">
              Expected format: {"{"}"transmitter_id": signalArray{"}"}
            </p>
          </div>
        </div>

        {/* Configuration */}
        <div className="bg-white/5 rounded-lg p-4 border border-white/10">
          <div className="flex items-center space-x-2 mb-3">
            <FileText className="w-5 h-5 text-purple-400" />
            <h3 className="font-medium text-white">Configuration</h3>
          </div>
          <div className="space-y-2 text-sm">
            <p className="text-gray-300">Key files to modify:</p>
            <div className="space-y-1">
              <code className="block bg-black/30 p-1 rounded text-purple-400 font-mono text-xs">
                SignalPropagator.tsx
              </code>
              <code className="block bg-black/30 p-1 rounded text-purple-400 font-mono text-xs">
                SignalVisualizer.tsx
              </code>
            </div>
            <p className="text-gray-400 text-xs">
              Adjust tensor shapes and model inputs as needed
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
        <div className="flex items-start space-x-3">
          <AlertCircle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
          <div className="text-sm">
            <p className="text-yellow-300 font-medium mb-1">Quick Setup Steps:</p>
            <ol className="text-yellow-200/80 space-y-1 list-decimal list-inside">
              <li>Add your <code className="text-yellow-300">cnn_rf_model.onnx</code> to the public folder</li>
              <li>Add your <code className="text-yellow-300">rf_signals.json</code> to the public folder</li>
              <li>Install ONNX Runtime Web: <code className="text-yellow-300">npm add onnxruntime-web</code></li>
              <li>Adjust tensor shapes in SignalPropagator if needed</li>
              <li>Test with your actual data</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntegrationGuide;