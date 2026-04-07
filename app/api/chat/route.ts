import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const systemPrompt = {
      role: "system",
      content: `You are "Gram Sahayak" (ग्राम सहायक), a helpful AI assistant for Gidhadi Gram Connect.

Reply in very simple Hindi or Marathi.
Keep answers short, clear, and useful for village users.`,
    };

    const chatMessages = [
      systemPrompt,
      ...messages.map((m: any) => ({
        role: m.role === "assistant" ? "assistant" : "user",
        content: m.content,
      })),
    ];

    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "meta-llama/llama-3-8b-instruct", // ✅ stable model
        messages: chatMessages,
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    // 🔴 Handle API error properly
    if (!res.ok) {
      const errorText = await res.text();
      console.error("OpenRouter API error:", errorText);

      // ✅ fallback response (VERY IMPORTANT)
      return NextResponse.json({
        message:
          "⚠️ सध्या सर्व्हर व्यस्त आहे.\nकृपया थोड्या वेळाने पुन्हा प्रयत्न करा.\n\n(Offline मदत: PM किसान योजना बद्दल माहिती हवी असल्यास सांगा.)",
      });
    }

    const data = await res.json();

    const message =
      data?.choices?.[0]?.message?.content?.trim() ||
      "माफ करा, उत्तर मिळाले नाही.";

    return NextResponse.json({ message });

  } catch (error) {
    console.error("Chat API error:", error);

    // ✅ fallback for crash
    return NextResponse.json({
      message:
        "⚠️ काहीतरी चूक झाली.\nकृपया पुन्हा प्रयत्न करा.\n\n(तुम्ही सरकारी योजना, शेती किंवा ग्राम पंचायत बद्दल प्रश्न विचारू शकता.)",
    });
  }
}