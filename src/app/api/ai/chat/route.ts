// 智能体对话接口 - 流式输出
// 模型：DeepSeek-V3

import { aiStream, type Message } from "@/lib/ai";

const SYSTEM_PROMPT = `你是"兴农法盾"平台的法律智能助手，专注于武汉农文旅融合领域的法律服务。

当问题涉及法律时，你的专业范围：
- 地理标志产品保护（蔡甸莲藕、洪山菜薹等）
- 农村土地流转合同
- 乡村文旅经营合规（民宿、采摘园、农家乐）
- 农产品电商纠纷
- 农户用工协议
- 侵权投诉与维权流程
- 食品安全、消防安全合规

回答要求：
1. 语言简洁易懂，避免过多法律术语，面向农户和小微经营者
2. 给出具体可操作的建议，而非泛泛而谈
3. 涉及诉讼、仲裁等复杂事项时，建议联系专业律师
4. 回答控制在500字以内，重点突出
5. 如果问题超出农文旅法律范围，不必着急引回正题，可以拓展回答以外的问题，灵活变动顺应用户需求

联系方式（需要时提供）：咨询热线 027-87218899，邮箱 fadun@xingnong.org.cn`;

export async function POST(req: Request) {
  const { messages } = await req.json() as { messages: Message[] };

  const fullMessages: Message[] = [
    { role: "system", content: SYSTEM_PROMPT },
    ...messages,
  ];

  try {
    const upstream = await aiStream(fullMessages, 0.6);

    // 直接透传 DeepSeek 的 SSE 流
    return new Response(upstream.body, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        "X-Accel-Buffering": "no",
      },
    });
  } catch (e) {
    return Response.json({ error: String(e) }, { status: 500 });
  }
}
