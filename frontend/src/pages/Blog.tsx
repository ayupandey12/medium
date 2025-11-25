import { useblog } from "../hooks/useblog"
import { Appbar } from "../components/Appbar"
import { useParams } from "react-router-dom"
import { Mainblog } from "../components/mainblog";
import { Spinner } from "../components/Spinner";

export const Blog=()=>{
    const id=useParams();
    
    const {loading,blog}=useblog({id:id.id||""})

    if (loading || !blog) {
        return <div>
            <Appbar />
        
            <div className="h-screen flex flex-col justify-center"> 
                <div className="flex justify-center">
                    <Spinner />
                </div>
            </div>
        </div>
    }
      return <div>
          <Appbar name="Ayush"/>
         <div className=" h-full flex flex-col items-center  pt-14 gap-10">
          <Mainblog blog={blog}/>
         </div>
      </div>
}