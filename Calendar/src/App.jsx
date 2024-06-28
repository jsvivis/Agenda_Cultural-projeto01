import { BrowserRouter, Routes, Route } from 'react-router-dom';

// IMPORTAÇÕES
import Navbar from './components/navbar';
import CreateUser from './components/createUser';
import UserSearch from './components/userSearch';
import UpdateUser from './components/updateUser';
import Home from './components/home';

function App() {
  return (
    <>
      <div>
        <Navbar/>
      </div>

      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Home/>} />
          <Route path='/usuario' element={<CreateUser/>} />
          <Route path='/busca' element={<UserSearch/>} />
          <Route path="/update-user/:id" element={<UpdateUser/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
