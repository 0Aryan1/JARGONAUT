import {useSelector} from 'react-redux'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Protected ({children, authentication = true}){
    const authStatus = useSelector((state) => state.auth.status)
    const authChecked = useSelector((state) => state.auth.checked)
    const navigate = useNavigate()

    const [loader,setLoader] = useState(true)

    useEffect(() => {
    if(!authChecked) return
    if(authentication && authStatus !== authentication){
      navigate('/login')
    }else if(!authentication && authStatus !== authentication){
      navigate('/')
    }
    setLoader(false)
  }, [authStatus,authChecked,authentication,navigate])
  return (
    <>
      {loader ? <div>Loading...</div> : children}
    </>
  )
}

export default Protected;