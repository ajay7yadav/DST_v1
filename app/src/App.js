import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Redirects } from './language/constant';
import Signup from './Components/authentication/Signup';
import SignIn from './Components/authentication/SignIn';
import Todo from './Components/todo/Todo';
import Home from './Components/home/Home';
import ForgetPass from './Components/forgetPass/ForgetPass';
import ChangePass from './Components/forgetPass/ChangePass';
import Profile from './Components/profile/Profile_user.js'

function App() {

  return (
    <Router>
      <Routes>
        <Route path={Redirects.home} element={<Home />} />
        <Route path={Redirects.signup} element={<Signup />} />
        <Route path={Redirects.signin} element={<SignIn />} />
        <Route path={Redirects.todo} element={<Todo />} />
        <Route path={Redirects.forget} element={<ForgetPass />} />
        <Route path={Redirects.updatePass} element={<ChangePass />} />
        <Route path={Redirects.profile} element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
