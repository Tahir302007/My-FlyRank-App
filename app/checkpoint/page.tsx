'use client';

import { useState } from 'react';

export default function CapstoneCheckpoint1() {
  const [messages, setMessages] = useState<{ role: 'user' | 'ai'; text: string }[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Göndərmə və Sabotaj Məntiqi
  const handleSend = async (userText?: string) => {
    const textToSend = userText || input;
    if (!textToSend.trim()) return;

    setError(null);
    if (!userText) {
      setMessages((prev) => [...prev, { role: 'user', text: textToSend }]);
      setInput('');
    }
    setIsLoading(true);

    // 1. Simulyasiya: İnternet kəsilibsə və ya istifadəçi 'error' yazıbsa
    setTimeout(() => {
      if (textToSend.toLowerCase().includes('error')) {
        setIsLoading(false);
        setError('Network stream interrupted. The AI model failed to complete the response.');
        return;
      }

      // Uğurlu cavab
      setMessages((prev) => [
        ...prev,
        { role: 'ai', text: `Here is the processed output for: "${textToSend}". Everything is operating normally.` },
      ]);
      setIsLoading(false);
    }, 1200);
  };

  // Retry (Yenidən cəhd et) funksiyası
  const handleRetry = () => {
    if (messages.length === 0) return;
    const lastUserMessage = [...messages].reverse().find((m) => m.role === 'user');
    if (lastUserMessage) {
      handleSend(lastUserMessage.text);
    }
  };

  return (
    <div className="flex flex-col h-[100dvh] max-w-2xl mx-auto p-4 font-sans bg-slate-50 text-slate-800">
      <header className="py-3 border-b border-slate-200 flex justify-between items-center">
        <h1 className="font-bold text-lg">AI Assistant — FE-08 Checkpoint</h1>
        <span className="text-xs px-2 py-1 bg-emerald-100 text-emerald-800 rounded-full font-medium">
          System Operational
        </span>
      </header>

      {/* CHAT CONTAINER */}
      <main className="flex-1 overflow-y-auto py-4 space-y-4">
        {/* 1. DESIGNED EMPTY STATE (İlk dəfə girəndə görünən hazır təkliflər) */}
        {messages.length === 0 && !isLoading && (
          <div className="flex flex-col items-center justify-center h-full text-center p-6 bg-white rounded-2xl border border-slate-200 shadow-sm my-auto">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xl font-bold mb-3">
              💡
            </div>
            <h3 className="font-bold text-lg text-slate-800 mb-1">No messages yet</h3>
            <p className="text-sm text-slate-500 mb-4 max-w-sm">
              Start a conversation or click one of the suggested prompts below to test system responses.
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              <button
                onClick={() => handleSend('Analyze Kanban workflow status')}
                className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-2 rounded-lg border transition"
              >
                "Analyze Kanban workflow status"
              </button>
              <button
                onClick={() => handleSend('Simulate mid-stream error')}
                className="text-xs bg-rose-50 hover:bg-rose-100 text-rose-700 px-3 py-2 rounded-lg border border-rose-200 transition"
              >
                "Simulate mid-stream error"
              </button>
            </div>
          </div>
        )}

        {/* MESAJLARIN SİYAHISI */}
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={`p-3.5 rounded-xl max-w-[85%] text-sm ${
              m.role === 'user'
                ? 'bg-blue-600 text-white ml-auto rounded-br-none'
                : 'bg-white border border-slate-200 text-slate-800 mr-auto rounded-bl-none shadow-sm'
            }`}
          >
            {m.text}
          </div>
        ))}

        {/* 2. SKELETON LOADING STATE (Cavab gözləniləndə) */}
        {isLoading && (
          <div className="p-4 bg-white border border-slate-200 rounded-xl max-w-[80%] mr-auto space-y-2 animate-pulse shadow-sm">
            <div className="h-3 bg-slate-200 rounded w-3/4"></div>
            <div className="h-3 bg-slate-200 rounded w-1/2"></div>
          </div>
        )}

        {/* 3. DESIGNED ERROR STATE & RETRY ACTION (Xəta və Bərpa) */}
        {error && (
          <div className="p-4 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl mr-auto max-w-[90%] shadow-sm">
            <div className="flex items-start gap-2 mb-2">
              <span className="text-base">⚠️</span>
              <div>
                <h4 className="font-semibold text-sm">Response Interrupted</h4>
                <p className="text-xs text-rose-600 mt-0.5">{error}</p>
              </div>
            </div>
            <button
              onClick={handleRetry}
              className="mt-2 text-xs font-semibold bg-rose-600 hover:bg-rose-700 text-white px-3 py-1.5 rounded-lg transition flex items-center gap-1 shadow-sm"
            >
              🔄 Retry last request
            </button>
          </div>
        )}
      </main>

      {/* INPUT AREA (Safari Mobile 100dvh uyğunluğu ilə) */}
      <footer className="pt-2 sticky bottom-0 bg-slate-50">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type 'error' to test error handling..."
            className="flex-1 p-3 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="px-5 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-medium text-sm rounded-xl transition shadow-sm"
          >
            Send
          </button>
        </form>
      </footer>
    </div>
  );
}