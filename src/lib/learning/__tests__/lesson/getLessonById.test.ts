import { describe, it, expect, vi, type Mock, beforeEach } from "vitest";

vi.mock("@/lib/prisma", () => ({
  prisma: {
    lesson: {
      findUnique: vi.fn(),
    },
  },
}));
import { getLessonById } from "@/lib/learning/lessons/queries";
import { prisma } from "@/lib/prisma";

describe("getLessonById", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  it("returns lesson if owned by user", async () => {
    (prisma.lesson.findUnique as Mock).mockResolvedValue({
      id: "1",
      userId: "user-1",
      title: "Test",
    });

    const result = await getLessonById("1", "user-1");

    expect(result?.title).toBe("Test");
  });

  it("throws if lesson not found", async () => {
    (prisma.lesson.findUnique as Mock).mockResolvedValue(null);

    await expect(getLessonById("1", "user-1")).rejects.toThrow(
      "Lesson not found",
    );
  });

  it("throws if lesson belongs to another user", async () => {
    (prisma.lesson.findUnique as Mock).mockResolvedValue({
      id: "1",
      userId: "other-user",
    });

    await expect(getLessonById("1", "user-1")).rejects.toThrow(
      "Lesson not found",
    );
  });
});
