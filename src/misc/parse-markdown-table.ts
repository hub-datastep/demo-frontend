export const parseMarkdownTable = (markdown: string) => {
  const data = markdown.trim().split("\n")
  const columns = data[0]
    .replace(/\s*\|\s*/, "|")
    .split("|")
    .filter(Boolean)
  const rows = data.slice(2).map((row) =>
    row
      .replace(/\s*\|\s*/, "|")
      .split("|")
      .filter(Boolean)
  )
  return { columns, rows }
}
