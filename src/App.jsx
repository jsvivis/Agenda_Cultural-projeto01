// BIBLIOTECAS
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// IMPORTAÇÕES
import Navbar from './components/navbar';
import FormUsuario from './components/formUsuario';


function App() {

  return (
    <>
     <div>
      <Navbar/>
     </div>

     <BrowserRouter>
     <Routes>
      <Route exact path='/usuario' element={<FormUsuario/>}/>
     </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
