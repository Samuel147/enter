// 申请类型定义
export type ApplicationType =
  | 'course_selection'
  | 'dormitory'
  | 'tuition_defer'
  | 'transfer_major'
  | 'suspend'
  | 'resume'
  | 'dorm_adjustment'
  | 'other';

export type ApplicationStatus = 'pending' | 'approved' | 'rejected';

export interface Application {
  id: string;
  userId: string;
  userName: string;
  studentId: string;
  userAvatar?: string;
  type: ApplicationType;
  title: string;
  content: string;
  attachments?: string[];
  status: ApplicationStatus;
  reviewerId?: string;
  reviewerName?: string;
  reviewComment?: string;
  submittedAt: string;
  reviewedAt?: string;
}

export interface CreateApplicationDto {
  type: ApplicationType;
  title: string;
  content: string;
  attachments?: File[];
}

export interface ReviewApplicationDto {
  action: 'approve' | 'reject';
  comment?: string;
}
