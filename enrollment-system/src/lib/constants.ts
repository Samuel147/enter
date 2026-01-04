// 申请类型映射
export const APPLICATION_TYPE_MAP: Record<string, { label: string; color: string }> = {
  course_selection: { label: '课程选择', color: 'blue' },
  dormitory: { label: '宿舍分配', color: 'green' },
  tuition_defer: { label: '缓交学费', color: 'orange' },
  transfer_major: { label: '转专业', color: 'purple' },
  suspend: { label: '休学', color: 'red' },
  resume: { label: '复学', color: 'teal' },
  dorm_adjustment: { label: '宿舍调整', color: 'indigo' },
  other: { label: '其他', color: 'gray' },
};

// 申请状态映射
export const APPLICATION_STATUS_MAP: Record<string, { label: string; color: string }> = {
  pending: { label: '待审批', color: 'yellow' },
  approved: { label: '已通过', color: 'green' },
  rejected: { label: '已拒绝', color: 'red' },
};

// 入学步骤状态映射
export const STEP_STATUS_MAP: Record<string, { label: string; color: string }> = {
  completed: { label: '已完成', color: 'green' },
  in_progress: { label: '审批中', color: 'yellow' },
  pending: { label: '待完成', color: 'gray' },
};
