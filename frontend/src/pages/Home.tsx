// import { useEffect } from "react";
import { useNavigate } from "react-router-dom"
import { useLogged } from "../hooks/uselogged";
import { useEffect } from "react";
import { Spinner } from "../components/Spinner";

export  const   Home=  ()=>{
    const {loggedin}=  useLogged();
    const navigate=  useNavigate();
  useEffect(() => {
    if(loggedin===null) return  ;
     if (loggedin) {
      navigate("/blogs");
    } else {
      navigate("/signin");
    }
  }, [loggedin]);
   
    
    return<><Spinner/></>;
}