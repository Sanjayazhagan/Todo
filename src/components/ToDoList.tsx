import ToDo from "./ToDo";
import type { Data } from "../App";

interface ToDoListProps {
  data: Data[];
  change: React.Dispatch<React.SetStateAction<Data[]>>
  Spacename?: string;
}

export default function ToDoList({ data, change, Spacename }: ToDoListProps) {
  const space = data.find((u) => u.title === Spacename);

  const HandleDelete = (id: number) => {
    change((prev: Data[]) =>
      prev.map((s) =>
        s.title === Spacename
          ? {
              ...s,
              tasks: s.tasks.filter((task) => task.id !== id),
            }
          : s
      )
    );
  };
  const HandleToggle = (id: number) => {
  change((prev: Data[]) =>
    prev.map((s) =>
      s.title === Spacename
        ? {
            ...s,
            tasks: s.tasks.map((task) =>
              task.id === id ? { ...task, completed: !task.completed } : task
            ),
          }
        : s
    )
  );
    };
    const HandleEdit = (id: number, newTitle: string) => {
        change((prev: Data[]) =>
            prev.map((s) =>
            s.title === Spacename
                ? {
                    ...s,
                    tasks: s.tasks.map((task) =>
                    task.id === id ? { ...task, title: newTitle } : task
                    ),
                }
                : s
            )
        );
    };
    const HandleUpdateDeadline = (id: number, newDeadline: string) => {
        change((prev: Data[]) =>
            prev.map((s) =>
            s.title === Spacename
                ? {
                    ...s,
                    tasks: s.tasks.map((task) =>
                    task.id === id
                        ? { ...task, deadline: newDeadline }
                        : task
                    ),
                }
                : s
            )
        );
    };


  const renderItems = space?.tasks.map((task) => (
    <ToDo
      id={task.id}
      key={task.id}
      deadline={task.deadline}
      title={task.title}
      completed={task.completed}
      onDelete={() => HandleDelete(task.id)}
      onToggle={()=>HandleToggle(task.id)}
      onName={HandleEdit}
      onDeadline={HandleUpdateDeadline}
    />
  ));

  return <div>{renderItems}</div>;
}
