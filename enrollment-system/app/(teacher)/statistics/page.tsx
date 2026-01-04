'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';

export default function TeacherStatisticsPage() {
  const [stats, setStats] = useState({
    weekly: { total: 176, processed: 168, pending: 8, avgTime: 2.5 },
    distribution: [
      { type: '课程选择', count: 65, color: 'purple' },
      { type: '宿舍申请', count: 20, color: 'blue' },
      { type: '缓交学费', count: 10, color: 'green' },
      { type: '其他', count: 5, color: 'gray' },
    ],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 模拟数据加载
    setLoading(false);
  }, []);

  if (loading) return <div className="text-center py-8 text-gray-500">加载中...</div>;

  const colorClasses: Record<string, string> = {
    purple: 'bg-purple-500',
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    gray: 'bg-gray-500',
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-8">数据统计</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">本周审批统计</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">总申请数</span>
              <span className="font-bold text-gray-900">{stats.weekly.total}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">已处理</span>
              <span className="font-bold text-green-600">{stats.weekly.processed}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">待处理</span>
              <span className="font-bold text-yellow-600">{stats.weekly.pending}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">平均处理时间</span>
              <span className="font-bold text-gray-900">{stats.weekly.avgTime} 小时</span>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">申请类型分布</h3>
          <div className="space-y-4">
            {stats.distribution.map((item) => (
              <div key={item.type}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-gray-600">{item.type}</span>
                  <span className="text-gray-900">{item.count}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className={`${colorClasses[item.color]} h-2 rounded-full`} style={{ width: `${item.count}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
