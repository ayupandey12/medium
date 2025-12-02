import axios from "axios";
import { useEffect, useState } from "react"
import { baseurl } from "../../config";
import { useNavigate } from "react-router-dom";
export interface Blog{
    title:string
    content:string
    id:string
    author:{
        name:string
    }
}
export const useblog=({id}:{id:string})=>{
  const navigate=useNavigate();
    const [loading,setloading]=useState(true);
    const [blog,setblog]=useState<Blog>();
    useEffect(() => {
      axios.get(`${baseurl}/api/v1/blog/${id}`,{
        headers:{
            Authorization:localStorage.getItem("token")
        }
      }).then((response)=>{
        setblog(response.data);
        setloading(false);
      }).catch(()=>{
        alert(`blog is currently unavailable`) //work on it 
        navigate('/blogs');
      })
    }, [id]);
    
    return {loading,blog};
}
export const useblogs=()=>{
    const [loading,setloading]=useState(true);
    const [blogs,setblogs]=useState<Blog[]>([]);
    useEffect(() => {
      axios.get(`${baseurl}/api/v1/blog/bulk`,{
        headers:{
            Authorization:localStorage.getItem("token")
        }
      }).then((response)=>{
        setblogs(response.data);
        setloading(false);
      }).catch((res)=>{
        setloading(false);
      })
    }, []);
    
    return {loading,blogs};
    
}