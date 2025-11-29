import { useState, type ChangeEvent } from "react";
import { Link, useNavigate } from "react-router-dom"
import type {Signuptype} from "ayushdevinfermedium1-common"
import axios from "axios"
import { baseurl } from "../../config";

export const Form=({type}:{type:"signin"|"signup"})=>{
    const navigate =useNavigate();
    const [error,seterror]=useState<string>("")
    const [postbody , setpostbody]=useState<Signuptype>({
           name:"",
           email:"",
           password:""
    })
    async function submitform(){
           try {
          if(type==='signup')
          {
              if(!postbody.name){
                seterror("name is required!");
                return;
            }
            if(postbody.name?.length<=4)
            {
                seterror("name length should be greater than 4");
                return;
            }
           for (const e of postbody.name) {
              if(e>='a'&&e<='z'||e>='A'&&e<='Z'||e>='0'&&e<='9') continue;
              else {
                seterror("name should not contain special characters")
                return;
              }
           }
          }
            const response=await axios.post(`${baseurl}/api/v1/user/${type==="signin"?"signin":"signup"}`,postbody
           );
          const jwt = `Bearer ${response.data.token}`;
           localStorage.setItem("token",jwt);
           navigate('/blogs');
           } catch (e:any) {
            seterror(e.response.data.message);
           }
    }
    return <div className="h-full w-full">
        <div className="flex flex-col items-center h-full w-full justify-center ">
            <div><h1 className="text-3xl font-extrabold">Create an account</h1></div>
            <div className="text-slate-500"><h2>{type==='signup'?"Already have an account?":"Don't have an account?"} <Link className="underline text-blue-400" to={`/${type==='signup'?"signin":"signup"}`}>{type==='signup'?"Signin":"Signup"}</Link></h2></div>
           <div className="flex flex-col w-2/5 gap-2 pt-4">
            {type==="signup"?<div>{inputbox({label:"Name",placeholder:"john",onchange:(e)=>setpostbody({
               ...postbody,name:e.target.value
            }),text:"text"})}</div>:null}
             <div>{inputbox({label:"Email",placeholder:"john@gmail.com",onchange:(e)=>setpostbody({
               ...postbody,email:e.target.value
            }),text:"email"})}</div>
             <div>{inputbox({label:"Password",placeholder:"12345",onchange:(e)=>setpostbody({
               ...postbody,password:e.target.value
            }),text:"password"})}</div>
            <div className="text-red-600 text-center">{error.length!=0?error:null}</div>
            <button type="button" onClick={submitform} className="text-white bg-black box-border border rounded-xl border-transparent hover:bg-dark-strong focus:ring-4 focus:ring-neutral-tertiary shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none">{type}</button>
           </div>
           
        </div>
    </div>
}
 interface inputboxtype{
    label:string;
    placeholder :string;
    onchange: (e:ChangeEvent<HTMLInputElement>)=>void;
    text?: string;
 }
function inputbox({label,placeholder,onchange,text}:inputboxtype) {
    return  <div>
            <label  className="block mb-2.5 text-sm font-bold text-heading">{label}</label>
            <input type={text} onChange={onchange}  className="bg-neutral-secondary-medium  border text-heading text-sm rounded-md focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder={placeholder} required />
        </div>
 }