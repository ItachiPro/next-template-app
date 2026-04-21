export const dateFormatted = (date: string) => {
  const newDate = new Date(date)

  return new Intl.DateTimeFormat('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(newDate)
}
