import { getDate } from "./date-utils";

const today = new Date(
  new Date(new Date().setUTCDate(new Date().getDate())).setUTCHours(0, 0, 0, 0)
);

const tomorrow = new Date(
  new Date(new Date().setUTCDate(new Date().getDate() + 1)).setUTCHours(0, 0, 0, 0)
);

export const isEmpty = (todo) => {
  return !todo.title && !todo.notes && !todo.date && !todo.deadline;
};

export const getTodoFromContext = (context) => {
  switch (context) {
    case "/inbox":
      return {};
    case "/today":
      return {
        inbox: false,
        date: getDate(today),
      };
    case "/upcoming":
      return {
        inbox: false,
        date: getDate(tomorrow),
      };
    case "/anytime":
      return {
        inbox: false,
      };
    case "/someday":
      return {
        inbox: false,
        someday: true,
      };
    default:
      return {};
  }
};
