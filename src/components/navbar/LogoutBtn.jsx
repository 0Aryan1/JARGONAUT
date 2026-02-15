import React from 'react'
import {useDispatch} from 'react-redux'
import authService from '../../appwrite/auth.js'
import {logout} from '../../store/authSlice'   

function LogoutBtn() {
    const dispatch = useDispatch()

    const logoutHandler = () => {
        authService.logout().then(() => {
            dispatch(logout())
        })
    }

  return (
   <button
   className='nav-link relative px-6 py-2 text-white/90 hover:text-white transition-all duration-200 hover:scale-105 group'
   onClick={logoutHandler}
   >
    Logout
    <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 rounded-full transition-all duration-200"></div>
   </button>
  )
}

export default LogoutBtn