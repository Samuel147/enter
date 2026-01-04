'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { ApprovalHistory } from '@/types/approval';

export default function TeacherHistoryPage() {
  const [history, setHistory] = useState<ApprovalHistory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/approvals?type=history');
      const data = await response.json();
      if (data.success) {
        setHistory(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch history:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-8">审批历史</h1>

      <Card className="p-6">
        {loading ? (
          <div className="text-center py-8 text-gray-500">加载中...</div>
        ) : history.length === 0 ? (
          <div className="text-center py-8 text-gray-500">暂无审批记录</div>
        ) : (
          <div className="space-y-4">
            {history.map((item) => (
              <div key={item.id} className="border border-gray-200 rounded-xl p-5">
                <div className="flex items-start gap-4">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                      item.action === 'approved' ? 'bg-green-100' : 'bg-red-100'
                    }`}
                  >
                    <svg
                      className={`w-6 h-6 ${item.action === 'approved' ? 'text-green-600' : 'text-red-600'}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d={item.action === 'approved' ? 'M5 13l4 4L19 7' : 'M6 18L18 6M6 6l12 12'}
                      />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-900">
                        {item.action === 'approved' ? '通过' : '拒绝'} - {item.applicationTitle}（{item.studentName}）
                      </h4>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          item.action === 'approved' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {item.action === 'approved' ? '已通过' : '已拒绝'}
                      </span>
                    </div>
                    <p className="text-gray-500 text-sm">
                      {item.reviewedAt.replace('T', ' ').substring(0, 16)} 处理
                      {item.comment && ` · 原因：${item.comment}`}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
