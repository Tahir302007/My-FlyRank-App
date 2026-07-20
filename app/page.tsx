'use client';

import { useState } from 'react';

type ToolState = 'idle' | 'input_streaming' | 'input_available' | 'output_available' | 'output_error';

export default function ChatToolDemo() {
  const [input, setInput] = useState('');
  const [status, setStatus] = useState<ToolState>('idle');
  const [resultData, setResultData] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleRunTool = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setResultData(null);

    // STATE 1: Input Streaming
    setStatus('input_streaming');

    setTimeout(async () => {
      // STATE 2: Input Available
      setStatus('input_available');

      try {
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: input }),
        });

        const data = await res.json();

        if (!res.ok) {
          // STATE 4: Output Error
          setErrorMessage(data.error || 'Execution failed');
          setStatus('output_error');
        } else {
          // STATE 3: Output Available (Uğurlu kart)
          setResultData(data.data);
          setStatus('output_available');
        }
      } catch (err) {
        setErrorMessage('Network connection error.');
        setStatus('output_error');
      }
    }, 1000);
  };

  return (
    <div className="max-w-xl mx-auto p-6 font-sans">
      <h2 className="text-2xl font-bold mb-4 text-slate-800">AI Tool Lifecycle Demo</h2>
      
      <form onSubmit={handleRunTool} className="mb-6 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type 'analyze' or 'error' to test..."
          className="flex-1 p-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700">
          Run Tool
        </button>
      </form>

      {/* STATE 1: INPUT STREAMING */}
      {status === 'input_streaming' && (
        <div className="p-4 border border-yellow-300 bg-yellow-50 text-yellow-800 rounded-lg animate-pulse mb-4">
          ⏳ <strong>State 1 (Input Streaming):</strong> Capturing prompt parameters and building tool payload...
        </div>
      )}

      {/* STATE 2: INPUT AVAILABLE */}
      {status === 'input_available' && (
        <div className="p-4 border border-blue-300 bg-blue-50 text-blue-800 rounded-lg animate-pulse mb-4">
          🔄 <strong>State 2 (Input Available):</strong> Executing <code>scoreProject</code> tool on server...
        </div>
      )}

      {/* STATE 3: OUTPUT AVAILABLE (Gözəl Komponent Kartı) */}
      {status === 'output_available' && resultData && (
        <div className="p-5 border border-slate-200 rounded-xl bg-white shadow-md mb-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-lg text-slate-800">{resultData.projectName}</h3>
            <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-emerald-100 text-emerald-800">
              {resultData.status.toUpperCase()}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-3">
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
              <span className="text-xs text-slate-500 block">Performance</span>
              <span className="text-2xl font-black text-blue-600">{resultData.performanceScore}/100</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
              <span className="text-xs text-slate-500 block">Accessibility</span>
              <span className="text-2xl font-black text-purple-600">{resultData.accessibilityScore}/100</span>
            </div>
          </div>

          <p className="text-sm text-slate-600 bg-blue-50/50 p-3 rounded-lg border border-blue-100">
            💡 <strong>Recommendation:</strong> {resultData.recommendation}
          </p>
        </div>
      )}

      {/* STATE 4: OUTPUT ERROR (Xəta Vizualı) */}
      {status === 'output_error' && (
        <div className="p-4 border border-rose-300 bg-rose-50 text-rose-800 rounded-lg mb-4">
          🚨 <strong>State 4 (Output Error):</strong> {errorMessage}
        </div>
      )}
    </div>
  );
}