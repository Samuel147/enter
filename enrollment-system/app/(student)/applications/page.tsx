'use client';

import { useEffect, useState } from 'react';
import { StudentHeader } from '@/components/student/StudentHeader';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Application } from '@/types/application';
import { APPLICATION_STATUS_MAP } from '@/lib/constants';

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [filter, setFilter] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/applications?userId=1`);
      const data = await response.json();
      if (data.success) {
        setApplications(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch applications:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredApplications = filter === 'all'
    ? applications
    : applications.filter(app => app.status === filter);

  return (
    <div>
      <StudentHeader title="我的申请" user={{
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
        <Card className="p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">我的申请列表</h3>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 outline-none"
            >
              <option value="all">全部状态</option>
              <option value="pending">待审批</option>
              <option value="approved">已通过</option>
              <option value="rejected">已拒绝</option>
            </select>
          </div>

          {loading ? (
            <div className="text-center py-8 text-gray-500">加载中...</div>
          ) : filteredApplications.length === 0 ? (
            <div className="text-center py-8 text-gray-500">暂无申请记录</div>
          ) : (
            <div className="space-y-4">
              {filteredApplications.map((application) => {
                const statusConfig = APPLICATION_STATUS_MAP[application.status];
                const statusColor = statusConfig?.color as 'yellow' | 'green' | 'red';

                return (
                  <div key={application.id} className="border border-gray-200 rounded-xl p-5 hover:border-primary-300 transition-all cursor-pointer">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-semibold text-gray-900">{application.title}</h4>
                          <Badge label={statusConfig.label} color={statusColor} />
                        </div>
                        <p className="text-gray-500 text-sm mb-3">{application.content}</p>
                        <div className="flex items-center gap-6 text-sm text-gray-400">
                          <span className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            {application.submittedAt.replace('T', ' ').substring(0, 10)} 提交
                          </span>
                          {application.reviewedAt && (
                            <span className={`flex items-center gap-1 ${application.status === 'approved' ? 'text-green-600' : 'text-red-600'}`}>
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={application.status === 'approved' ? 'M5 13l4 4L19 7' : 'M6 18L18 6M6 6l12 12'} />
                              </svg>
                              {application.reviewedAt.replace('T', ' ').substring(0, 10)} {application.status === 'approved' ? '通过' : '拒绝'}
                            </span>
                          )}
                        </div>
                      </div>
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
