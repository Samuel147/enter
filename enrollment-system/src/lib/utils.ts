// 格式化日期
export function formatDate(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');
  
  return `${year}-${month}-${day} ${hours}:${minutes}`;
}

// 格式化相对时间
export function formatRelativeTime(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diff = now.getTime() - d.getTime();
  
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  
  if (minutes < 1) return '刚刚';
  if (minutes < 60) return `等待 ${minutes} 分钟`;
  if (hours < 24) return `等待 ${hours} 小时`;
  return `等待 ${days} 天`;
}

// 获取颜色类名
export function getColorClass(color: string, type: 'bg' | 'text' | 'border'): string {
  const colorMap: Record<string, Record<string, string>> = {
    blue: {
      bg: 'bg-blue-100',
      text: 'text-blue-700',
      border: 'border-blue-500',
    },
    green: {
      bg: 'bg-green-100',
      text: 'text-green-700',
      border: 'border-green-500',
    },
    yellow: {
      bg: 'bg-yellow-100',
      text: 'text-yellow-700',
      border: 'border-yellow-500',
    },
    red: {
      bg: 'bg-red-100',
      text: 'text-red-700',
      border: 'border-red-500',
    },
    orange: {
      bg: 'bg-orange-100',
      text: 'text-orange-700',
      border: 'border-orange-500',
    },
    purple: {
      bg: 'bg-purple-100',
      text: 'text-purple-700',
      border: 'border-purple-500',
    },
    teal: {
      bg: 'bg-teal-100',
      text: 'text-teal-700',
      border: 'border-teal-500',
    },
    indigo: {
      bg: 'bg-indigo-100',
      text: 'text-indigo-700',
      border: 'border-indigo-500',
    },
    gray: {
      bg: 'bg-gray-100',
      text: 'text-gray-700',
      border: 'border-gray-500',
    },
  };
  
  return colorMap[color]?.[type] || colorMap.gray[type];
}
