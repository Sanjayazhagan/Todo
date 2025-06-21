import SpacePreview from "../components/SpacePrieview";
import AddButton from "../components/AddButton";
import { Link } from "react-router-dom";
import type { Data } from "../App";
import { useState } from "react";
import EditSpace from "../components/EditSpace";
import AddSpace from "../components/AddSpace";
export interface HomePageProp{
    data : Data[],
    change: React.Dispatch<React.SetStateAction<Data[]>>
}
function HomePage({data,change}:HomePageProp) {
    const [id,setid]=useState("")
    const [editPage,setEditPage]=useState(false)
    const [AddPage,setAddPage]=useState(false)
    const HandeleOnDelete=( id:string )=>{
            const updatedData = data.filter((space) => {
            return space.id !== id;
        });
        change(updatedData);
    }
    const HandleEdit=()=>{
        setEditPage(!editPage)
    }
    const Edit=(id:string)=>{
        HandleEdit();
        setid(id);
    }
  console.log(data)
  return (<div className="h-full">
    {editPage&&<EditSpace editToggle={HandleEdit} id={id} data={data} change={change} />}
    {AddPage&&<AddSpace AddToggle={()=>{setAddPage(!AddPage)}} data={data} change={change} />}
    <div className="p-6 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
      {data.map((space) => (
        <Link key={space.id} to={`/space/${space.title}`}>
        <SpacePreview
          id={space.id}
          title={space.title}
          tasks={space.tasks}
          onDelete={HandeleOnDelete}
          onEdit={()=>{Edit(space.id)}}
        /></Link>
      ))}
    </div><div onClick={()=>{setAddPage(!AddPage)}}>
    <AddButton/>
    </div>
    </div>
  );
}
export default HomePage;