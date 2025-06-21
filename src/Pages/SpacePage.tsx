import { useParams } from "react-router-dom";
import type { HomePageProp } from "./HomePage";
import AddButton from "../components/AddButton";
import type { Data } from "../App";
import ToDoList from "../components/ToDoList"
import AddTask from "../components/AddTask";
import { useState } from "react";
import Start from "../components/start";
function SpacePage({data,change}:HomePageProp){
    
    const [AddToggle,setAddToggle]=useState(false);
    const { Spacename } = useParams();
    const space = data.find((u) => u.title === Spacename);
    const HandleAddTask = (title: string, deadline: string) => {
            if (!title.trim()) return;

            change((prev: Data[]) =>
                prev.map((s) =>
                s.title === Spacename
                    ? {
                        ...s,
                        tasks: [
                        ...s.tasks,
                        {
                            id: Date.now(),
                            title: title.trim(),
                            completed: false,
                            deadline: deadline,
                            pin:false 
                        },
                        ],
                    }
                    : s
                )
            );
            setAddToggle(!AddToggle)
            };

    return <div>
        {AddToggle&&<AddTask SetAddToggle={()=>{setAddToggle(!AddToggle)}} Add={HandleAddTask}/>}
        {space?.tasks.length===0?<Start Toggle={()=>{setAddToggle(!AddToggle)}}/>:<ToDoList data={data} change={change} Spacename={Spacename}/>}
        <div onClick={()=>{setAddToggle(!AddToggle)}}>
        <AddButton />
        </div>
    </div>
}
export default SpacePage