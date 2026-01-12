type props = {
  action: (formData: FormData) => Promise<void>;
}


export default function KnowledgeUnitForm({ action }: props) {

  return (
    <form action={action}>
      <textarea name="prompt" id="prompt" placeholder="What do you want to learn?"></textarea>
      <select name="level" id="level">
        <option value='beginner'>Beginner</option>
        <option value='intermediate'>Intermediate</option>
        <option value='advanced'>Advanced</option>
      </select>

      <button type="submit">Teach me</button>
    </form>
  )
}