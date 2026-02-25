import { describe, it, expect, vi, type Mock } from "vitest";
import { deleteLesson } from "@/lib/learning/lessons/mutations";
import { prisma } from "@/lib/prisma";


vi.mock("@/lib/learning/lessons/ai", () => ({
  generateAILesson: vi.fn().mockResolvedValue({
    explanation: "mock explanation",
    keyPoints: ["mock"],
  }),
}));

vi.mock("@/lib/prisma", () => ({
  prisma: {
    lesson: {
      findUnique: vi.fn(),
      delete: vi.fn(),
      create: vi.fn(),
      findMany: vi.fn(),
      update: vi.fn(),
    },
  },
}));

const mockFindUnique = prisma.lesson.findUnique as unknown as Mock;

describe("deleteLesson", () => {
  it("deletes lesson if owned by user", async () => {
    mockFindUnique.mockResolvedValue({
      id: "1",
      userId: "user-123",
    });

    await deleteLesson("1", "user-123");

    expect(prisma.lesson.delete).toHaveBeenCalledWith({
      where: { id: "1" },
    });
  });

  it("throws when lesson not found", async () => {
    mockFindUnique.mockResolvedValue(null);

    await expect(deleteLesson("missing", "user-123"))
      .rejects.toThrow("Lesson not found");
  });

  it("throws when lesson belongs to another user", async () => {
    mockFindUnique.mockResolvedValue({
      id: "1",
      userId: "other-user",
    });

    await expect(deleteLesson("1", "user-123"))
      .rejects.toThrow("Lesson not found");
  });
});