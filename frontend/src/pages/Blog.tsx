import { useblog, type Blog } from "../hooks/useblog"
import { Appbar } from "../components/Appbar"
import { useNavigate, useParams } from "react-router-dom"
import { Mainblog } from "../components/mainblog";
import { useContext ,useEffect} from "react";
import { Auth } from "../context/context";
import { Skeleton } from "../components/Skeleton";
import {   useRecoilValueLoadable, useSetRecoilState } from "recoil";
import { blogByIdSelector, blogdata } from "../context/atom";

export const Blogbyid=()=>{
    const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { loggedin } = useContext(Auth);
    const blogLoadable = useRecoilValueLoadable(
    blogByIdSelector(id??"")
  );

  const setBlogData = useSetRecoilState(blogdata);

    useEffect(() => {
      if(loggedin===null) return ;
      if(loggedin===false) navigate("/signin");
    }, [loggedin])
    
     useEffect(() => {
    if (blogLoadable.state === "hasValue") {
      setBlogData(prev => ({
        ...prev,
        [id!]: blogLoadable.contents,
      }));
    }
  }, [ id]);
    
    // const {loading,blog}=useblog({id:id.id||""})
    
   

    if (loggedin===null|| blogLoadable.state==="loading") {
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
    navigate('/blogs')
  }

  const blog = blogLoadable.contents;
  

      return <div>
          <Appbar name="Ayush"/>
         <div className=" h-full flex flex-col items-center  pt-14 gap-10">
          <Mainblog blog={blog}/>
         </div>
      </div>
}