// 合同模板 AI 智能填充接口
// 模型：DeepSeek-V3

import { aiChat } from "@/lib/ai";

export async function POST(req: Request) {
  const { description, template } = await req.json() as {
    description: string;
    template: string;
  };
  const userDesc = description;

  const prompt = `你是一名专注于农村合同的法律助手。

用户描述的情况：
${userDesc}

请根据用户描述，将以下合同模板中的"XX"占位符替换为合适的内容。
只替换能从用户描述中推断出的信息，无法确定的保留"XX"。
直接输出填充后的完整合同文本，不要任何解释。

合同模板：
${template}`;

  try {
    const filled = await aiChat([{ role: "user", content: prompt }], 0.2);
    return Response.json({ filled });
  } catch (e) {
    return Response.json({ error: String(e) }, { status: 500 });
  }
}
