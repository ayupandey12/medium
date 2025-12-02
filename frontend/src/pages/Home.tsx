// import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"
import { motion } from "framer-motion";
import { useContext } from "react";
import { Auth } from "../context/context";

export  const   Home=  ()=>{
    const {loggedin}=useContext(Auth)
    const navigate=  useNavigate();
     if (loggedin === null) return null;
    return (
<div className="w-full min-h-screen bg-[#faf7f2] text-black overflow-hidden">
{/* Header */}
<header className="flex justify-between items-center py-6 px-10 text-lg font-serif">
<div className="text-3xl font-bold">YourBlog</div>
<nav className="flex gap-8 text-base">
<Link to={"/blogs"} className="hover:opacity-60">Our story</Link>
<Link to={"/publish"}  className="hover:opacity-60">Write</Link>
 {!loggedin && <Link to={"/signin"} className="hover:opacity-60">Sign in</Link>}
</nav>
<button onClick={()=>{navigate('/signup')}} className="bg-black text-white px-5 py-2 rounded-full">Get started</button>
</header>


{/* Yellow Banner */}
<div className="w-full bg-[#ffd900] text-center py-3 text-lg font-medium">
Our best price of the year. <span className="underline">Get 20% off new memberships</span> for a limited time.
</div>


{/* Hero Section */}
<div className="px-10 pt-24 flex flex-col lg:flex-row justify-between items-start gap-10">
<motion.div
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.8 }}
className="max-w-2xl"
>
<h1 className="text-[5rem] leading-20 font-serif font-bold">Human<br />stories & ideas</h1>
<p className="mt-6 text-2xl max-w-xl text-gray-700">
A place to read, write, and deepen your understanding
</p>
<button onClick={()=>{navigate('/signup')}} className="mt-10 bg-black text-white px-8 py-3 rounded-full text-xl font-medium">
Start reading
</button>
</motion.div>


{/* Right-side Decorative Graphic */}
<motion.div
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
transition={{ duration: 1 }}
className="hidden lg:block"
>
<div className="w-[450px] h-[450px] bg-green-500 rounded-full opacity-90" />
</motion.div>
</div>
</div>
);
}