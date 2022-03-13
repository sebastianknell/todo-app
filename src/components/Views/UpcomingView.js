import { useMemo } from "react";
import { useSelector } from "react-redux";
import { groupBy } from "lodash";

import View from "./shared/View";
import Todo from "../Todo/Todo";

import "./UpcomingView.css";

const getUpcomingDates = () => {
  const nextDays = [];
  const nextMonths = [];
  const now = new Date();
  const today = new Date(
    new Date(new Date().setUTCDate(now.getDate())).setUTCHours(0, 0, 0, 0)
  );
  for (let i = 1; i <= 7; i++) {
    nextDays.push(
      new Date(
        new Date(new Date().setUTCDate(now.getDate() + i)).setUTCHours(
          0,
          0,
          0,
          0
        )
      )
    );
  }
  for (let i = 0; i < 4; i++) {
    nextMonths.push(new Date(new Date().setMonth(now.getMonth() + i)));
  }
  return { today, nextDays, nextMonths };
};

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

function ListView(props) {
  const showDays = props.first && props.last;
  return (
    <div className="day-view">
      <div className="date-header top-line">
        <span className="month-name">{props.title}</span>
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
  const { today, nextDays, nextMonths } = getUpcomingDates();

  const allTodos = useSelector((state) => state.todo.todos);
  const todos = useMemo(
    () =>
      allTodos.filter((todo) => new Date(todo.date) > today && !todo.completed),
    [allTodos, today]
  );

  const lastShownMonth = nextMonths[nextMonths.length - 1];
  const remainingTodos = todos.filter(
    (todo) =>
      (new Date(todo.date).getUTCMonth() > lastShownMonth.getUTCMonth() &&
        new Date(todo.date).getUTCFullYear() ===
          lastShownMonth.getUTCFullYear()) ||
      new Date(todo.date).getUTCFullYear() > lastShownMonth.getUTCFullYear()
  );
  const remainingTodosByYear = groupBy(remainingTodos, (todo) =>
    new Date(todo.date).getUTCFullYear()
  );

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
        const lastShownDay = nextDays[nextDays.length - 1];
        if (index === 0) {
          const lastDayOfMonth = new Date(
            lastShownDay.getFullYear(),
            lastShownDay.getMonth() + 1,
            0
          );
          return (
            <ListView
              key={index}
              title={new Intl.DateTimeFormat("en-US", { month: "long" }).format(
                date
              )}
              first={lastShownDay.getUTCDate() + 1}
              last={lastDayOfMonth.getUTCDate()}
              todos={todos
                .filter(
                  (todo) =>
                    new Date(todo.date).getUTCFullYear() ===
                      date.getUTCFullYear() &&
                    new Date(todo.date).getUTCMonth() === date.getUTCMonth() &&
                    new Date(todo.date).getUTCDate() > lastShownDay.getUTCDate()
                )
                .sort(
                  (a, b) =>
                    new Date(a.date).getTime() - new Date(b.date).getTime()
                )}
            />
          );
        }
        return (
          <ListView
            key={index}
            title={new Intl.DateTimeFormat("en-US", { month: "long" }).format(
              date
            )}
            todos={todos
              .filter(
                (todo) =>
                  new Date(todo.date).getUTCFullYear() ===
                    date.getUTCFullYear() &&
                  new Date(todo.date).getUTCMonth() === date.getUTCMonth()
              )
              .sort(
                (a, b) =>
                  new Date(a.date).getTime() - new Date(b.date).getTime()
              )}
          />
        );
      })}
      {Object.keys(remainingTodosByYear).map((year, index) => (
        <ListView
          key={index}
          title={year}
          todos={remainingTodosByYear[year].sort(
            (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
          )}
        />
      ))}
    </View>
  );
}

export default UpcomingView;
