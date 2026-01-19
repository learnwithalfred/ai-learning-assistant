"use server";

import { revalidatePath } from "next/cache";
import { askFollowUp } from "@/lib/learning/followups/mutations";

export async function askFollowUpAction(formData: FormData): Promise<void> {
  const unitId = (formData.get("unitId") ?? "").toString();
  const question = (formData.get("question") ?? "").toString();

  await askFollowUp(unitId, question);

  revalidatePath("/");
}
