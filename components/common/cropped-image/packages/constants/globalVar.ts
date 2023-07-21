type GlobalVar = {
  FeatureDetector: Record<string, any>;
};

/** 组件内全局变量，用于组件内数据共享（非响应式） */
export const globalVar: GlobalVar = {
  /** 浏览器特性检测 */
  FeatureDetector: {}
};
