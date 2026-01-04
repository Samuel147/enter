'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { StudentInfo } from '@/types/approval';

export default function TeacherStudentsPage() {
  const [students, setStudents] = useState<StudentInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    // 模拟数据
    setStudents([
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
    ]);
    setLoading(false);
  };

  const filteredStudents = students.filter(
    (s) =>
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.studentId.includes(searchTerm)
  );

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-8">学生管理</h1>

      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900">学生列表</h3>
          <input
            type="text"
            placeholder="搜索学生姓名或学号"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 outline-none"
          />
        </div>

        {loading ? (
          <div className="text-center py-8 text-gray-500">加载中...</div>
        ) : filteredStudents.length === 0 ? (
          <div className="text-center py-8 text-gray-500">未找到学生</div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">学生</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">学号</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">学院</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">入学进度</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">状态</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student) => (
                <tr key={student.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <img src={student.avatar} alt="头像" className="w-8 h-8 rounded-full" />
                      <span className="font-medium text-gray-900">{student.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-gray-600">{student.studentId}</td>
                  <td className="py-4 px-4 text-gray-600">{student.college}</td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-500 h-2 rounded-full"
                          style={{ width: `${student.enrollmentProgress}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600">{student.enrollmentProgress}%</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        student.enrollmentStatus === 'completed'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-green-100 text-green-700'
                      }`}
                    >
                      {student.enrollmentStatus === 'completed' ? '已完成' : '进行中'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>
    </div>
  );
}
