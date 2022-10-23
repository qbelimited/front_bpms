import {BrowserRouter, Route,  Routes} from 'react-router-dom';
import ResetPassword from './ResetPassword/ResetPassword';
import ResetPasswordValidation from './ResetPassword/ResetPasswordValidation';
import Signin from './Signin/Signin';


function App() {
  return (
    <div>
     <BrowserRouter>
      <Routes >
        <Route path='/' element={<Signin />} />
        <Route path='/resetpassword' element={<ResetPasswordValidation />}/>
        <Route path='/resetpasswordvali' element={<ResetPassword />}/>
      </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
