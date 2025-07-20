import React from 'react';
import { Radio } from 'lucide-react';

const WaveformVisualizer: React.FC = () => {
  // Generate dummy waveform data
  const generateWaveform = (frequency: number, amplitude: number, phase: number = 0) => {
    const points = [];
    const samples = 200;
    for (let i = 0; i < samples; i++) {
      const x = (i / samples) * 100;
      const y = 50 + amplitude * Math.sin((i / samples) * frequency * Math.PI * 2 + phase);
      points.push(`${x},${y}`);
    }
    return points.join(' ');
  };

  const waveforms = [
    {
      label: 'I Channel (In-phase)',
      color: '#3B82F6',
      data: generateWaveform(4, 20),
      frequency: '2.4 GHz'
    },
    {
      label: 'Q Channel (Quadrature)',
      color: '#EF4444',
      data: generateWaveform(4, 15, Math.PI / 2),
      frequency: '2.4 GHz'
    },
    {
      label: 'Amplitude',
      color: '#10B981',
      data: generateWaveform(2, 25),
      frequency: 'Envelope'
    },
    {
      label: 'Phase',
      color: '#F59E0B',
      data: generateWaveform(3, 30, Math.PI / 4),
      frequency: 'Phase Shift'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="flex items-center justify-between p-4 bg-black/20 rounded-lg border border-white/10">
        <div className="flex items-center space-x-3">
          <Radio className="w-5 h-5 text-blue-400" />
          <div>
            <h3 className="text-sm font-medium text-white">Signal Analysis</h3>
            <p className="text-xs text-gray-400">Real-time RF signal waveforms</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm text-white font-mono">Sample Rate: 20 MHz</p>
          <p className="text-xs text-gray-400">Duration: 10ms</p>
        </div>
      </div>

      {/* Waveform Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {waveforms.map((waveform, index) => (
          <div key={index} className="bg-black/30 rounded-lg p-4 border border-white/10">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-medium text-white">{waveform.label}</h4>
              <span className="text-xs text-gray-400">{waveform.frequency}</span>
            </div>
            
            <div className="bg-gray-900 rounded-lg p-3 h-32">
              <svg width="100%" height="100%" viewBox="0 0 100 100" className="overflow-visible">
                {/* Grid lines */}
                <defs>
                  <pattern id={`grid-${index}`} width="10" height="10" patternUnits="userSpaceOnUse">
                    <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#374151" strokeWidth="0.5" opacity="0.3"/>
                  </pattern>
                </defs>
                <rect width="100" height="100" fill={`url(#grid-${index})`} />
                
                {/* Center line */}
                <line x1="0" y1="50" x2="100" y2="50" stroke="#6B7280" strokeWidth="0.5" opacity="0.5" />
                
                {/* Waveform */}
                <polyline
                  fill="none"
                  stroke={waveform.color}
                  strokeWidth="2"
                  points={waveform.data}
                  className="drop-shadow-sm"
                />
                
                {/* Glow effect */}
                <polyline
                  fill="none"
                  stroke={waveform.color}
                  strokeWidth="4"
                  points={waveform.data}
                  opacity="0.3"
                  className="blur-sm"
                />
              </svg>
            </div>
            
            {/* Signal metrics */}
            <div className="mt-3 flex justify-between text-xs">
              <span className="text-gray-400">Peak: +3.2dB</span>
              <span className="text-gray-400">RMS: -12.4dB</span>
              <span className="text-gray-400">SNR: 24.1dB</span>
            </div>
          </div>
        ))}
      </div>

      {/* Signal Properties */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white/5 rounded-lg p-3 text-center">
          <p className="text-xs text-gray-400 mb-1">Center Frequency</p>
          <p className="text-sm font-mono text-white">2.437 GHz</p>
        </div>
        <div className="bg-white/5 rounded-lg p-3 text-center">
          <p className="text-xs text-gray-400 mb-1">Bandwidth</p>
          <p className="text-sm font-mono text-white">20 MHz</p>
        </div>
        <div className="bg-white/5 rounded-lg p-3 text-center">
          <p className="text-xs text-gray-400 mb-1">Modulation</p>
          <p className="text-sm font-mono text-white">QPSK</p>
        </div>
        <div className="bg-white/5 rounded-lg p-3 text-center">
          <p className="text-xs text-gray-400 mb-1">Symbol Rate</p>
          <p className="text-sm font-mono text-white">1 Msps</p>
        </div>
      </div>
    </div>
  );
};

export default WaveformVisualizer;