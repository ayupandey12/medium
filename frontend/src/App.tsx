import './App.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import { Signup } from './pages/Signup'
import { Signin } from './pages/Signin'
import { Blogbyid } from './pages/Blog'
import { Blogs } from './pages/Blogs'
import { Publish } from './pages/Publish'
import { Home } from './pages/Home'
import { useLogged } from './hooks/uselogged'
import { Auth } from './context/context'
import { Pagenotfound } from './pages/Pagenotfound'
function App() {
const {loggedin,setLoggedin}=  useLogged();
  return (
    <Auth.Provider value={{loggedin:loggedin,setloggedin:setLoggedin}}>
     <BrowserRouter>
    <Routes>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/signin' element={<Signin/>}/>
      <Route path='/blog/:id' element={<Blogbyid/>}/>
      <Route path='/blogs' element={<Blogs/>}/>
      <Route path='/publish' element={<Publish/>}/>
      <Route path='/' element={<Home/>}/>
      <Route path='*' element={<Pagenotfound/>}/>
    </Routes>
    </BrowserRouter>
    </Auth.Provider>
     
  )
}

export default App
