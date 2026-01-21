Full Flow: “Teach me” (Correct)

UI (Client)
User pastes content and selects a level
Clicks Teach me
Browser submits a <form> to a Server Action
Server Action (App layer / glue)
Receives FormData
Extracts input (prompt, level)
Calls the domain mutation: createLesson(request)
Triggers revalidatePath(...) so the UI refreshes
Domain Mutation (lib/learning/mutations.ts)
Validates request
Calls generateExplanation(request) to get the AI explanation
Constructs a Lesson object:
id
topic (if we extract it)
originalPrompt
explanation
level
createdAt
Saves it to the store/DB
Returns the created Lesson
AI Function (lib/learning/ai.ts)
Calls AI API
Returns explanation text
UI Update
Because the action revalidated the route, the page re-runs
The page queries updated Lessons and renders the new list/view

What happens when user asks a follow-up:
Save the user message
Generate the assistant response grounded in the selected Lesson
Save the assistant message
Revalidate so UI updates
