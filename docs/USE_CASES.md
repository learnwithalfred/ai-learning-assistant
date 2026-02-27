# AI Learning Assistant – Use Cases

This document describes user-facing behavior of the system.

---

## 1. Create Lesson

**Actor:** User  
**Goal:** Learn a piece of content  

### Flow

1. User pastes content
2. Clicks **Teach me**
3. AI generates:
   - Explanation
   - Key Points
4. Lesson is stored in database
5. UI refreshes with new Lesson

---

## 2. View Lesson

**Actor:** User  

### Flow

1. User sees a list of Lessons
2. Clicks one
3. App renders explanation and key points

---

## 3. Ask Follow-Up Question

**Actor:** User  

### Flow

1. User submits a question
2. System:
   - Stores user message
   - Generates grounded AI response
   - Stores assistant message
3. UI refreshes

---

## 4. Generate Quiz (Planned)

**Actor:** User  

### Flow

1. User clicks **Quiz me**
2. AI generates questions
3. User answers
4. System evaluates responses