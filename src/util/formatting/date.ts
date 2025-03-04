export const dateAsStringToDate = (dateAsString?: string) => {
  if (!dateAsString) {
    return
  }

  const date = new Date(dateAsString)
  return date
}

export const formatDate = (
  date?: Date,
  isShortDate: boolean = false,
  withTime: boolean = false,
  locale?: string,
) => {
  if (!date) {
    return
  }

  // Format date
  const formatedDate = date
    .toLocaleString(locale || navigator.language, {
      // Date
      dateStyle: isShortDate ? "short" : undefined,
      weekday: isShortDate ? undefined : "short",
      day: isShortDate ? undefined : "2-digit",
      month: isShortDate ? undefined : "short",
      year: isShortDate ? undefined : "numeric",
      // Time
      hour: withTime ? "2-digit" : undefined,
      minute: withTime ? "2-digit" : undefined,
      second: withTime ? "2-digit" : undefined,
    })
    // Remove ","
    .replaceAll(",", "")
  return formatedDate
}

export const formatDateTime = (
  date?: Date,
  isShortDate: boolean = false,
  locale?: string,
) => {
  return formatDate(date, isShortDate, true, locale)
}
