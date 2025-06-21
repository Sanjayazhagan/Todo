import { useState } from "react";
import { useEffect } from "react";
import { getItem,setItem } from "../Util/LocalStorage";
export function usePresistedState<t>(key:string,intialValue:t){
    const [value,setValue]=useState(()=>{
    const item=getItem(key);
    return (item as t)|| intialValue;
    });

    useEffect(()=>{
        setItem(key,value)
    },[value]);
    return [value,setValue] as const;
}