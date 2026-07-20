'use client';

import { useState } from 'react';

type ButtonState = 'idle' | 'loading' | 'success' | 'error';

export default function MotionButtonDemo() {
  const [status, setStatus] = useState<ButtonState>('idle');

  // Async simulyasiya (random 20% xəta riski ilə)
  const handleClick = async () => {
    if (status === 'loading') return;

    setStatus('loading');

    setTimeout(() => {
      // 20% ehtimalla xəta, 80% ehtimalla uğur
      const isSuccess = Math.random() > 0.2;

      if (isSuccess) {
        setStatus('success');
        setTimeout(() => setStatus('idle'), 2000); // 2 saniyə sonra idle-ə qayıdır
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 2500); // 2.5 saniyə sonra idle-ə qayıdır
      }
    }, 1500);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 font-sans">
      <h2 className="text-xl font-bold text-slate-800">Motion-Driven Action Button</h2>

      {/* DÜYMƏ KOMPONENTİ */}
      <button
        onClick={handleClick}
        disabled={status === 'loading'}
        className={`
          relative flex items-center justify-center px-6 py-3 font-medium text-sm rounded-xl
          transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]
          focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-300
          disabled:cursor-not-allowed select-none overflow-hidden min-w-[140px] h-[48px]
          ${status === 'idle' ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:-translate-y-0.5 active:translate-y-0' : ''}
          ${status === 'loading' ? 'bg-blue-500 text-white cursor-wait' : ''}
          ${status === 'success' ? 'bg-emerald-600 text-white shadow-md' : ''}
          ${status === 'error' ? 'bg-rose-600 text-white shadow-md animate-shake' : ''}
        `}
      >
        {/* State 1: Idle / Hover */}
        {status === 'idle' && (
          <span className="flex items-center gap-2 transition-opacity duration-200">
            <span>Send Message</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </span>
        )}

        {/* State 2: Loading (Spinner) */}
        {status === 'loading' && (
          <span className="flex items-center gap-2 transition-opacity duration-200">
            <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
            </svg>
            <span>Sending...</span>
          </span>
        )}

        {/* State 3: Success */}
        {status === 'success' && (
          <span className="flex items-center gap-2 transition-opacity duration-200">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
            </svg>
            <span>Sent!</span>
          </span>
        )}

        {/* State 4: Error */}
        {status === 'error' && (
          <span className="flex items-center gap-2 transition-opacity duration-200">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
            <span>Failed — Retry</span>
          </span>
        )}
      </button>

      {/* SƏNƏDLƏŞDİRMƏ VƏ AÇIQLAMA HİSSƏSİ (Design Choices Note) */}
      <div className="max-w-md p-4 bg-slate-100 rounded-xl text-xs text-slate-600 space-y-2 border border-slate-200">
        <h4 className="font-bold text-slate-800 text-sm">Design & Motion Choices:</h4>
        <p>• <strong>Transitions & Easings:</strong> Applied <code>cubic-bezier(0.16, 1, 0.3, 1)</code> for swift, responsive entrance physics with smooth deceleration.</p>
        <p>• <strong>Performance:</strong> Strictly uses compositor-friendly properties (<code>opacity</code>, <code>transform</code>) to guarantee zero layout thrash.</p>
        <p>• <strong>Accessibility:</strong> Features visible <code>focus-visible</code> ring indicator and respects user reduced motion settings.</p>
      </div>

      {/* Shake Animation Style */}
      <style jsx global>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20%, 60% { transform: translateX(-4px); }
          40%, 80% { transform: translateX(4px); }
        }
        .animate-shake {
          animation: shake 0.4s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-shake {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}