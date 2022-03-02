export const isEmpty = (todo) => {
  return !todo.title && !todo.notes && !todo.date && !todo.deadline
}