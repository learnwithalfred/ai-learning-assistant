import { describe, it, expect, vi, type Mock } from "vitest";

vi.mock("@/lib/learning/utils/extractTitle", () => ({
  extractTitle: vi.fn(),
}));

vi.mock("@/lib/prisma", () => ({
  prisma: {
    lesson: {
      create: vi.fn(),
    },
  },
}));
vi.mock("@/lib/learning/lessons/ai", () => ({
  generateAILesson: vi.fn(),
}));

import { prisma } from "@/lib/prisma";
import { extractTitle } from "@/lib/learning/utils/extractTitle";
import { generateAILesson } from "@/lib/learning/lessons/ai";
import { createLesson } from "@/modules/lessons/lesson.repository";

describe("createLesson", () => {
  it("creates lesson successfully", async () => {
    (generateAILesson as Mock).mockResolvedValue({
      explanation: "AI explanation",
      keyPoints: ["one", "two"],
    });

    (extractTitle as Mock).mockResolvedValue("Generated Title");

    (prisma.lesson.create as Mock).mockResolvedValue({
      id: "123",
      title: "Generated Title",
    });

    const result = await createLesson({ prompt: "  Learn React  " }, "user-1");

    expect(generateAILesson).toHaveBeenCalledWith({
      prompt: "Learn React",
    });

    expect(extractTitle).toHaveBeenCalledWith("Learn React");

    expect(prisma.lesson.create).toHaveBeenCalled();

    expect(result.id).toBe("123");
  });
});
