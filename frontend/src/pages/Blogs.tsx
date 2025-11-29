import { Blogcard } from "../components/Blogcards"
import {Appbar} from "../components/Appbar"
import { useblogs } from "../hooks/useblog"
import { Skeleton } from "../components/Skeleton";
import { useContext, useEffect } from "react";
import { Auth } from "../context/context";
import { useNavigate } from "react-router-dom";

export const Blogs=()=>{
    const navigate=useNavigate();
    const login=useContext(Auth);
    useEffect(() => {
       if(login===false) navigate("/signin")
        console.log(login);
    }, [login])
    const {loading,blogs}=useblogs();
     if (loading) {
        return <div>
            <Appbar /> 
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
    }
    return <div>
        <Appbar name="Ayush"/>
       <div className=" h-full flex flex-col items-center  pt-14 gap-10">
         <div>
            {blogs.map(blog=>{
                return <Blogcard key={blog.id} id={blog.id} title={blog.title} content={blog.content} authorname={blog.author.name||"Anon"} publishedDate="2nd feb 2025"/>
            })}
         </div>
       </div>
    </div>
}
