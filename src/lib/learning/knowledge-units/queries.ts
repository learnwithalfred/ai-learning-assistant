import { KnowledgeUnit } from "./types";
import { knowledgeUnits } from './store'


export async function getKnowledgeUnits(): Promise<KnowledgeUnit[]> {
  return knowledgeUnits
    .slice()
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
}

export async function getKnowledgeUnitById(id: string): Promise<KnowledgeUnit | null> {
  return knowledgeUnits.find((u) => u.id === id) ?? null;
}