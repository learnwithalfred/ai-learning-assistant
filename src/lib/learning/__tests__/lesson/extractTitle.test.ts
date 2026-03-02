import { describe, it, expect } from "vitest";
import { extractTitle } from "@/lib/learning/utils/extractTitle";

describe("extractTitle", () => {
  it("returns 'Untitled Lesson' for empty input", async () => {
    const result = await extractTitle("");
    expect(result).toBe("Untitled Lesson");
  });

  it("removes stop phrases", async () => {
    const result = await extractTitle("can you explain quantum mechanics");
    expect(result).toBe("Quantum mechanics");
  });

  it("collapses extra spaces", async () => {
    const result = await extractTitle("   teach me    about    dogs   ");
    expect(result).toBe("About dogs");
  });

  it("takes the last 3 meaningful words", async () => {
    const result = await extractTitle(
      "please teach me about the history of chess",
    );
    expect(result).toBe("History of chess");
  });

  it("falls back to original prompt if cleaned text < 2 chars", async () => {
    const result = await extractTitle("tell me a");
    expect(result).toBe("Tell me a");
  });

  it("handles complex stop phrases like 'in simple terms'", async () => {
    const result = await extractTitle("explain gravity in simple terms");
    expect(result).toBe("Gravity");
  });

  it("capitalizes first letter correctly", async () => {
    const result = await extractTitle("please explain the ocean tides");
    expect(result).toBe("Ocean tides");
  });

  it("keeps short titles (min 2 chars)", async () => {
    const result = await extractTitle("AI");
    expect(result).toBe("Ai"); // capitalized
  });

  it("removes leading articles like 'the', 'a', 'an'", async () => {
    expect(await extractTitle("explain the history of computing")).toBe(
      "History of computing",
    );

    expect(await extractTitle("what is an introduction to ai")).toBe(
      "Introduction to ai",
    );
  });

  // Table-driven (multiple scenarios at once)
  const cases = [
    { input: "teach me about the stock market", expected: "Stock market" },
    { input: "can you explain photosynthesis", expected: "Photosynthesis" },
    { input: "please tell me about dogs", expected: "About dogs" },
  ];

  cases.forEach(({ input, expected }) => {
    it(`extracts title correctly for: "${input}"`, async () => {
      const result = await extractTitle(input);
      expect(result).toBe(expected);
    });
  });
});
