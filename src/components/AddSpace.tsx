//import Modal from "./Modal"
import { useState } from "react";
import type { Data } from "../App";
import { IoIosCloseCircle } from "react-icons/io";
interface AddSpaceProp{
    change:(data:Data[])=>void,
    data:Data[],
    AddToggle:()=>void,
}
function AddSpace({change,data,AddToggle}:AddSpaceProp){
    const [name, setName] = useState("")

    const HandleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        setName(e.target.value)
    }
    const HandleSubmit=(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        AddToggle();
        const updatedData=[...data,{id:name,title:name,tasks:[]}]
        change(updatedData);
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
            <button className="rounded-2xl pl-4 pr-4 pb-2 pt-1 text-xl bg-indigo-600 mt-5">Save</button>
        </form>
        <div onClick={()=>{AddToggle()}} className=" absolute top-0 right-0"><IoIosCloseCircle className="w-7 h-7" /></div>
    </div>
}
export default AddSpace