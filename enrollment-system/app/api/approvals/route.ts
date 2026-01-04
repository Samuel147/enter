import { NextRequest, NextResponse } from 'next/server';
import { mockApplications } from '@/data/mock-applications';
import { mockApprovalHistory } from '@/data/mock-approvals';
import { ReviewApplicationDto } from '@/types/application';
import { ApprovalHistory } from '@/types/approval';

// GET - 获取审批统计
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type');

  if (type === 'history') {
    return NextResponse.json({ success: true, data: mockApprovalHistory });
  }

  if (type === 'stats') {
    const stats = {
      pending: mockApplications.filter(app => app.status === 'pending').length,
      approved: mockApplications.filter(app => app.status === 'approved').length,
      rejected: mockApplications.filter(app => app.status === 'rejected').length,
      approvalRate: 92,
      averageProcessTime: 2.5,
    };
    return NextResponse.json({ success: true, data: stats });
  }

  if (type === 'pending') {
    const pendingApps = mockApplications.filter(app => app.status === 'pending');
    return NextResponse.json({ success: true, data: pendingApps });
  }

  return NextResponse.json({ success: true, data: mockApplications });
}

// PUT - 审批申请
export async function PUT(request: NextRequest) {
  try {
    const body: ReviewApplicationDto & { applicationId: string } = await request.json();
    const { applicationId, action, comment } = body;

    const application = mockApplications.find(app => app.id === applicationId);

    if (!application) {
      return NextResponse.json({ success: false, error: '申请不存在' }, { status: 404 });
    }

    // 更新申请状态
    application.status = action === 'approve' ? 'approved' : 'rejected';
    application.reviewerId = 't1';
    application.reviewerName = '张老师';
    application.reviewComment = comment;
    application.reviewedAt = new Date().toISOString();

    // 添加到审批历史
    const historyItem: ApprovalHistory = {
      id: `hist${Date.now()}`,
      applicationId: application.id,
      applicationTitle: application.title,
      studentName: application.userName,
      studentId: application.studentId,
      action: action === 'approve' ? 'approved' : 'rejected',
      reviewedAt: application.reviewedAt,
      reviewerId: 't1',
      reviewerName: '张老师',
      comment,
    };

    mockApprovalHistory.unshift(historyItem);

    return NextResponse.json({ success: true, data: application });
  } catch (error) {
    return NextResponse.json({ success: false, error: '审批失败' }, { status: 500 });
  }
}
