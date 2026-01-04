'use client';

import { Application } from '@/types/application';
import { Badge } from '@/components/ui/Badge';
import { APPLICATION_STATUS_MAP } from '@/lib/constants';
import { formatRelativeTime } from '@/lib/utils';

interface ApprovalCardProps {
  application: Application;
  onViewDetail: () => void;
  onApprove: () => void;
  onReject: () => void;
}

export function ApprovalCard({ application, onViewDetail, onApprove, onReject }: ApprovalCardProps) {
  const statusConfig = APPLICATION_STATUS_MAP[application.status];
  const statusColor = statusConfig?.color as 'yellow' | 'green' | 'red';

  return (
    <div className="border border-gray-200 rounded-xl p-5 hover:border-purple-300 transition-all">
      <div className="flex items-start gap-4">
        <img
          src={application.userAvatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop'}
          alt="学生头像"
          className="w-12 h-12 rounded-full object-cover"
        />
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h4 className="font-semibold text-gray-900">
                {statusConfig.label} - {application.title} - {application.userName}
              </h4>
              <p className="text-gray-500 text-sm">
                学号：{application.studentId} · 计算机学院
              </p>
            </div>
            <Badge label={statusConfig.label} color={statusColor} />
          </div>
          <p className="text-gray-600 text-sm mb-3">{application.content}</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {application.submittedAt.replace('T', ' ').substring(0, 16)} 提交
              </span>
              <span className={application.status === 'pending' ? 'text-red-500' : ''}>
                {formatRelativeTime(application.submittedAt)}
              </span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={onViewDetail}
                className="px-4 py-2 text-purple-600 hover:bg-purple-50 rounded-lg font-medium text-sm"
              >
                查看详情
              </button>
              <button
                onClick={onApprove}
                className="px-4 py-2 bg-green-500 text-white hover:bg-green-600 rounded-lg font-medium text-sm"
              >
                通过
              </button>
              <button
                onClick={onReject}
                className="px-4 py-2 bg-red-500 text-white hover:bg-red-600 rounded-lg font-medium text-sm"
              >
                拒绝
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
