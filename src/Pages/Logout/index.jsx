import React, {useEffect} from 'react'
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
  return (
    <div>Logout</div>
  )
}

export default Logout