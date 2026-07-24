// @ts-nocheck
'use client';

import { useChat } from 'ai/react';

export default function AgentPage() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold">Personal AI Study & Task Agent</h1>

      {/* Söhbət Tarixçəsi */}
      <div className="border p-4 rounded-xl h-[400px] overflow-y-auto space-y-3 bg-slate-50">
        {messages.map((m: any) => (
          <div key={m.id} className={`p-3 rounded-lg ${m.role === 'user' ? 'bg-blue-600 text-white ml-auto max-w-[80%]' : 'bg-white border text-slate-800'}`}>
            <p className="font-semibold text-xs opacity-75">{m.role === 'user' ? 'You' : 'Agent'}</p>
            <p>{m.content}</p>

            {/* Agent Alətlərdən İstfadə Edəndə Göstərilən Xüsusi UI Kartları */}
            {m.toolInvocations?.map((tool: any) => {
              if (tool.toolName === 'scoreProject' && tool.state === 'result') {
                const { performance, accessibility, status } = tool.result;
                return (
                  <div key={tool.toolCallId} className="mt-3 p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-slate-800 text-sm">
                    <p className="font-bold text-emerald-800">📊 Workspace Audit Results:</p>
                    <p>• Performance: <strong>{performance}/100</strong></p>
                    <p>• Accessibility: <strong>{accessibility}/100</strong></p>
                    <p>• Status: <span className="bg-emerald-200 px-2 py-0.5 rounded text-xs">{status}</span></p>
                  </div>
                );
              }
              return null;
            })}
          </div>
        ))}
      </div>

      {/* Mesaj Yazma Formu */}
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          value={input}
          onChange={handleInputChange}
          placeholder="Ask agent: 'Check my workspace score' or 'Show tasks'..."
          className="flex-1 p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        />
        <button type="submit" className="bg-blue-600 text-white px-5 py-3 rounded-xl hover:bg-blue-700 font-medium text-sm">
          Send
        </button>
      </form>
    </div>
  );
}