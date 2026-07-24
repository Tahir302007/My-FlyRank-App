import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const prompt = (body.prompt || body.messages?.[body.messages?.length - 1]?.content || '').toLowerCase();

    if (prompt.includes('score') || prompt.includes('check')) {
      return NextResponse.json({
        toolName: 'scoreProject',
        result: { performance: 94, accessibility: 98, status: 'Optimal' },
        message: 'Workspace audit completed successfully.'
      });
    }

    return NextResponse.json({
      toolName: 'fetchProjectTasks',
      tasks: [
        { id: 1, title: 'Build Motion Button Lifecycle', status: 'Completed' },
        { id: 2, title: 'Write Vitest & RTL Component Tests', status: 'In Progress' },
        { id: 3, title: 'Record Checkpoint 1 MVP Demo Video', status: 'Pending' }
      ],
      message: 'Tasks retrieved successfully.'
    });
  } catch (err) {
    return NextResponse.json({ error: 'Failed' }, { status: 200 });
  }
}