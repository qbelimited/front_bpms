import React, {useEffect} from 'react'
import { Navigate  } from 'react-router-dom'
import {useDispatch, useSelector}  from "react-redux";
import {logout} from '../../Slice/auth'
function Logout() {
    const dispatch = useDispatch()
    const {user} = useSelector((state) => state.auth);
    useEffect(()=>{
        localStorage.removeItem('status');
    dispatch(logout());
   
        if(user === null){
            window.location.href = '/'
        }
    }, [dispatch, user])
    if ( !user) {
      return <Navigate to="/" />;
    }
  return (
    <div>Logout</div>
  )
}

export default Logout