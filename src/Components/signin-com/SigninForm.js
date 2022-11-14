import React, {useState, useEffect} from 'react'
import { Navigate ,useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import LinkLogin from '../LinkLogin'
import Button from '../SelectValue/Button'
import PasswordField from '../SelectValue/PasswordField'
import TextBox from '../SelectValue/TextBox'
import {login} from '../../Slice/auth'
import {clearMessage} from '../../Slice/message'
import Loading from '../SelectValue/Loadingdropdown';

function SigninForm() {
   const navigate = useNavigate();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { isLoggedIn, isLoading, user } = useSelector((state) => state.auth);
    const { message } = useSelector((state) => state.message);
   let status = false
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(clearMessage());
      if(status){
        navigate('/dashboard');
      }
    }, [dispatch, status, navigate]);

    const handleSubmit = (e) =>{
      e.preventDefault()
      // const response = AuthService.login(email, password)
      //   if(response.data.user){
      //     navigate('/dashboard')
      //   }
     
      dispatch(
        login({email, password}))
      .unwrap()
      .then(() =>{

        if(user.response_code === '200'){
          localStorage.setItem('status', 'true')
          navigate('/dashboard');
          
        }
        window.location.reload();
      })
      .catch(() => {
       
      });
    }
    status = (localStorage.getItem("status"))

    if (status && user) {
      return <Navigate to="/dashboard" />;
    }
  
    

  return (
    <>
    <Loading 
      open={isLoading}
    />
    <form onSubmit={handleSubmit}>
    <div className='md:pl-6 mt-8 grid md:grid-cols-6 gap-3'>
        
        <div className=' col-span-2'>
        <TextBox 
                label='Email address'
                type='email'
                value={email}
                onChange={setEmail}
               /> 
        </div>
        <div className=' col-span-2'>
       <PasswordField 
        label='Password'
        value={password}
        onChange= {setPassword}
       />
        </div>
            <div className=' flex flex-col justify-end'>
            <Button 
            name='Sign in'
           /> 
            </div>
              
    </div>
    </form>
    <LinkLogin 
        path='/resetpasswordvali'
        title='I have forgotten my password'
    />
  
    </> 
  )
}

export default SigninForm