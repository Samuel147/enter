// 审批统计类型
export interface ApprovalStats {
  pending: number;
  approved: number;
  rejected: number;
  approvalRate: number;
  averageProcessTime: number;
}

// 审批历史项
export interface ApprovalHistory {
  id: string;
  applicationId: string;
  applicationTitle: string;
  studentName: string;
  studentId: string;
  action: 'approved' | 'rejected';
  reviewedAt: string;
  reviewerId: string;
  reviewerName: string;
  comment?: string;
}

// 学生信息
export interface StudentInfo {
  id: string;
  name: string;
  studentId: string;
  avatar?: string;
  college: string;
  major: string;
  enrollmentProgress: number;
  enrollmentStatus: 'not_started' | 'in_progress' | 'completed';
}

// 入学流程步骤
export interface EnrollmentStep {
  id: string;
  name: string;
  description: string;
  status: 'completed' | 'in_progress' | 'pending';
  completedAt?: string;
}
