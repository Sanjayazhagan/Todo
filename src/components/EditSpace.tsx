//import Modal from "./Modal"
import { useState } from "react";
import type { Data } from "../App";
import { IoIosCloseCircle } from "react-icons/io";
interface AddEditSpaceProp{
    change:(data:Data[])=>void,
    data:Data[],
    id:string,
    editToggle:()=>void,
}
function AddEditSpace({change,data,id,editToggle}:AddEditSpaceProp){
    const [name, setName] = useState(() => {
    const match = data.find((item) => item.id === id);
    return match ? match.title : "";
});

    const HandleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        setName(e.target.value)
    }
    const HandleSubmit=(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        editToggle();
        const updatedData = data.map((data) => {
            if (data.id===id){
                return {id:name,title:name,tasks:data.tasks}
            }
            else{
                return data
            }
        });

        change(updatedData);
    }
    return<div className="flex justify-center items-center absolute w-10/12 left-1/12 top-1/3 p-1 z-90 bg-white">
        <form onSubmit={HandleSubmit} className="flex justify-center flex-col items-center shadow-2xl rounded-2xl w-full h-full pt-5 pb-5 z-90">
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
        <div onClick={()=>{editToggle()}} className=" absolute top-0 right-0"><IoIosCloseCircle className="w-7 h-7" /></div>
    </div>
}
export default AddEditSpace