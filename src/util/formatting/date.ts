export const dateAsStringToDate = (dateAsString?: string) => {
  if (!dateAsString) {
    return
  }

  const date = new Date(dateAsString)
  return date
}

export const formatDate = (date?: Date) => {
  if (!date) {
    return
  }

  const formatedDate = date
    .toLocaleString(undefined, {
      weekday: "short",
      day: "2-digit",
      month: "short",
      year: "numeric",
    })
    // Remove ","
    .replaceAll(",", "")
  return formatedDate
}

export const formatDateTime = (date?: Date) => {
  if (!date) {
    return
  }

  const formattedDateTime = date
    .toLocaleString(undefined, {
      weekday: "short",
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
    // Remove ","
    .replaceAll(",", "")
  return formattedDateTime
}
