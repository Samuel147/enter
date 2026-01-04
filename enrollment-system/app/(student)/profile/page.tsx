'use client';

import { StudentHeader } from '@/components/student/StudentHeader';
import { Card } from '@/components/ui/Card';

export default function ProfilePage() {
  const user = {
    id: '1',
    name: '李明',
    studentId: '20241234567',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop',
    college: '计算机科学与技术学院',
    major: '计算机科学专业',
    gender: '男',
    birthDate: '2005-06-15',
    ethnicity: '汉族',
    idCard: '11010120050615XXXX',
    phone: '138****8888',
    address: '北京市朝阳区XX路XX号XX小区XX号楼XX室',
    politicalStatus: '共青团员',
    enrollmentStatus: '已完成报到',
  };

  return (
    <div>
      <StudentHeader title="个人信息" user={{
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
      }} />

      <div className="p-8">
        <div className="max-w-3xl mx-auto">
          <Card className="p-8">
            <div className="flex items-center gap-6 mb-8 pb-8 border-b border-gray-100">
              <img src={user.avatar} alt="头像" className="w-24 h-24 rounded-full object-cover" />
              <div>
                <h3 className="text-2xl font-bold text-gray-900">{user.name}</h3>
                <p className="text-gray-500">{user.studentId}</p>
                <p className="text-gray-400 text-sm mt-1">{user.college} · {user.major}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">姓名</label>
                <p className="text-gray-900 font-medium">{user.name}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">性别</label>
                <p className="text-gray-900 font-medium">{user.gender}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">出生日期</label>
                <p className="text-gray-900 font-medium">{user.birthDate}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">民族</label>
                <p className="text-gray-900 font-medium">{user.ethnicity}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">身份证号</label>
                <p className="text-gray-900 font-medium">{user.idCard}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">手机号</label>
                <p className="text-gray-900 font-medium">{user.phone}</p>
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-500 mb-1">家庭地址</label>
                <p className="text-gray-900 font-medium">{user.address}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">政治面貌</label>
                <p className="text-gray-900 font-medium">{user.politicalStatus}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">入学状态</label>
                <p className="text-green-600 font-medium">{user.enrollmentStatus}</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
