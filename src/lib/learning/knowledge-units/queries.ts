import { KnowledgeUnit, KnowledgeUnitSammary } from "./types";
import { knowledgeUnits } from './store'


export async function getKnowledgeUnits(): Promise<KnowledgeUnit[]> {
  return knowledgeUnits
    .slice()
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
}

export async function getKnowledgeUnitById(id: string): Promise<KnowledgeUnit | null> {
  return knowledgeUnits.find((u) => u.id === id) ?? null;
}


// Render summaries instead of every unit
export async function getKnowledgeUnitSummaries(): Promise<KnowledgeUnitSammary[]> {
  return knowledgeUnits.slice()
    .map(unit => ({
      id: unit.id,
      topic: unit.topic,
      keyPoints: unit.keyPoints,
      createdAt: unit.createdAt,
    }))
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
}
