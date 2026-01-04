'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { ApprovalCard } from '@/components/teacher/ApprovalCard';
import { Modal } from '@/components/common/Modal';
import { Application } from '@/types/application';
import { ApprovalStats } from '@/types/approval';

export default function TeacherApprovalPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [stats, setStats] = useState<ApprovalStats | null>(null);
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [appsRes, statsRes] = await Promise.all([
        fetch('/api/approvals?type=pending'),
        fetch('/api/approvals?type=stats'),
      ]);

      const appsData = await appsRes.json();
      const statsData = await statsRes.json();

      if (appsData.success) setApplications(appsData.data);
      if (statsData.success) setStats(statsData.data);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetail = (app: Application) => {
    setSelectedApp(app);
    setModalOpen(true);
  };

  const handleApprove = async (appId: string) => {
    try {
      const response = await fetch('/api/approvals', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ applicationId: appId, action: 'approve' }),
      });

      const data = await response.json();
      if (data.success) {
        alert('申请已通过！');
        fetchData();
      }
    } catch (error) {
      alert('操作失败，请重试');
    }
  };

  const handleReject = async (appId: string) => {
    const reason = prompt('请输入拒绝理由：');
    if (reason) {
      try {
        const response = await fetch('/api/approvals', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ applicationId: appId, action: 'reject', comment: reason }),
        });

        const data = await response.json();
        if (data.success) {
          alert('申请已拒绝！');
          fetchData();
        }
      } catch (error) {
        alert('操作失败，请重试');
      }
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">审批中心</h1>
        <p className="text-gray-500">欢迎回来，张老师</p>
      </div>

      {/* 统计卡片 */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="text-3xl font-bold text-gray-900">{stats.pending}</span>
            </div>
            <h4 className="font-semibold text-gray-900">待审批</h4>
            <p className="text-gray-500 text-sm">需要尽快处理</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="text-3xl font-bold text-gray-900">{stats.approved}</span>
            </div>
            <h4 className="font-semibold text-gray-900">已通过</h4>
            <p className="text-gray-500 text-sm">本周批准数量</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <span className="text-3xl font-bold text-gray-900">{stats.rejected}</span>
            </div>
            <h4 className="font-semibold text-gray-900">已拒绝</h4>
            <p className="text-gray-500 text-sm">本周拒绝数量</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <span className="text-3xl font-bold text-gray-900">{stats.approvalRate}%</span>
            </div>
            <h4 className="font-semibold text-gray-900">通过率</h4>
            <p className="text-gray-500 text-sm">工作效率良好</p>
          </Card>
        </div>
      )}

      {/* 待审批列表 */}
      <Card className="p-6 mb-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6">待审批申请</h3>

        {loading ? (
          <div className="text-center py-8 text-gray-500">加载中...</div>
        ) : applications.length === 0 ? (
          <div className="text-center py-8 text-gray-500">暂无待审批申请</div>
        ) : (
          <div className="space-y-4">
            {applications.map((app) => (
              <ApprovalCard
                key={app.id}
                application={app}
                onViewDetail={() => handleViewDetail(app)}
                onApprove={() => handleApprove(app.id)}
                onReject={() => handleReject(app.id)}
              />
            ))}
          </div>
        )}
      </Card>

      {/* 审批详情弹窗 */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="申请详情"
        footer={
          <div className="flex gap-4">
            <button
              onClick={() => setModalOpen(false)}
              className="flex-1 py-3 px-4 border border-gray-200 text-gray-700 font-medium rounded-xl hover:bg-gray-50"
            >
              返回
            </button>
            <button
              onClick={() => {
                if (selectedApp) handleReject(selectedApp.id);
                setModalOpen(false);
              }}
              className="flex-1 py-3 px-4 bg-red-500 text-white font-medium rounded-xl hover:bg-red-600"
            >
              拒绝申请
            </button>
            <button
              onClick={() => {
                if (selectedApp) handleApprove(selectedApp.id);
                setModalOpen(false);
              }}
              className="flex-1 py-3 px-4 bg-green-500 text-white font-medium rounded-xl hover:bg-green-600"
            >
              通过申请
            </button>
          </div>
        }
      >
        {selectedApp && (
          <div className="space-y-4">
            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100">
              <img
                src={selectedApp.userAvatar}
                alt="学生头像"
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <h4 className="text-lg font-bold text-gray-900">{selectedApp.userName}</h4>
                <p className="text-gray-500">学号：{selectedApp.studentId}</p>
                <p className="text-gray-400 text-sm">计算机学院 · 计算机科学专业</p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">申请类型</label>
              <p className="text-gray-900 font-medium">{selectedApp.title}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">申请内容</label>
              <p className="text-gray-900">{selectedApp.content}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">提交时间</label>
              <p className="text-gray-900">{selectedApp.submittedAt.replace('T', ' ').substring(0, 16)}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">附件</label>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                <div>
                  <p className="text-sm font-medium text-gray-900">相关材料.pdf</p>
                  <p className="text-xs text-gray-500">245 KB</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
