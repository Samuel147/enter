import { ApprovalStats, ApprovalHistory, StudentInfo, EnrollmentStep } from '@/types/approval';

export const mockApprovalStats: ApprovalStats = {
  pending: 8,
  approved: 156,
  rejected: 12,
  approvalRate: 92,
  averageProcessTime: 2.5,
};

export const mockApprovalHistory: ApprovalHistory[] = [
  {
    id: 'hist1',
    applicationId: 'app2',
    applicationTitle: '宿舍分配申请',
    studentName: '赵伟',
    studentId: '20241234570',
    action: 'approved',
    reviewedAt: '2024-09-02T10:15:00',
    reviewerId: 't1',
    reviewerName: '张老师',
  },
  {
    id: 'hist2',
    applicationId: 'app3',
    applicationTitle: '缓交学费申请',
    studentName: '孙丽',
    studentId: '20241234571',
    action: 'rejected',
    reviewedAt: '2024-09-01T16:30:00',
    reviewerId: 't1',
    reviewerName: '张老师',
    comment: '证明材料不完整',
  },
];

export const mockStudents: StudentInfo[] = [
  {
    id: '1',
    name: '李明',
    studentId: '20241234567',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=50&h=50&fit=crop',
    college: '计算机学院',
    major: '计算机科学专业',
    enrollmentProgress: 75,
    enrollmentStatus: 'in_progress',
  },
  {
    id: '2',
    name: '王芳',
    studentId: '20241234568',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&fit=crop',
    college: '计算机学院',
    major: '计算机科学专业',
    enrollmentProgress: 100,
    enrollmentStatus: 'completed',
  },
];

export const mockEnrollmentSteps: EnrollmentStep[] = [
  {
    id: 'step1',
    name: '在线报到',
    description: '完成学生信息登记，提交个人信息',
    status: 'completed',
    completedAt: '2024-09-01T09:30:00',
  },
  {
    id: 'step2',
    name: '学费缴纳',
    description: '缴纳学费、住宿费等费用',
    status: 'completed',
    completedAt: '2024-09-01T14:20:00',
  },
  {
    id: 'step3',
    name: '宿舍分配申请',
    description: '提交宿舍申请，等待辅导员审批',
    status: 'completed',
    completedAt: '2024-09-02T10:00:00',
  },
  {
    id: 'step4',
    name: '课程选择',
    description: '选择第一学期课程，等待教务处审批',
    status: 'in_progress',
  },
  {
    id: 'step5',
    name: '校园卡领取',
    description: '到指定地点领取校园卡',
    status: 'pending',
  },
];
