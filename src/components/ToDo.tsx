import { useState } from "react"
import { IoIosCloseCircle } from "react-icons/io";

interface ToDoProps{
    id:number,
    title:string,
    completed:boolean,
    deadline:string,
    onDelete:()=>void,
    onToggle:()=>void,
    onName:(id:number,newTitle:string)=>void
    onDeadline:(id:number,newTitle:string)=>void
}

export default function ToDo({id,title,completed,onDelete,onToggle,onName,deadline,onDeadline }:ToDoProps){
    const [complete,setComnpleted]=useState(completed);
    const [edit,setEdit]=useState(false);
    const [task,setTask]=useState(title);
    const [Deadline,setDeadline]=useState(deadline);
    const HandleEdit=()=>{
        setEdit(!edit)
    }
    const HandleChange=()=>{
        setComnpleted(!complete)
        onToggle()
    }
    
    const NameChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        setTask(e.target.value);
    }
    const DeadlineChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        setDeadline(e.target.value);
    }
    return <div className="">
        <form className=" relative flex items-center m-2 p-3 shadow bg-gray-50 hover:bg-gray-100" onSubmit={(e)=>{e.preventDefault(); setEdit(!edit); onName(id,task); onDeadline(id,Deadline)}}>
            <div className="flex items-center">
            <input 
            type="checkbox"
            className="w-7 h-7"
            checked={complete}
            onChange={HandleChange}
            ></input>
            <div className="flex flex-col">
            {edit?<input type="text" className="bg-white pt-3 p-2 text-xl" value={task}onChange={NameChange}></input>:
            <label onClick={HandleEdit} className={`text-xl p-2 ml-2 ${complete?"line-through":""}`}>{task}</label>
            }
            {edit?<input type="date" className="bg-white pt-3 p-2 text-lg " value={Deadline}onChange={DeadlineChange}></input>:
            <label onClick={HandleEdit} className={`text-lg ml-15 text-gray-600 ${complete?"line-through":""}`}>{Deadline}</label>
            }
            </div>
            {edit&&<button className="bg-indigo-600 text-white p-2 rounded-xl text-xl">Save</button>}
            </div>
            <div onClick={onDelete} className=" absolute top-0 right-0"><IoIosCloseCircle className="w-7 h-7" /></div>
        </form>
    </div>
}