import React from 'react'
import {useDispatch} from 'react-redux'
import authService from '../../appwrite/auth.js'
import {logout} from '../../store/authSlice'   

function LogoutBtn({ useDarkMode = false }) {
    const dispatch = useDispatch()

    const logoutHandler = () => {
        authService.logout().then(() => {
            dispatch(logout())
        })
    }

    const textClass = useDarkMode ? 'text-gray-800' : 'text-white/90';
    const textHoverClass = useDarkMode ? 'hover:text-gray-900' : 'hover:text-white';
    const hoverBgClass = useDarkMode ? 'group-hover:bg-gray-100' : 'group-hover:bg-white/10';

  return (
   <button
   className={`nav-link relative px-6 py-2 ${textClass} ${textHoverClass} transition-all duration-200 hover:scale-105 group`}
   onClick={logoutHandler}
   >
    Logout
    <div className={`absolute inset-0 bg-white/0 ${hoverBgClass} rounded-full transition-all duration-200`}></div>
   </button>
  )
}

export default LogoutBtn