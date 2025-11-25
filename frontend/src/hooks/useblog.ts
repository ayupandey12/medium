import axios from "axios";
import { useEffect, useState } from "react"
import { baseurl } from "../assets/config";
export interface Blog{
    title:string
    content:string
    id:string
    author:{
        name:string
    }
}
export const useblog=({id}:{id:string})=>{
    const [loading,setloading]=useState(true);
    const [blog,setblog]=useState<Blog>();
    useEffect(() => {
      axios.get(`${baseurl}/api/v1/blog/${id}`,{
        headers:{
            Authorization:localStorage.getItem("token")
        }
      }).then((response)=>{
        console.log(response.data);
        setblog(response.data);
        setloading(false);
      }).catch(()=>{
        alert(`blog is not there!`) //work on it 
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
        console.log(response.data);
        setblogs(response.data);
        setloading(false);
      }).catch(()=>{
        alert(`blogs are not there!`) //work on it 
      })
    }, []);
    
    return {loading,blogs};
    
}