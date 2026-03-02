import { describe, it, vi, expect, beforeEach, Mock } from "vitest";

vi.mock("@/lib/prisma", () => ({
  prisma: {
    lesson: {
      findMany: vi.fn(),
    },
  },
}));

import { getLessons } from "@/lib/learning/lessons/queries";
import { prisma } from "@/lib/prisma";

describe("getLessons", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns all lessons owned by user", async () => {
    const fakeLessons = [
      {
        id: "1",
        title: "React",
        originalPrompt: "React basics",
        explanation: "Explanation",
        keyPoints: ["one"],
        userId: "user-1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    (prisma.lesson.findMany as Mock).mockResolvedValue(fakeLessons);

    const result = await getLessons("user-1");

    expect(prisma.lesson.findMany).toHaveBeenCalledWith({
      where: { userId: "user-1" },
      orderBy: { createdAt: "desc" },
    });

    expect(result).toEqual(fakeLessons);
  });

  it("throws if no userId provided", async () => {
    await expect(getLessons("")).rejects.toThrow("Lesson not found");
  });
});
