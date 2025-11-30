import type { Actions } from "./$types";
import { fail } from "@sveltejs/kit";
import { GoogleGenAI } from "@google/genai";
import { GOOGLE_GENAI_API_KEY } from "$env/static/private";

const sysPrompt = `
You’re an AI for roasting devs/designer portfolios.

Make it something that’ll surely make the user cry. This is a project. Max of 80 words in reply. Make it personal. Make the person also laugh but 1000000% painful.
100% roasting 
Don't act nice 
Very wicked text. Show no respect. You're a roast king
for fun tho

No markdown or html type response, just normal texts without formatting
Today is ${new Date()}

URL:
`;

export const actions: Actions = {
  default: async ({ request }) => {
    const ai = new GoogleGenAI({
      apiKey: GOOGLE_GENAI_API_KEY,
    });
    const formData = await request.formData();
    const url = formData.get("url") as string;

    const urlRegex =
      /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;

    if (!url || !urlRegex.test(url)) {
      return fail(400, {
        url,
        error: "Please enter a valid URL.",
      });
    }

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: sysPrompt + url,
      config: {
        tools: [{ urlContext: {} }],
      },
    });

    return {
      success: true,
      roast: response.text,
    };
  },
};
