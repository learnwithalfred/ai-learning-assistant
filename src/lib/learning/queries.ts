import { KnowledgeUnit } from "./types";
import { knowledgeUnits} from './store'


export async function getKnowledgeUnits(): Promise<KnowledgeUnit[]>{
  return knowledgeUnits
  .slice()
  .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
}