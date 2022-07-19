import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import AuthProvider from './context/AuthContext';
import FetchProvider from './context/FetchContext';

import AuthenticatedRoute from './Routes/AuthenticatedRoute.route';
import AdminRoute from './Routes/AdminRoute.route';

const Account = lazy(() => import('./pages/Account/Account.page'))
const Home = lazy(() => import('./pages/Home/Home.page'))
const Inventory = lazy(() => import('./pages/Inventory/Inventory.page'))
const Settings = lazy(() => import('./pages/Settings/Settings.page'))
const User = lazy(() => import('./pages/User/User.page'))
const SignInSignUp = lazy(() => import('./pages/Sign In/SignIn.page'))
const Main = lazy(() => import('./pages/Main/Main.page'))
const DragAndDrop = lazy(() => import('./pages/Drag-n-Drop/DragAndDrop.page'))



const AppRoutes = () => {
  return (
    <Suspense fallback={<div>Loading....</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/inventory" element={<AdminRoute><Inventory /></AdminRoute>} />
        <Route path="/dashboard" element={<AuthenticatedRoute><Main /></AuthenticatedRoute>} />
        <Route path="/account" element={<AuthenticatedRoute><Account /></AuthenticatedRoute>} />
        <Route path="/settings" element={<AuthenticatedRoute><Settings /></AuthenticatedRoute>} />
        <Route path="/kanban" element={<AuthenticatedRoute><DragAndDrop/></AuthenticatedRoute>} />
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
      <AuthProvider>
        <FetchProvider>
          <div className="bg-gray-100">
            <AppRoutes />
          </div>
        </FetchProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;