import { User } from '@/types/user';
import { mockStudents, mockTeachers } from '@/data/mock-users';

// 模拟认证状态（服务器端存储）
const userSessions = new Map<string, User>();

// 登录
export async function login(studentId: string, password: string, role: 'student' | 'teacher'): Promise<{ success: boolean; user?: User; error?: string }> {
  // 模拟验证（实际应该调用后端 API）
  if (!studentId || !password) {
    return { success: false, error: '请输入学号/工号和密码' };
  }

  if (role === 'student') {
    const student = mockStudents.find(s => s.studentId === studentId);
    if (student && password === '123456') {
      const sessionId = Date.now().toString();
      userSessions.set(sessionId, student);
      return { success: true, user: { ...student, sessionId } as User };
    }
  } else if (role === 'teacher') {
    const teacher = mockTeachers.find(t => t.teacherId === studentId);
    if (teacher && password === '123456') {
      const sessionId = Date.now().toString();
      userSessions.set(sessionId, teacher);
      return { success: true, user: { ...teacher, sessionId } as User };
    }
  }

  return { success: false, error: '学号/工号或密码错误' };
}

// 登出
export async function logout(sessionId?: string): Promise<void> {
  if (sessionId) {
    userSessions.delete(sessionId);
  }
}

// 获取当前用户
export function getCurrentUser(sessionId?: string): User | null {
  if (sessionId) {
    return userSessions.get(sessionId) || null;
  }
  return null;
}

// 检查是否已登录
export function isAuthenticated(sessionId?: string): boolean {
  return getCurrentUser(sessionId) !== null;
}

// 获取用户角色
export function getUserRole(sessionId?: string): 'student' | 'teacher' | null {
  const user = getCurrentUser(sessionId);
  return user?.role || null;
}
