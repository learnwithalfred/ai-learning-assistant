import { KnowledgeUnit } from "@/lib/learning/types";

type props = {
  units: KnowledgeUnit[]
}

export default function KnowledgeUnitList({ units }: props) {
  if (!units.length) return <div> No Records</div>

  return <div>
    <ul>{
      units.map(unit => (
        <li key={unit.id}>
          <p>Topic: {unit.topic}</p>
          <p>Level: {unit.level}</p>
          <p>Created At: {unit.createdAt.toUTCString()}</p>
        </li>
      ))
    }
    </ul>
  </div>
}