import { Link } from "react-router-dom"

interface blogcardtype{
    title:string
    content:string
    authorname:string
    publishedDate:string
    id:string
}
export const Blogcard=({title,content,authorname,publishedDate,id}:blogcardtype)=>{
     // onclicking the card you will go to that cards page
      return <Link to={`/blog/${id}`}> 
        <div className="p-4 border-b border-slate-200 pb-6 w-screen max-w-3xl cursor-pointer ">
       <div>
             <div className="flex">
                <Avatar name={authorname} />
                <div className="font-normal pl-2 text-sm flex justify-center flex-col">{authorname}</div>
                <div className="flex justify-center flex-col pl-2 ">
                    <Circle />
                </div>
                <div className="pl-2 font-normal text-slate-500 text-sm flex justify-center flex-col">
                    {publishedDate}
                </div>
            </div>
            <div className="text-xl font-bold pt-2">
                {title}
            </div>
            <div className="text-md font-med ">
               {content.length>100?content.slice(0, 100) + "...":content}
            </div>
            <div className="text-slate-500 text-xs font-medium pt-6">
                {`${Math.ceil(content.length / 100)} minute(s) read`}
            </div>
       </div>
        </div>
      </Link>
}
export function Circle() {
    return <div className="h-1 w-1 rounded-full bg-slate-400">

    </div>
}

export function Avatar({ name, size = "small" }: { name: string, size?: "small" | "big" }) {
    return <div className={`relative inline-flex items-center justify-center overflow-hidden bg-gray-600 rounded-full ${size === "small" ? "w-6 h-6" : "w-10 h-10"}`}>
    <span className={`${size === "small" ? "text-xs" : "text-md"} font-extralight text-gray-600 dark:text-gray-300`}>
        {name[0]}
    </span>
</div>
}