import { useNavigate } from "react-router-dom";
import { Bio } from "../components/Bio"
import { Form } from "../components/Form"
import { useContext, useEffect } from "react";
import { Auth } from "../context/context";

export const Signup=()=>{
  const navigate=useNavigate();
  const {loggedin} =useContext(Auth);
  useEffect(() => {
    if(loggedin===null) return ;
    if(loggedin===true) navigate("/");
  }, [loggedin])
  if(loggedin===null) return ;
    return <div className=" h-screen w-screen grid grid-cols-1 lg:grid-cols-2 "> 
      <div><Form type="signup"/></div>
      <div className="hidden lg:block"> <Bio/></div>
    </div>
}