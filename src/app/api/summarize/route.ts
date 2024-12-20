import assert from "assert";
import dedent from "dedent";
import Together from "together-ai";

// Add observability if a Helicone key is specified, otherwise skip
const options: ConstructorParameters<typeof Together>[0] = {};
if (process.env.HELICONE_API_KEY) {
  options.baseURL = "https://together.helicone.ai/v1";
  options.defaultHeaders = {
    "Helicone-Auth": `Bearer ${process.env.HELICONE_API_KEY}`,
    "Helicone-Property-AppName": "SmartPDF",
  };
}

const client = new Together(options);

export async function POST(req: Request) {
  const { text, language } = await req.json();

  assert.ok(typeof text === "string");
  assert.ok(typeof language === "string");

  const systemPrompt = dedent`
    You are an expert at synthesizing and summarizing text. I am going to send you a part of a PDF and I want you to concisely summarize it for me in about 2-4 paragraphs (with proper spacing) and generate a short title for the summary, all in ${language}.

    - Think carefully step by step and make sure to cover all the important points
    - Only answer with the title and summary in JSON. {title: string, summary: string}
    - It's VERY important for my job that you ONLY respond with the JSON and nothing else.
  `;

  const response = await client.chat.completions.create({
    model: "meta-llama/Meta-Llama-3.1-70B-Instruct-Turbo",
    messages: [
      {
        role: "system",
        content: systemPrompt,
      },
      {
        role: "user",
        content: text,
      },
    ],
  });

  const content = response.choices[0].message?.content;

  if (!content) {
    console.log("Content was blank");
    return;
  }

  let JSONContent;
  try {
    JSONContent = JSON.parse(content);
  } catch {
    console.log("Error parsing JSON");
    const titleMatch = content.match(/"title"\s*:\s*"([^"]+)"/);
    const summaryMatch = content.match(/"summary"\s*:\s*"([^"]+)"/);

    if (titleMatch && summaryMatch) {
      JSONContent = {
        title: titleMatch[1],
        summary: summaryMatch[1],
      };
    } else {
      return Response.json(
        { error: "Invalid response format" },
        { status: 500 },
      );
    }
    console.log("Original content:", content);
  }

  return Response.json(JSONContent);
}

export const runtime = "edge";
