import { describe, it, expect, vi, type Mock } from "vitest";


vi.mock("@/lib/ai/openai-client", () => ({
  openaiClient: {
    responses: {
      create: vi.fn(),
    },
  },
}));

(openaiClient.responses.create as Mock).mockResolvedValue({
  output_text: JSON.stringify({
    explanation: "Valid explanation",
    keyPoints: ["one", "two"],
  }),
});


import { generateAILesson } from "@/lib/learning/lessons/ai";
import { openaiClient } from "@/lib/ai/openai-client";


describe("generateAILesson", () => {
  it("returns structured lesson when model returns valid JSON", async () => {
    const mockResponse = {
      output_text: JSON.stringify({
        explanation: "This is a valid explanation.",
        keyPoints: ["Point 1", "Point 2"],
      }),
    };

    (openaiClient.responses.create as Mock).mockResolvedValue(mockResponse);

    const result = await generateAILesson({ prompt: "React" });

    expect(result).toEqual({
      explanation: "This is a valid explanation.",
      keyPoints: ["Point 1", "Point 2"],
    });

    expect(openaiClient.responses.create).toHaveBeenCalled();
  });


  it("throws if model returns empty output_text", async () => {
    (openaiClient.responses.create as Mock).mockResolvedValue({
      output_text: "",
    });

    await expect(
      generateAILesson({ prompt: "React" })
    ).rejects.toThrow("Model returned empty response");
  });


  it("throws if model returns invalid JSON", async () => {
    (openaiClient.responses.create as Mock).mockResolvedValue({
      output_text: "Not JSON",
    });

    await expect(
      generateAILesson({ prompt: "React" })
    ).rejects.toThrow("Model did not return valid JSON.");
  });



  it("throws if JSON shape is invalid", async () => {
    (openaiClient.responses.create as Mock).mockResolvedValue({
      output_text: JSON.stringify({
        explanation: 123,
        keyPoints: "not-array",
      }),
    });

    await expect(
      generateAILesson({ prompt: "React" })
    ).rejects.toThrow("JSON shape does not match GeneratedLesson");
  });


  it("sends formatted prompt to OpenAI", async () => {
    (openaiClient.responses.create as Mock).mockResolvedValue({
      output_text: JSON.stringify({
        explanation: "Valid explanation",
        keyPoints: ["Point 1"],
      }),
    });

    await generateAILesson({ prompt: "Graph Theory" });

    expect(openaiClient.responses.create).toHaveBeenCalledWith(
      expect.objectContaining({
        input: expect.stringContaining("Graph Theory"),
      })
    );
  });
});