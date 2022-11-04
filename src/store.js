import { configureStore } from '@reduxjs/toolkit'
import messageReducer from './Slice/message'
import loginReducer from './Slice/auth'

const reducer = {
    auth: loginReducer,
    message: messageReducer
  }
  
  const store = configureStore({
    reducer: reducer,
    devTools: true,
  })
  
  export default store;