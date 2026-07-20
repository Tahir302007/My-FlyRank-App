import { useChat } from 'ai/react';

export function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  return (
    <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
      {messages.map((m) => (
        <div key={m.id} className="whitespace-pre-wrap my-2">
          <strong>{m.role === 'user' ? 'You: ' : 'AI: '}</strong>
          {m.content}

          {/* AI-ın çağırdığı alətlərin 4 vəziyyətini göstərən hissə */}
          {m.toolInvocations?.map((toolInvocation) => {
            const toolCallId = toolInvocation.toolCallId;

            // 1 & 2. State: İNPUT STREAMING / INPUT AVAILABLE (İşləyir...)
            if (toolInvocation.state !== 'result') {
              return (
                <div key={toolCallId} className="p-3 my-2 border border-blue-300 bg-blue-50 text-blue-700 rounded-md animate-pulse">
                  🔄 Analyzing project metrics... (Executing tool: {toolInvocation.toolName})
                </div>
              );
            }

            // 3. State: OUTPUT AVAILABLE (Gözəl Vizual Kart Nəticəsi)
            const { result } = toolInvocation;
            return (
              <div key={toolCallId} className="p-4 my-3 border rounded-xl bg-white shadow-sm border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-bold text-gray-800 text-lg">{result.projectName} Assessment</h4>
                  <span className={`px-2 py-1 text-xs font-semibold rounded ${
                    result.status === 'excellent' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {result.status.toUpperCase()}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-2 my-2">
                  <div className="p-2 bg-gray-50 rounded">
                    <p className="text-xs text-gray-500">Performance</p>
                    <p className="text-xl font-bold text-blue-600">{result.performanceScore}/100</p>
                  </div>
                  <div className="p-2 bg-gray-50 rounded">
                    <p className="text-xs text-gray-500">Accessibility</p>
                    <p className="text-xl font-bold text-purple-600">{result.accessibilityScore}/100</p>
                  </div>
                </div>

                <p className="text-sm text-gray-600 mt-2">
                  <strong>Recommendation:</strong> {result.recommendation}
                </p>
              </div>
            );
          })}
        </div>
      ))}

      <form onSubmit={handleSubmit} className="fixed bottom-0 w-full max-w-md p-2 mb-8 bg-white border border-gray-300 rounded shadow-xl">
        <input
          className="w-full p-2 border border-gray-300 rounded"
          value={input}
          placeholder="Ask AI to evaluate project..."
          onChange={handleInputChange}
        />
      </form>
    </div>
  );
}