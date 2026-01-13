Full Flow: “Teach me” (Correct)

UI (Client)
  User pastes content and selects a level
  Clicks Teach me
  Browser submits a <form> to a Server Action
Server Action (App layer / glue)
  Receives FormData
  Extracts input (prompt, level)
  Calls the domain mutation: createKnowledgeUnit(request)
  Triggers revalidatePath(...) so the UI refreshes
Domain Mutation (lib/learning/mutations.ts)
  Validates request
  Calls generateExplanation(request) to get the AI explanation
    Constructs a KnowledgeUnit object:
    id
    topic (if we extract it)
    originalPrompt
    explanation
    level
    createdAt
    Saves it to the store/DB
    Returns the created KnowledgeUnit
AI Function (lib/learning/ai.ts)
  Calls AI API
Returns explanation text
UI Update
Because the action revalidated the route, the page re-runs
The page queries updated KnowledgeUnits and renders the new list/view
