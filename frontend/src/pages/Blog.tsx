import { useblog } from "../hooks/useblog"
import { Appbar } from "../components/Appbar"
import { useNavigate, useParams } from "react-router-dom"
import { Mainblog } from "../components/mainblog";
import { Spinner } from "../components/Spinner";
import { useContext ,useEffect} from "react";
import { Auth } from "../context/context";

export const Blog=()=>{
    const navigate=useNavigate();
    const {loggedin}=useContext(Auth);
    useEffect(() => {
      if(loggedin===null) return ;
      if(loggedin===false) navigate("/signin");
    }, [loggedin])
    
    const id=useParams();
    
    const {loading,blog}=useblog({id:id.id||""})

    if (loading || !blog||loggedin===null) {
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