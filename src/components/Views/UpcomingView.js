import { useMemo } from "react";
import { useSelector } from "react-redux";
import { getDate } from "../../utils/date-utils";

import View from "./View";
import Todo from "../Todo/Todo";

import "./UpcomingView.css";

const nextDays = [];
const nextMonths = [];
const today = new Date();
for (let i = 1; i <= 7; i++) {
  nextDays.push(new Date(new Date().setDate(today.getDate() + i)));
}
for (let i = 1; i <= 4; i++) {
  nextMonths.push(new Date(new Date().setMonth(today.getMonth() + i)));
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
      {/* {props.todos.map((todo) => (
        <Todo key={todo.id} todo={todo} />
      ))} */}
    </div>
  );
}

function UpcomingView() {
  const allTodos = useSelector((state) => state.todo.todos);
  const todos = useMemo(
    () =>
      allTodos.filter(
        (item) => new Date(item.date) > new Date() && !item.completed
      ),
    [allTodos]
  );

  return (
    <View title="Upcoming">
      {nextDays.map((date, index) => (
        <DayView
          key={index}
          date={date.getDate()}
          weekday={new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(
            date
          )}
          todos={todos.filter((todo) => {
            return getDate(new Date(todo.date)) === getDate(date);
          })}
        />
      ))}
      {nextMonths.map((date, index) => {
        if (index === 0) {
          return (
            <MonthView
              key={index}
              month={new Intl.DateTimeFormat("en-US", { month: "long" }).format(
                date
              )}
              first="7"
              last="31"
            />
          );
        }
        return (
          <MonthView
            key={index}
            month={new Intl.DateTimeFormat("en-US", { month: "long" }).format(
              date
            )}
          />
        );
      })}
    </View>
  );
}

export default UpcomingView;
