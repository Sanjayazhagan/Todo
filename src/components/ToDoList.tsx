import ToDo from "./ToDo";
import type { Data } from "../App";
import Dropdown from "./DropDown";
import { useState } from "react";
interface ToDoListProps {
  data: Data[];
  change: React.Dispatch<React.SetStateAction<Data[]>>
  Spacename?: string;
}
interface option{
    id : string,
    label:string
}
export default function ToDoList({ data, change, Spacename }: ToDoListProps) {
    const [currentFilter,setCurrentFilter]=useState<option|null>(null)
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
const HandleTogglepin = (id: number) => {
  change((prev: Data[]) =>
    prev.map((s) =>
      s.title === Spacename
        ? {
            ...s,
            tasks: s.tasks.map((task) =>
              task.id === id ? { ...task, pin: !task.pin } : task
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


    let filteredTasks = space?.tasks || [];

    if (currentFilter?.label === "Deadline") {
    filteredTasks = [...filteredTasks].sort((a, b) =>
        a.deadline.localeCompare(b.deadline)
    );
    } else if (currentFilter?.label === "status") {
    filteredTasks = [...filteredTasks].sort((a, b) =>
        Number(a.completed) - Number(b.completed)
    );
    } else if (currentFilter?.label === "pin") {
    filteredTasks = [...filteredTasks].filter(task => task.pin);
    }


  const renderItems = filteredTasks.map((task) => (
    <ToDo
      id={task.id}
      key={task.id}
      deadline={task.deadline}
      title={task.title}
      pin={task.pin}
      completed={task.completed}
      onDelete={() => HandleDelete(task.id)}
      onToggle={()=>HandleToggle(task.id)}
      onName={HandleEdit}
      onDeadline={HandleUpdateDeadline}
      onTogglePin={()=>{HandleTogglepin(task.id)}}
    />
  ));

  const filter:option[]= [
        { id: "1", label: "Deadline", },
        { id: "2", label: "status" },
        { id: "3", label: "pin" }
]; 
  return <div>
    <Dropdown options={filter} value={currentFilter} onChange={setCurrentFilter}/>
    {renderItems}
    </div>;
}
