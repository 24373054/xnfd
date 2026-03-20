export const AREAS = ["蔡甸区", "洪山区", "黄陂区", "新洲区", "汉南区", "江夏区", "东西湖区"] as const;

export const SUBJECT_TYPES = ["合作社", "种植户", "文旅经营者", "返乡创业者", "其他"] as const;

export const SERVICE_TYPES = [
  "地标保护",
  "合同纠纷",
  "安全合规",
  "维权协助",
  "法律咨询",
  "其他",
] as const;

export const RIGHTS_TYPES = [
  "地理标志冒用",
  "合同纠纷",
  "消费维权",
  "用工纠纷",
  "土地纠纷",
  "其他",
] as const;

export const STATUS_MAP = {
  pending: { label: "待处理", color: "amber" },
  processing: { label: "处理中", color: "blue" },
  resolved: { label: "已解决", color: "green" },
} as const;

export const GI_PRODUCTS = [
  { name: "蔡甸莲藕", area: "蔡甸区", type: "地理标志证明商标" },
  { name: "洪山菜薹", area: "洪山区", type: "地理标志保护产品" },
  { name: "汉南甜玉米", area: "汉南区", type: "地理标志证明商标" },
  { name: "新洲涨渡湖黄颡鱼", area: "新洲区", type: "地理标志证明商标" },
  { name: "黄陂脉地湾萝卜", area: "黄陂区", type: "地理标志证明商标" },
] as const;
