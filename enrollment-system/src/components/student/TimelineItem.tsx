import { EnrollmentStep } from '@/types/approval';
import { Badge } from '@/components/ui/Badge';

interface TimelineItemProps {
  step: EnrollmentStep;
  isLast: boolean;
}

export function TimelineItem({ step, isLast }: TimelineItemProps) {
  const getStatusConfig = () => {
    switch (step.status) {
      case 'completed':
        return {
          bgClass: 'bg-green-500',
          icon: 'M5 13l4 4L19 7',
        };
      case 'in_progress':
        return {
          bgClass: 'bg-yellow-500',
          icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
        };
      default:
        return {
          bgClass: 'bg-gray-300',
          icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z',
        };
    }
  };

  const config = getStatusConfig();
  const statusLabels = { completed: '已完成', in_progress: '审批中', pending: '待完成' };
  const statusColors = { completed: 'green', in_progress: 'yellow', pending: 'gray' };

  return (
    <div className={`relative flex gap-4 ${!isLast ? 'timeline-item' : ''}`}>
      <div className={`w-8 h-8 ${config.bgClass} rounded-full flex items-center justify-center flex-shrink-0 z-10`}>
        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={config.icon} />
        </svg>
      </div>
      <div className="flex-1 pb-6">
        <div className="flex items-center justify-between">
          <h4 className="font-semibold text-gray-900">{step.name}</h4>
          <Badge label={statusLabels[step.status]} color={statusColors[step.status]} />
        </div>
        <p className="text-gray-500 text-sm mt-1">{step.description}</p>
        {step.completedAt && (
          <p className="text-gray-400 text-xs mt-2">
            {step.completedAt.replace('T', ' ').substring(0, 16)} 完成
          </p>
        )}
      </div>
    </div>
  );
}
