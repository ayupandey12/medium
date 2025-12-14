import {atom, selectorFamily} from "recoil"
import type { Blog } from "../hooks/useblog";
import axios from "axios";
import { baseurl } from "../../config";
export const blogdata=atom<Record<string,Blog>>({
    key:"blogdata" ,
    default:{}
})
export const blogByIdSelector = selectorFamily<Blog, string>({
  key: "blogByIdSelector",
  get: (id) => async ({get}) => {
    const data=get(blogdata);
    if(data[id]) return data[id];
    const res = await axios.get(`${baseurl}/api/v1/blog/${id}`, {
      headers: {
        Authorization: localStorage.getItem("token") || "",
      },
    });

    return res.data;
  },
});