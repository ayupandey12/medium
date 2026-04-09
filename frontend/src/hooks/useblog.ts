import axios from "axios";
import { useEffect, useState } from "react"
import { baseurl } from "../../config";
import { useNavigate } from "react-router-dom";

export interface Blog {
    title: string
    content: string
    image: string
    id: string
    author: {
        name: string
    }
    createdAt?: string
    updatedAt?: string
    published?: boolean
}

export const useblog = ({ id }: { id: string }) => {
    const navigate = useNavigate();
    const [loading, setloading] = useState(true);
    const [blog, setblog] = useState<Blog>();

    useEffect(() => {
        if (!id) return;
        
        const token = localStorage.getItem("token");
        const headers = token ? { Authorization: token } : {};

        axios.get(`${baseurl}/api/v1/blog/${id}`, {
            headers: headers
        }).then((response) => {
            setblog(response.data);
            setloading(false);
        }).catch(() => {
            alert(`blog is currently unavailable`)
            navigate('/blogs');
        })
    }, [id, navigate]);

    return { loading, blog };
}

export const useblogs = () => {
    const [loading, setloading] = useState(true);
    const [blogs, setblogs] = useState<Blog[]>([]);

    useEffect(() => {
        const token = localStorage.getItem("token");
        const headers = token ? { Authorization: token } : {};

        axios.get(`${baseurl}/api/v1/blog/bulk`, {
            headers: headers
        }).then((response) => {
            setblogs(response.data);
            setloading(false);
        }).catch((res) => {
            setloading(false);
        })
    }, []);

    return { loading, blogs };
}