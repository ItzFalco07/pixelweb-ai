import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req) {
  try {
    const { Input } = await req.json(); // Extract prompt from the request body
    const EditedInput = "Make a modern and beautiful webpage (all  in only one file), use tailwind and add cool animations to it, dont give me any other text than code (only code), You may use random image generator (dont use unsplash). If theme not included in description then use dark theme. description of the website: " + Input
    if (!Input) {
      return new Response(JSON.stringify({ error: "Input is required" }), { status: 400 });
    }

    const genAI = new GoogleGenerativeAI(process.env.API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(EditedInput); // Use Input instead of prompt
    console.log(result.response.text()); // Log the generated text

    return new Response(JSON.stringify({ text: result.response.text() }), { status: 200 });
  } catch (error) {
    console.error("Error generating content:", error); // Log any errors
    return new Response(JSON.stringify({ error: error.message }), { status: 500 }); // Return error response
  }
}
