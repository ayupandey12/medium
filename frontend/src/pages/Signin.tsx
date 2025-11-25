import { Form} from "../components/Form";
import { Bio } from "../components/Bio";
export const Signin=()=>{
    return <div className=" h-screen w-screen grid grid-cols-1 lg:grid-cols-2 "> 
          <div><Form type="signin"/></div>
          <div className="hidden lg:block"> <Bio/></div>
        </div>
}