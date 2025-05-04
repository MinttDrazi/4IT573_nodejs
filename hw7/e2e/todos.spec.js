import { test, expect } from "@playwright/test"

test("index page has title", async ({ page }) => {
  await page.goto("/")

  await expect(page.getByText("MY TODO APP")).toBeDefined()
})

test("form on index page creates new todos", async ({
  page,
}) => {
  await page.goto("/")

  await page.getByLabel("Název todo").fill("E2E todo")
  await page.getByText("Přidat todo").click()

  await expect(page.getByText("E2E todo")).toBeDefined()
})

test("can show single todo", async ({ page }) => {
  await page.goto("/")

  await page.getByLabel("Název todo").fill("Single todo")
  await page.getByText("Přidat todo").click()

  await page.getByText("Single todo").click()

  await expect(page.getByText("Single todo")).toBeDefined()
})

test("can toggle todo", async ({ page }) => {
  await page.goto("/")

  await page.getByLabel("Název todo").fill("Toggle todo")
  await page.getByText("Přidat todo").click()

  await page.getByText("Toggle todo").click()

  await page.getByText("nedokončeno").click()

  await expect(page.getByText("dokončeno")).toBeDefined()
})

test("can remove todo", async ({ page }) => {
  await page.goto("/")

  await page.getByLabel("Název todo").fill("Remove todo")
  await page.getByText("Přidat todo").click()

  await page.getByText("Remove todo").click()
  await page.getByText("nedokončeno").click()
  await page.getByText("odebrat").click()

  const removed = page.getByText("Remove todo")
  await expect(removed).toHaveCount(0)
})

test("can rename todo", async ({ page }) => {
  await page.goto("/")

  await page.getByLabel("Název todo").fill("Edit todo")
  await page.getByText("Přidat todo").click()

  await page.getByText("Edit todo").click()

  await page.getByLabel("Titulek").fill("Edited todo")
  await page.getByText("Uložit").click()

  await expect(page.getByText("Edited todo")).toBeDefined()
})

test("can change priority", async ({ page }) => {
  await page.goto("/")

  await page.getByLabel("Název todo").fill("Priority todo")
  await page.getByText("Přidat todo").click()

  await page.getByText("Priority todo").click()

  await page.getByLabel("Priorita").selectOption("high")
  await page.getByText("Uložit").click()

  await expect(page.getByText("Vysoká")).toBeDefined()
})

test("can get to todo list", async ({ page }) => {
  await page.goto("/")

  await page.getByLabel("Název todo").fill("back to list")
  await page.getByText("Přidat todo").click()

  await page.getByText("back to list").click()

  await page.getByText("Todočka").click()

  await expect(page.getByText("MY TODO APP")).toBeDefined()
})
