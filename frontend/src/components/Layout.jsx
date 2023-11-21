import { Outlet } from "react-router-dom"
import SideBar from "./sidebar"
import {Toaster} from 'react-hot-toast'
import NavBar from "./navbar"

const Layout = () => {
    return(
        <>
            <Toaster/>

            <div className='flex'>
                <SideBar/>
            <div className='column'>
                <NavBar/>

            <div className="content">
                <Outlet/>
            </div>
        </div>
        </div>

        </>
    )
}

export default Layout