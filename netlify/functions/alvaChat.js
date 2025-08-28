import OpenAI from "openai";
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function handler(event) {
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers: { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "Content-Type" }, body: "" };
  }
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const { messages = [] } = JSON.parse(event.body || "{}");
  const system = {
    role: "system",
    content:
      "Você é um atendente da página Alva. Ajude com dúvidas sobre produtos naturais, benefícios e modo de uso. " +
      "Não faça promessas médicas. Quando apropriado, direcione para os botões com link oficial. " +
      "Se perguntarem sobre jogos/Mega Mania, informe que este canal é focado em Alva."
  };

  try {
    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [system, ...messages].slice(-20),
      temperature: 0.7,
      max_tokens: 500
    });
    const reply = completion.choices?.[0]?.message?.content ?? "Desculpe, não consegui responder agora.";
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ reply })
    };
  } catch (err) {
    console.error(err);
    return { statusCode: 500, body: JSON.stringify({ error: "Falha na IA" }) };
  }
}
