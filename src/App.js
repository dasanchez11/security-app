import React, { lazy, Suspense, useContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import AuthProvider, { AuthContext } from './context/AuthContext';
import FetchProvider from './context/FetchContext';

import AuthenticatedRoute from './Routes/AuthenticatedRoute.route';
import AdminRoute from './Routes/AdminRoute.route';
import Logo from './components/Logo/Logo.component';

const Account = lazy(() => import('./pages/Account/Account.page'))
const Home = lazy(() => import('./pages/Home/Home.page'))
const Inventory = lazy(() => import('./pages/Inventory/Inventory.page'))
const Settings = lazy(() => import('./pages/Settings/Settings.page'))
const User = lazy(() => import('./pages/User/User.page'))
const SignInSignUp = lazy(() => import('./pages/Sign In/SignIn.page'))
const Main = lazy(() => import('./pages/Main/Main.page'))
const DragAndDrop = lazy(() => import('./pages/Drag-n-Drop/DragAndDrop.page'))

const LoadingLogo = () =>{
  return (
    <div className='self-center text-9xl '>
      <Logo/>
    </div>
  )
}


const AppRoutes = () => {
  const {authState} = useContext(AuthContext)
  if(!authState.userInfo){
    return <div className='h-screen flex justify-center'>
      <LoadingLogo/>
    </div>
  }

  return (
    <Suspense fallback={<div>Loading....</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/inventory" element={<AdminRoute><Inventory /></AdminRoute>} />
        <Route path="/dashboard" element={<AuthenticatedRoute><Main /></AuthenticatedRoute>} />
        <Route path="/account" element={<AuthenticatedRoute><Account /></AuthenticatedRoute>} />
        <Route path="/settings" element={<AuthenticatedRoute><Settings /></AuthenticatedRoute>} />
        <Route path="/kanban" element={<AuthenticatedRoute><DragAndDrop /></AuthenticatedRoute>} />
        <Route path="/users" element={<AdminRoute><User /></AdminRoute>} />
        <Route path='/signin' element={<SignInSignUp />} />
        <Route path='/signup' element={<SignInSignUp />} />
        <Route path='*' element={<Home />} />
      </Routes>
    </Suspense>
  );
};

function App() {
  return (
    <Router>
      <FetchProvider>
        <AuthProvider>
          <div className="bg-gray-100">
            <AppRoutes />
          </div>
        </AuthProvider>
      </FetchProvider>
    </Router>
  );
}

export default App;