import { useContext, useEffect, useState, type ChangeEvent } from "react"
import type {Blogposttype} from "ayushdevinfermedium1-common"
import { useNavigate } from "react-router-dom"
import { Appbar } from "../components/Appbar"
import axios from "axios"
import { baseurl } from "../../config"
import { Auth } from "../context/context"
import { Skeleton } from "../components/Skeleton"

export const Publish=()=>{
    const {loggedin}=useContext(Auth)
    useEffect(() => {
      if(loggedin===null) return;
      if(loggedin===false) navigate("/signin");
    }, [loggedin])
    const [publish,setpublish]=useState<Blogposttype>({
        title:"",
        content:""
    })
    const navigate=useNavigate();
     if(loggedin===null) return  <div>
                 <div  className="flex justify-center">
                     <div>
                         <Skeleton />
                         <Skeleton />
                         <Skeleton />
                         <Skeleton />
                         <Skeleton />
                     </div>
                 </div>
             </div>
     return <div>
        <Appbar />
        <div className="flex justify-center w-full pt-8"> 
            <div className="max-w-5xl w-full">
                <input onChange={(e) => 
                    setpublish({...publish,title:e.target.value})
                } type="text" className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Title" required/>

                <TextEditor onChange={(e) => {
                    setpublish({...publish,content:e.target.value})
                }} />
                <button onClick={async () => {
                   try {
                     const response = await axios.post(`${baseurl}/api/v1/blog`,publish, {
                        headers: {
                            Authorization: localStorage.getItem("token")
                        }
                    });
                    navigate(`/blog/${response.data.id}`)
                   } catch (error) {
                    navigate("/blogs");
                   }
                }} type="submit" className="mt-4 inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
                    Publish post
                </button>
            </div>
        </div>
    </div>
}


function TextEditor({ onChange }: {onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void}) {
    return <div className="mt-2">
        <div className="w-full mb-4 ">
            <div className="flex items-center justify-between border">
            <div className="my-2 bg-white rounded-b-lg w-full">
                <label className="sr-only">Publish post</label>
                <textarea onChange={onChange} id="editor" rows={8} className="focus:outline-none block w-full px-0 text-sm text-gray-800 bg-white border-0 pl-2" placeholder="Write an article..." required />
            </div>
        </div>
       </div>
    </div>
    
}