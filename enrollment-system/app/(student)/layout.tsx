import { StudentSidebar } from '@/components/student/StudentSidebar';
import { Student } from '@/types/user';

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 获取用户信息（实际项目中应该从上下文获取）
  const user: Student = {
    id: '1',
    name: '李明',
    email: 'liming@example.com',
    role: 'student',
    studentId: '20241234567',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop',
    college: '计算机学院',
    major: '计算机科学专业',
    className: '2024级计科1班',
    gender: 'male',
    birthDate: '2005-06-15',
    idCard: '11010120050615XXXX',
    phone: '138****8888',
    address: '北京市朝阳区XX路XX号XX小区XX号楼XX室',
    politicalStatus: '共青团员',
    enrollmentStatus: 'in_progress',
    createdAt: '2024-08-25',
  };

  return (
    <div className="flex min-h-screen">
      <StudentSidebar />
      <main className="flex-1 ml-64">
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}
