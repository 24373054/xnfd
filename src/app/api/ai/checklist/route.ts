// 自查清单 AI 整改建议接口
// 模型：DeepSeek-V3

import { aiChat } from "@/lib/ai";

export async function POST(req: Request) {
  const { type, uncheckedItems } = await req.json() as {
    type: "safety" | "gi";
    uncheckedItems: string[];
  };

  if (!uncheckedItems || uncheckedItems.length === 0) {
    return Response.json({ advice: "恭喜！所有检查项均已完成，合规状况良好。建议定期复查，保持合规记录。" });
  }

  const typeLabel = type === "safety" ? "文旅项目安全合规" : "地理标志使用合规";
  const itemList = uncheckedItems.map((text, i) => `${i + 1}. ${text}`).join("\n");

  const prompt = `你是一名专注于农村${typeLabel}的顾问。

以下是未完成的检查项：
${itemList}

请给出：
1. 整体风险评估（2-3句话）
2. 优先整改建议（按紧急程度排序，最多5条，每条50字以内）
3. 一句鼓励的话

用简洁的中文回答，面向农村小微经营者，避免法律术语。总字数控制在300字以内。`;

  try {
    const advice = await aiChat([{ role: "user", content: prompt }], 0.4);
    return Response.json({ advice });
  } catch (e) {
    return Response.json({ error: String(e) }, { status: 500 });
  }
}
