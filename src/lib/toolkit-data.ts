import { FileText, Users, ShoppingCart, ClipboardList, Search, ShieldCheck } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface ToolAction {
  label: string;
  type: "editor" | "download" | "check";
  primary?: boolean;
}

interface Tool {
  id: string;
  icon: LucideIcon;
  title: string;
  desc: string;
  content?: string;
  filename?: string;
  checkType?: string;
  actions: ToolAction[];
}

export const TEMPLATES: Tool[] = [
  {
    id: "land",
    icon: FileText,
    title: "土地流转合同标准模板",
    desc: "适配武汉乡村土地流转场景，含承包、租赁等类型，可直接编辑打印，规避权属纠纷。",
    filename: "土地流转合同模板.txt",
    content: `土地流转合同\n\n甲方（转出方）：\n身份证号/统一社会信用代码：\n地址：\n\n乙方（转入方）：\n身份证号/统一社会信用代码：\n地址：\n\n一、流转土地基本情况\n1. 土地位置：武汉市XX区XX街道XX村\n2. 土地面积：XX亩（以实测为准）\n3. 土地用途：农业生产/乡村文旅项目\n\n二、流转期限\n自XXXX年XX月XX日至XXXX年XX月XX日，共计XX年。\n\n三、流转价款及支付方式\n1. 每亩每年租金：XX元\n2. 支付方式：每年XX月XX日前一次性支付\n\n四、双方权利义务\n1. 甲方保证土地权属清晰，无抵押、查封等权利限制；\n2. 乙方不得改变土地农业用途，不得擅自建房；\n3. 流转期间，国家征地补偿款归属：土地补偿费归甲方，地上附着物补偿费归乙方。\n\n五、违约责任\n任何一方违约，需向守约方支付年租金20%的违约金。\n\n六、争议解决\n协商不成的，提交武汉市XX区人民法院诉讼解决。\n\n甲方（签字/盖章）：          日期：\n乙方（签字/盖章）：          日期：`,
    actions: [
      { label: "在线编辑", type: "editor", primary: true },
      { label: "下载模板", type: "download" },
    ],
  },
  {
    id: "worker",
    icon: Users,
    title: "农户用工协议合规版",
    desc: "针对乡村临时用工、长期雇工场景，明确薪资、责任、工伤界定，避免用工纠纷。",
    filename: "农户用工协议模板.txt",
    content: `农户用工协议\n\n甲方（雇主）：\n地址：武汉市XX区XX村\n\n乙方（雇工）：\n姓名：          身份证号：\n\n一、用工期限\n类型：□临时用工  □长期用工\n期限：自XXXX年XX月XX日至XXXX年XX月XX日\n\n二、工作内容及地点\n工作内容：（农产品种植/采摘/民宿服务等）\n工作地点：武汉市XX区XX村\n\n三、劳动报酬\n薪酬：□日薪XX元  □月薪XX元  □计件XX元/件\n支付方式：每月XX日现金/微信转账\n\n四、工伤责任\n1. 甲方为乙方购买意外伤害保险；\n2. 甲方过错导致的工伤，甲方承担全部赔偿责任；\n3. 乙方故意或重大过失导致的，乙方自行承担。\n\n甲方（签字/盖章）：          日期：\n乙方（签字）：               日期：`,
    actions: [
      { label: "在线编辑", type: "editor", primary: true },
      { label: "下载模板", type: "download" },
    ],
  },
  {
    id: "ecom",
    icon: ShoppingCart,
    title: "农产品电商购销合同",
    desc: "适配抖音、拼多多、社区团购等电商场景，明确发货、售后、违约金条款，保障农户权益。",
    filename: "农产品购销合同模板.txt",
    content: `农产品电商购销合同\n\n甲方（供方/农户）：\n地址：武汉市XX区XX村\n\n乙方（需方/电商平台/经销商）：\n统一社会信用代码：\n\n一、产品信息\n产品名称 | 规格/等级 | 单价（元/斤）| 数量（斤）| 总价（元）\n蔡甸莲藕 | 一级      | XX          | XXX       | XXX\n洪山菜薹 | 精品      | XX          | XXX       | XXX\n\n二、交货及验收\n1. 交货时间：XXXX年XX月XX日前\n2. 验收期限：收货后24小时内，逾期视为验收合格\n\n三、付款方式\n验收合格后7日内银行转账\n\n四、违约责任\n1. 甲方逾期交货：每逾期1日支付合同总价1%违约金；\n2. 产品质量不合格：无条件退换货，甲方承担运费；\n3. 乙方逾期付款：每逾期1日支付未付金额1%违约金。\n\n甲方（签字/盖章）：          日期：\n乙方（盖章）：               日期：`,
    actions: [
      { label: "在线生成", type: "editor", primary: true },
      { label: "下载模板", type: "download" },
    ],
  },
  {
    id: "safety",
    icon: ClipboardList,
    title: "文旅项目安全自查清单",
    desc: "民宿/采摘园/农家乐专属，覆盖消防、设施、游客安全等28项检查点，逐项勾选后生成自查报告。",
    checkType: "safety",
    actions: [
      { label: "开始自查", type: "check", primary: true },
    ],
  },
  {
    id: "contract-check",
    icon: Search,
    title: "合同智能审查工具",
    desc: "粘贴合同文本，自动检测条款漏洞、风险点，生成修改建议，无需专业法律知识。",
    checkType: "contract",
    actions: [
      { label: "立即检测", type: "check", primary: true },
    ],
  },
  {
    id: "gi-check",
    icon: ShieldCheck,
    title: "地理标志合规自查",
    desc: "针对蔡甸莲藕、洪山菜薹等地标产品，逐项检测使用规范，避免冒用、违规使用导致的处罚。",
    checkType: "gi",
    actions: [
      { label: "在线自查", type: "check", primary: true },
    ],
  },
];

export interface CheckItem {
  id: string;
  text: string;
  risk?: string;
}
export interface CheckGroup {
  category: string;
  items: CheckItem[];
}

export const SAFETY_ITEMS: CheckGroup[] = [
  {
    category: "消防安全",
    items: [
      { id: "s1", text: "灭火器配备齐全，在有效期内，放置位置有标识" },
      { id: "s2", text: "疏散通道保持畅通，无堆放杂物" },
      { id: "s3", text: "应急照明功能正常，覆盖所有通道和出口" },
      { id: "s4", text: "消防安全标识清晰醒目" },
      { id: "s5", text: "电气线路无老化、无私拉乱接现象", risk: "电气火灾是农家乐最常见事故原因" },
      { id: "s6", text: "易燃易爆品单独存放，有防护措施" },
      { id: "s7", text: "员工掌握基本消防知识，会使用灭火器" },
      { id: "s8", text: "有消防应急预案，近6个月内有演练记录" },
    ],
  },
  {
    category: "设施安全",
    items: [
      { id: "f1", text: "游乐设施有年度检测合格证明，在有效期内", risk: "无合格证明将面临停业整改" },
      { id: "f2", text: "地面易滑区域铺设防滑垫或有防滑标识" },
      { id: "f3", text: "护栏高度不低于1.1米，结构牢固" },
      { id: "f4", text: "特种设备（电梯、压力容器等）有使用登记证" },
      { id: "f5", text: "插座、开关有防护盖，儿童可触及区域有安全保护" },
      { id: "f6", text: "饮用水水质达标，管道无泄漏" },
      { id: "f7", text: "燃气报警器正常工作，厨房通风良好" },
      { id: "f8", text: "建筑结构无明显裂缝、沉降等安全隐患" },
    ],
  },
  {
    category: "游客安全",
    items: [
      { id: "g1", text: "危险区域（水塘、悬崖、机械等）有醒目警示标识" },
      { id: "g2", text: "入园前向游客告知安全注意事项" },
      { id: "g3", text: "配备急救箱，药品齐全且在有效期内" },
      { id: "g4", text: "有针对老人、儿童、残障人士的安全保障措施" },
      { id: "g5", text: "有恶劣天气（暴雨、大风）应对和疏散机制" },
      { id: "g6", text: "已购买公众责任险", risk: "未购险一旦发生游客意外将面临巨额赔偿" },
    ],
  },
  {
    category: "食品安全",
    items: [
      { id: "e1", text: "持有有效的食品经营许可证", risk: "无证经营最高罚款10万元" },
      { id: "e2", text: "从业人员持健康证上岗，证件在有效期内" },
      { id: "e3", text: "食材采购索证索票，无过期变质食材" },
      { id: "e4", text: "生熟食品分开存放，冷藏温度符合要求" },
      { id: "e5", text: "餐具按规定消毒，有消毒记录" },
      { id: "e6", text: "厨房环境整洁，有防鼠防虫措施" },
    ],
  },
];

export const GI_ITEMS: CheckGroup[] = [
  {
    category: "主体资格",
    items: [
      { id: "q1", text: "已向地理标志管理机构申请并获得使用授权", risk: "未授权使用地理标志属违法行为，最高罚款50万元" },
      { id: "q2", text: "授权证书在有效期内，未过期" },
      { id: "q3", text: "产品产地在地理标志保护范围内" },
      { id: "q4", text: "生产工艺符合地理标志产品标准规范" },
    ],
  },
  {
    category: "标识使用",
    items: [
      { id: "m1", text: "地理标志标识尺寸不小于5cm×5cm", risk: "标识过小将被认定为不规范使用" },
      { id: "m2", text: "标识位置醒目，未被遮挡或损毁" },
      { id: "m3", text: "未将地理标志用于非保护范围内的产品" },
      { id: "m4", text: "电商平台商品详情页展示了产地证明和授权证书" },
    ],
  },
  {
    category: "宣传合规",
    items: [
      { id: "a1", text: "宣传材料未使用最正宗、第一、唯一等绝对化用语", risk: "绝对化用语违反广告法，罚款20万元起" },
      { id: "a2", text: "未将地理标志与其他商标混淆使用" },
      { id: "a3", text: "直播带货时未夸大产地范围或产品功效" },
      { id: "a4", text: "包装上的产品描述与实际产品一致" },
    ],
  },
  {
    category: "质量管理",
    items: [
      { id: "ql1", text: "有近一年内的产品质量检测报告" },
      { id: "ql2", text: "建立了产品质量追溯记录（批次、产地、日期）" },
      { id: "ql3", text: "发现质量问题时有召回和处置机制" },
    ],
  },
];
