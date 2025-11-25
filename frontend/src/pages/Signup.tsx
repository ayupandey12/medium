import { Bio } from "../components/Bio"
import { Form } from "../components/Form"

export const Signup=()=>{
    return <div className=" h-screen w-screen grid grid-cols-1 lg:grid-cols-2 "> 
      <div><Form type="signup"/></div>
      <div className="hidden lg:block"> <Bio/></div>
    </div>
}