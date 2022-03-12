import { useMemo } from "react";
import { useSelector } from "react-redux";
import { getDate } from "../../utils/date-utils";

import View from "./shared/View";
import Todo from "../Todo/Todo";

import "./UpcomingView.css";

const nextDays = [];
const nextMonths = [];
const now = new Date();
const today = new Date(
  new Date(new Date().setUTCDate(now.getDate())).setUTCHours(0, 0, 0, 0)
);
for (let i = 1; i <= 7; i++) {
  nextDays.push(
    new Date(
      new Date(new Date().setUTCDate(now.getDate() + i)).setUTCHours(0, 0, 0, 0)
    )
  );
}
for (let i = 0; i < 4; i++) {
  nextMonths.push(new Date(new Date().setMonth(now.getMonth() + i)));
}

function DayView(props) {
  const date = props.date.toString().padStart(2, "0");
  return (
    <div className="day-view">
      <div className="date-header">
        <span className="date-number">{date}</span>
        <span className="date-weekday top-line">{props.weekday}</span>
      </div>
      {props.todos.map((todo) => (
        <Todo key={todo.id} todo={todo} />
      ))}
    </div>
  );
}

function MonthView(props) {
  const showDays = props.first && props.last;
  return (
    <div className="day-view">
      <div className="date-header top-line">
        <span className="month-name">{props.month}</span>
        {showDays && (
          <span className="month-days">{`${props.first}-${props.last}`}</span>
        )}
      </div>
      {props.todos.map((todo) => (
        <Todo key={todo.id} todo={todo} />
      ))}
    </div>
  );
}

function UpcomingView() {
  const allTodos = useSelector((state) => state.todo.todos);
  const todos = useMemo(
    () =>
      allTodos.filter((item) => new Date(item.date) > today && !item.completed),
    [allTodos]
  );
  console.log(todos);

  return (
    <View title="Upcoming">
      {nextDays.map((date, index) => (
        <DayView
          key={index}
          date={date.getUTCDate()}
          weekday={new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(
            date
          )}
          todos={todos.filter(
            (todo) => new Date(todo.date).valueOf() === date.valueOf()
          )}
        />
      ))}
      {nextMonths.map((date, index) => {
        const day7 = nextDays[nextDays.length - 1];
        const thisMonthTodos = todos.filter(
          (todo) =>
            new Date(todo.date).getMonth() === date.getMonth() &&
            new Date(todo.date).getDate() > day7.getDate()
        );
        if (index === 0) {
          const lastDay = new Date(day7.getFullYear(), day7.getMonth() + 1, 0);
          return (
            <MonthView
              key={index}
              month={new Intl.DateTimeFormat("en-US", { month: "long" }).format(
                date
              )}
              first={day7.getUTCDate() + 1}
              last={lastDay.getUTCDate()}
              todos={thisMonthTodos}
            />
          );
        }
        return (
          <MonthView
            key={index}
            month={new Intl.DateTimeFormat("en-US", { month: "long" }).format(
              date
            )}
            todos={thisMonthTodos}
          />
        );
      })}
    </View>
  );
}

export default UpcomingView;
