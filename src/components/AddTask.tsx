import { useState } from "react"
import { IoIosCloseCircle } from "react-icons/io";
interface AddTaskProp{
    SetAddToggle:()=>void,
    Add:(title:string,deadline:string)=>void
}
function AddTask({SetAddToggle,Add}:AddTaskProp){
    const [name, setName] = useState("")
    const [Deadline, setDeadline] = useState("")

    const HandleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        setName(e.target.value)
    }
    const HandleChangeDate=(e:React.ChangeEvent<HTMLInputElement>)=>{
        setDeadline(e.target.value)
    }
    const HandleSubmit=(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        SetAddToggle();
        Add(name,Deadline)
    }
    return<div className="flex justify-center items-center absolute w-10/12 left-1/12 top-1/3 z-50 bg-white ">
        <form onSubmit={HandleSubmit} className="flex justify-center flex-col items-center shadow-2xl rounded-2xl w-full h-full pt-5 pb-5">
            <div className="flex justify-around">
            <label className="pr-3 text-xl">Name:</label>
            <input 
            value={name}
            onChange={HandleChange}
            type="text" 
            className="bg-white "></input>
            </div>
            <div className="flex justify-around mt-2">
            <label className="pr-3 text-xl">DeadLine:</label>
            <input 
            value={Deadline}
            onChange={HandleChangeDate}
            type="date" 
            className="bg-white "></input>
            </div>
            <button className="rounded-2xl pl-4 pr-4 pb-2 text-xl bg-indigo-600 mt-5">Save</button>
        </form>
        <div onClick={()=>{SetAddToggle()}} className=" absolute top-0 right-0"><IoIosCloseCircle className="w-7 h-7" /></div>
    </div>
}
export default AddTask