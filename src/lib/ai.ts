// DeepSeek API 统一调用层
// 模型：deepseek-chat (DeepSeek-V3)

const DEEPSEEK_BASE = "https://api.deepseek.com/v1";
export const AI_MODEL_LABEL = "DeepSeek-V3";

export interface Message {
  role: "system" | "user" | "assistant";
  content: string;
}

/** 非流式调用，返回完整文本 */
export async function aiChat(messages: Message[], temperature = 0.3): Promise<string> {
  const res = await fetch(`${DEEPSEEK_BASE}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.DEEPSEEK_API_KEY}`,
    },
    body: JSON.stringify({
      model: "deepseek-chat",
      messages,
      temperature,
      max_tokens: 2048,
    }),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`DeepSeek API error ${res.status}: ${err}`);
  }
  const data = await res.json();
  return data.choices[0].message.content as string;
}

/** 流式调用，返回 ReadableStream（SSE 格式） */
export async function aiStream(messages: Message[], temperature = 0.5): Promise<Response> {
  const res = await fetch(`${DEEPSEEK_BASE}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.DEEPSEEK_API_KEY}`,
    },
    body: JSON.stringify({
      model: "deepseek-chat",
      messages,
      temperature,
      max_tokens: 2048,
      stream: true,
    }),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`DeepSeek API error ${res.status}: ${err}`);
  }
  return res;
}
