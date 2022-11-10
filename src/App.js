import {BrowserRouter, Route,  Routes} from 'react-router-dom';
import PageNotFound from './Pages/404/PageNotFound';
import MiniDrawer from './Pages/Dashboard/Dashboard';
import Dashboard from './Pages/Dashboard';
import ResetPassword from './Pages/ResetPassword/ResetPassword';
import ResetPasswordValidation from './Pages/ResetPassword/ResetPasswordValidation';
import Signin from './Pages/Signin/Signin';


function App() {
  return (
    <div>
     <BrowserRouter>
      <Routes >
        <Route path='/' element={<Signin />} />
        <Route path='/resetpassword' element={<ResetPasswordValidation />}/>
        <Route path='/resetpasswordvali' element={<ResetPassword />}/>
        <Route path='*' element={<Dashboard />} />
        {/* <Route path='*' element={<PageNotFound />} /> */}
      </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
