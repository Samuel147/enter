import { NextRequest, NextResponse } from 'next/server';
import { mockApplications } from '@/data/mock-applications';
import { CreateApplicationDto } from '@/types/application';

// GET - 获取申请列表
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');
  const status = searchParams.get('status');

  let applications = [...mockApplications];

  if (userId) {
    applications = applications.filter(app => app.userId === userId);
  }

  if (status) {
    applications = applications.filter(app => app.status === status);
  }

  return NextResponse.json({ success: true, data: applications });
}

// POST - 创建新申请
export async function POST(request: NextRequest) {
  try {
    const body: CreateApplicationDto = await request.json();

    const newApplication = {
      id: `app${Date.now()}`,
      userId: '1', // 模拟当前用户 ID
      userName: '李明',
      studentId: '20241234567',
      userAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop',
      type: body.type,
      title: body.title,
      content: body.content,
      status: 'pending' as const,
      submittedAt: new Date().toISOString(),
    };

    mockApplications.unshift(newApplication);

    return NextResponse.json({ success: true, data: newApplication });
  } catch (error) {
    return NextResponse.json({ success: false, error: '创建申请失败' }, { status: 500 });
  }
}
