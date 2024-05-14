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

export const isMarkdownTable = (markdown: string) => {
  const lines = markdown.split("\n")

  for (const line of lines) {
    // Проверяем, начинается ли строка с |, что является признаком начала таблицы
    if (line.trim().startsWith("|")) {
      // Проверяем, что строка содержит как минимум один символ |, за исключением первого символа
      if (line.trim().substring(1).includes("|")) {
        // Проверяем, что строка содержит две или более ячеек таблицы, разделённые символом |
        const cells = line.trim().split("|")
        if (cells.length >= 3) {
          return true
        }
      } else {
        break
      }
    } else {
      break
    }
  }
  return false
}
