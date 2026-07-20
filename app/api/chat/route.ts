import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    // 1. Düzgün məlumat göndərildiyini yoxlayan daxili simulyasiya
    if (!message || message.trim() === '') {
      return NextResponse.json(
        { error: 'Input message is required for analysis.' },
        { status: 400 }
      );
    }

    // 2. Qəsdən xəta simulyasiyası (İstifadəçi 'error' yazsa, xəta state-ni göstərmək üçün)
    if (message.toLowerCase().includes('error')) {
      return NextResponse.json(
        { error: 'Failed to fetch project metrics: Connection timeout.' },
        { status: 500 }
      );
    }

    // 3. Uğurlu Alət (Tool) Nəticəsi
    const mockToolResult = {
      toolName: 'scoreProject',
      state: 'output_available',
      data: {
        projectName: 'Kanban Task Manager',
        performanceScore: 94,
        accessibilityScore: 98,
        status: 'excellent',
        recommendation: 'Optimize client-side image bundles to improve initial load time by 150ms.',
        timestamp: new Date().toISOString(),
      },
    };

    return NextResponse.json(mockToolResult);
  } catch (err) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}