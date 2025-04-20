import test from "ava"
import { migrate } from "drizzle-orm/libsql/migrator"
import { todosTable } from "../src/schema.js"
import {
  db,
  getTodoById,
  getAllTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} from "../src/db.js"
import { eq } from "drizzle-orm"

test.before("run migrations", async () => {
  await migrate(db, { migrationsFolder: "drizzle" })
})

test.beforeEach(async () => {
  await db.delete(todosTable)
})

test("getAllTodos returns array of todos", async (t) => {
  await db.insert(todosTable).values({
    id: 1,
    title: "test todo",
    done: false,
  })
  await db.insert(todosTable).values({
    id: 2,
    title: "test todo 2",
    done: false,
  })

  const todos = await getAllTodos()

  t.is(todos.length, 2)
})

test("getTodoById returns todo", async (t) => {
  await db.insert(todosTable).values({
    id: 3,
    title: "test todo 3",
    done: false,
  })

  const todo = await getTodoById(3)

  t.is(todo.title, "test todo 3")
})

test("createTodo inserts new todo into db", async (t) => {
  const newTodo = {
    id: 4,
    title: "created todo",
    done: false,
  }
  await createTodo(newTodo)

  const todo = await db
    .select()
    .from(todosTable)
    .where(eq(todosTable.id, 4))
    .get()

  t.is(todo.title, "created todo")
})

test("updateTodo updates existing todo in db", async (t) => {
  await db
    .insert(todosTable)
    .values({ id: 5, title: "created todo 2", done: false })

  await updateTodo({ title: "updated todo" }, 5)

  const updatedTodo = await db
    .select()
    .from(todosTable)
    .where(eq(todosTable.id, 5))
    .get()

  t.is(updatedTodo.title, "updated todo")
})

test("deleteTodo can delete existing todo in db", async (t) => {
  await db
    .insert(todosTable)
    .values({ id: 6, title: "created todo 3", done: false })

  await deleteTodo(6)

  const deletedTodo = await db
    .select()
    .from(todosTable)
    .where(eq(todosTable.id, 6))
    .get()

  t.falsy(deletedTodo)
})
