import type { Actions } from "./$types";
import { fail } from "@sveltejs/kit";

export const actions: Actions = {
  default: async ({ request }) => {
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

    return {
      success: true,
      roast:
        "This portfolio is so generic, it looks like a template for a template.",
    };
  },
};
