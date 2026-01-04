'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { StudentHeader } from '@/components/student/StudentHeader';
import { Card } from '@/components/ui/Card';
import Button from '@/components/common/Button';

export default function NewApplicationPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    type: '',
    title: '',
    content: '',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        alert('申请提交成功！');
        router.push('/student/applications');
      } else {
        alert('申请提交失败，请重试');
      }
    } catch (error) {
      alert('网络错误，请稍后重试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <StudentHeader title="新建申请" user={{
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
            <h3 className="text-xl font-bold text-gray-900 mb-6">新建申请</h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">申请类型</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                  required
                >
                  <option value="">请选择申请类型</option>
                  <option value="dorm_adjustment">宿舍调整申请</option>
                  <option value="transfer_major">转专业申请</option>
                  <option value="suspend">休学申请</option>
                  <option value="resume">复学申请</option>
                  <option value="other">其他申请</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">申请标题</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="请输入申请标题"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">申请内容</label>
                <textarea
                  rows={6}
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="请详细描述您的申请内容和理由"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none resize-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">附件上传</label>
                <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center hover:border-primary-400 transition-all cursor-pointer">
                  <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <p className="text-gray-500">点击或拖拽文件到此处上传</p>
                  <p className="text-gray-400 text-sm mt-1">支持 PDF、Word、图片等格式</p>
                </div>
              </div>

              <div className="flex gap-4">
                <Button variant="secondary" onClick={() => router.back()}>
                  取消
                </Button>
                <Button variant="primary" type="submit" disabled={loading} fullWidth>
                  {loading ? '提交中...' : '提交申请'}
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}
