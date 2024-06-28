// BIBLIOTECAS
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// IMPORTAÇÕES
import Navbar from './components/navbar';
import CreateUser from './components/createUser';
import UserSearch from './components/userSearch';
import Home from './components/home';


function App() {

  return (
    <>
     <div>
      <Navbar/>
     </div>

     {/* <div>
      <Home/>
     </div> */}

     <BrowserRouter>
     <Routes>
      <Route exact path='/' element={<Home/>}/>
      <Route path='/usuario' element={<CreateUser/>}/>
      <Route path='/busca' element={<UserSearch/>}/>
     </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
