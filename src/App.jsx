
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'

import { AuthProvider } from './Services/AuthContext';

import Todos from './Components/Todos';
import Header from './Components/Header';
import Login from './Components/Login';
import Signup from './Components/Signup';
import About from './Components/About';
import Home from './Components/Home';

function App() {

  return (
    <>
      <BrowserRouter>
        <AuthProvider>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/home' element={<Home />} />
          <Route path='/todos' element={<Todos />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signin' element={<Signup />} />
          <Route path='/about' element={<About />} />
        </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  )
}

export default App
