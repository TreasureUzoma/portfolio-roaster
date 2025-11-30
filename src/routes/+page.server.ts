import type { Actions, PageServerLoad } from "./$types";
import { superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import { formSchema } from "./schema";
import { fail } from "@sveltejs/kit";

export const load: PageServerLoad = async () => {
  console.log("Loading form with schema:", formSchema);
  return {
    form: await superValidate(zod(formSchema)),
  };
};

export const actions: Actions = {
  default: async (event) => {
    const form = await superValidate(event, zod(formSchema));
    if (!form.valid) {
      return fail(400, {
        form,
      });
    }

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    return {
      form,
      roast:
        "This portfolio is so generic, it looks like a template for a template.",
    };
  },
};
