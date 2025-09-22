
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {HashRouter as Router} from 'react-router-dom';

import './App.css'

import { AuthProvider } from './Services/AuthContext';
import { Suspense, lazy } from 'react';

const Todos = lazy( () => import ('./Components/Todos'));
const Login= lazy(() => import('./Components/Login'));
const Signup= lazy(() => import('./Components/Signup'));
const About= lazy(() => import('./Components/About'));
const Home= lazy(() => import('./Components/Home'));

import Header from './Components/Header';
import Loader from './Components/Loader';

function App() {

  return (
    <>
      <Router>
        <AuthProvider>
        <Header />
        <Suspense fallback={<Loader/>}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/home' element={<Home />} />
          <Route path='/todos' element={<Todos />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signin' element={<Signup />} />
          <Route path='/about' element={<About />} />

        </Routes>
        </Suspense>
        </AuthProvider>
      </Router>
    </>
  )
}

export default App
