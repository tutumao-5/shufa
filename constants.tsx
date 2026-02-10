
import { Course, StudentProgress } from './types';

export const COURSES: Course[] = [
  {
    id: 'hardpen',
    title: '硬笔书法 (提分必备)',
    icon: '✍️',
    description: '专注规范字书写，解决作业潦草难题，直接服务于校内学习。',
    highlights: [
      '坐姿握笔纠正：建立肌肉记忆',
      '笔画结构解析：独家口诀，简单易懂',
      '语文同步生字：结合教材，学以致用',
      '速写训练：提升初中作业书写速度'
    ],
    quote: '孩子以前写字像画符，现在作业经常被老师当作范本展示！'
  },
  {
    id: 'softpen',
    title: '软笔书法 (素养考级)',
    icon: '🖌️',
    description: '传承传统文化，修身养性，培养专注力，支持考级与比赛。',
    highlights: [
      '基本功训练：运笔、墨法、线条质量',
      '经典碑帖临摹：颜体、欧体等楷书入门',
      '考级辅导：针对书协考级进行专项集训',
      '作品创作：条幅、对联等完整作品输出'
    ],
    quote: '适合希望培养特长、提升艺术修养的学生。'
  }
];

export const IMPROVEMENT_DATA: StudentProgress[] = [
  { category: '坐姿规范', before: 40, after: 95 },
  { category: '握笔姿势', before: 30, after: 98 },
  { category: '笔画质量', before: 50, after: 85 },
  { category: '卷面整洁', before: 45, after: 92 },
];
