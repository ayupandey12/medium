import { useblog } from "../hooks/useblog"
import { Appbar } from "../components/Appbar"
import { useNavigate, useParams } from "react-router-dom"
import { Mainblog } from "../components/mainblog";
import { useContext ,useEffect} from "react";
import { Auth } from "../context/context";
import { Skeleton } from "../components/Skeleton";
import {  useRecoilValueLoadable } from "recoil";
import { blogByIdSelector } from "../context/atom";

export const Blog=()=>{
    const navigate=useNavigate();
    const {loggedin}=useContext(Auth);
    useEffect(() => {
      if(loggedin===null) return ;
      if(loggedin===false) navigate("/signin");
    }, [loggedin])
    
    const id=useParams<{id:string}>();
    
    // const {loading,blog}=useblog({id:id.id||""})
   const blogLoadable = useRecoilValueLoadable(
    blogByIdSelector(id.id!||"")
  );

    if ( blogLoadable.state==="loading"||loggedin===null) {
        return <div>
            <Appbar />
                  <div className="flex flex-col items-center">
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                  </div>
        </div>
    }
     if (blogLoadable.state === "hasError") {
    return <div>Error loading blog</div>;
  }

  const blog = blogLoadable.contents;

      return <div>
          <Appbar name="Ayush"/>
         <div className=" h-full flex flex-col items-center  pt-14 gap-10">
          <Mainblog blog={blog}/>
         </div>
      </div>
}