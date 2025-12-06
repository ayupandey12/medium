import {atom, selector} from "recoil"
export const blogdata=atom<Record<string,{}>>({key:"blogdata" ,
    default:{}
})
export const blogdataselector=selector({
    key:"blogdataselector",
    get:async ({get})=>{
        const data=get(blogdata);
        
    }
})