import { Blogcard } from "../components/Blogcards"
import {Appbar} from "../components/Appbar"
import { useblogs } from "../hooks/useblog"
import { Skeleton } from "../components/Skeleton";

export const Blogs=()=>{
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
