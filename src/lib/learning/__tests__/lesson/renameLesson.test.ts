import { describe, it, expect, vi, type Mock } from "vitest";

vi.mock("@/lib/prisma", () => ({
  prisma: {
    lesson: {
      findUnique: vi.fn(),
      update: vi.fn()
    },
  },
}));
vi.mock('@/lib/ai/openai-client', () => {
  return {
    openai: {
      // mock only what your code uses
      responses: {
        create: vi.fn()
      }
    }
  }
})
import { renameLesson } from "@/lib/learning/lessons/mutations";
import { prisma } from "@/lib/prisma";


describe("renameLesson", () => {
  it("updates title if owned by user", async () => {
    (prisma.lesson.findUnique as Mock).mockResolvedValue({
      id: "1",
      userId: "user-1",
    });

    await renameLesson("1", "user-1", "New Title");

    expect(prisma.lesson.update).toHaveBeenCalledWith({
      where: { id: "1" },
      data: { title: "New Title" },
    });
  });

  it("throws if not owner", async () => {
    (prisma.lesson.findUnique as Mock).mockResolvedValue({
      id: "1",
      userId: "other",
    });

    await expect(
      renameLesson("1", "user-1", "New Title")
    ).rejects.toThrow("Lesson not found");
  });

})