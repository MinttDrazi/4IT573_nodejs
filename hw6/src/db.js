import { drizzle } from "drizzle-orm/libsql"
import { todosTable } from "./schema.js"
import { eq } from "drizzle-orm"

export const db = drizzle({
  connection:
    process.env.NODE_ENV === "test"
      ? "file::memory:"
      : "file:db.sqlite",
  logger: process.env.NODE_ENV !== "test",
})

export const getAllTodos = async () => {
  const todos = db.select().from(todosTable).all()

  return todos
}

export const getTodoById = async (id) => {
  const todo = await db
    .select()
    .from(todosTable)
    .where(eq(todosTable.id, id))
    .get()

  return todo
}

export const createTodo = async (todoValues) => {
  await db.insert(todosTable).values(todoValues)
}

export const updateTodo = async (todoValues, id) => {
  await db
    .update(todosTable)
    .set(todoValues)
    .where(eq(todosTable.id, id))
}

export const deleteTodo = async (id) => {
  await db.delete(todosTable).where(eq(todosTable.id, id))
}
