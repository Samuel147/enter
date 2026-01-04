'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { StudentHeader } from '@/components/student/StudentHeader';
import { TimelineItem } from '@/components/student/TimelineItem';
import { Card } from '@/components/ui/Card';
import { mockEnrollmentSteps } from '@/data/mock-approvals';
import { EnrollmentStep } from '@/types/approval';

export default function StudentDashboard() {
  const [steps, setSteps] = useState<EnrollmentStep[]>(mockEnrollmentSteps);

  const completedSteps = steps.filter((s) => s.status === 'completed').length;
  const progress = Math.round((completedSteps / steps.length) * 100);

  return (
    <div>
      <StudentHeader title="我的入学流程" user={{
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
        {/* 进度概览 */}
        <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl p-6 mb-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold mb-2">入学进度：{progress}%</h3>
              <p className="text-primary-100">已完成 {completedSteps}/{steps.length} 个入学环节，加油！</p>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold">{completedSteps}/{steps.length}</div>
              <p className="text-primary-100">已完成环节</p>
            </div>
          </div>
          <div className="mt-6 bg-white/20 rounded-full h-3 overflow-hidden">
            <div className="bg-white h-full rounded-full" style={{ width: `${progress}%` }}></div>
          </div>
        </div>

        {/* 入学流程时间线 */}
        <Card className="p-8 mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6">入学流程</h3>
          <div className="space-y-6">
            {steps.map((step, index) => (
              <TimelineItem key={step.id} step={step} isLast={index === steps.length - 1} />
            ))}
          </div>
        </Card>

        {/* 快速操作 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href="/student/new-application">
            <Card className="p-6 hover cursor-pointer">
              <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">新建申请</h4>
              <p className="text-gray-500 text-sm">提交新的入学相关申请</p>
            </Card>
          </Link>

          <Link href="/student/applications">
            <Card className="p-6 hover cursor-pointer">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">查看进度</h4>
              <p className="text-gray-500 text-sm">实时追踪申请处理状态</p>
            </Card>
          </Link>

          <Card className="p-6 hover cursor-pointer">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">帮助中心</h4>
            <p className="text-gray-500 text-sm">查看常见问题与解答</p>
          </Card>
        </div>
      </div>
    </div>
  );
}
