// 合同智能审查接口
// 模型：DeepSeek-V3

import { aiChat } from "@/lib/ai";

export async function POST(req: Request) {
  const { text } = await req.json() as { text: string };

  if (!text?.trim()) {
    return Response.json({ error: "合同内容不能为空" }, { status: 400 });
  }

  const prompt = `你是一名专注于农村合同的法律顾问。请审查以下合同文本，输出JSON格式的审查结果。

合同文本：
${text.slice(0, 4000)}

请从以下维度逐一检查，输出JSON数组，每项格式为：
{"level": "ok"|"warn"|"error", "category": "分类", "text": "具体说明"}

检查维度：
1. 合同主体（双方身份信息是否完整）
2. 标的物描述（数量、质量、规格是否明确）
3. 价款与支付（金额、时间、方式是否清晰）
4. 交付/履行条款（时间、地点、方式）
5. 违约责任（是否有明确违约金或赔偿标准）
6. 争议解决（是否约定管辖法院或仲裁机构）
7. 不可抗力条款
8. 保密条款（如适用）
9. 农村特殊风险（土地用途、地标使用、食品安全等）

只输出JSON数组，不要其他文字。`;

  try {
    const raw = await aiChat([{ role: "user", content: prompt }], 0.1);
    // 提取 JSON
    const match = raw.match(/\[[\s\S]*\]/);
    if (!match) throw new Error("解析失败");
    const items = JSON.parse(match[0]);
    return Response.json({ items });
  } catch (e) {
    return Response.json({ error: String(e) }, { status: 500 });
  }
}
