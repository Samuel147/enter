// 用户类型定义
export interface User {
  id: string;
  studentId?: string;
  teacherId?: string;
  name: string;
  email: string;
  role: 'student' | 'teacher';
  avatar?: string;
  college?: string;
  major?: string;
  className?: string;
  position?: string;
  createdAt: string;
  sessionId?: string;
}

export interface Student extends User {
  role: 'student';
  studentId: string;
  gender: 'male' | 'female';
  birthDate: string;
  idCard: string;
  phone: string;
  address: string;
  politicalStatus: string;
  enrollmentStatus: 'not_started' | 'in_progress' | 'completed';
}

export interface Teacher extends User {
  role: 'teacher';
  teacherId: string;
  position: string;
  department: string;
}
