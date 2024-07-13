import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// IMPORTAÇÕES
import Navbar from './components/navbar';
import CreateUser from './components/usuario/createUser';
import SearchUser from './components/usuario/searchUser';
import UpdateUser from './components/usuario/updateUser';
import CreateEspacoCultural from './components/espacoCultural/createEspacoCultural';
import SearchEspacoCultural from './components/espacoCultural/searchEspacoCultural';
import UpdateEspacoCultural from './components/espacoCultural/updateEspacoCultural';
import CreateEspaco from './components/espaco/createEspaco';
import SearchEspaco from './components/espaco/searchEspaco';
import UpdateEspaco from './components/espaco/updateEspaco';
import CreateCategoria from './components/categoria/createCategoria';
import SearchCategoria from './components/categoria/searchCategoria';
import UpdateCategoria from './components/categoria/updateCategoria';
import CreateReacao from './components/reacao/createReacao';
import SearchReacao from './components/reacao/searchReacao';
import UpdateReacao from './components/reacao/updateReacao';
import CreateEvento from './components/evento/createEvento';
import SearchEvento from './components/evento/searchEvento';
import UpdateEvento from './components/evento/updateEvento';
import Home from "./components/home";
import Manager from './components/manager';

function App() {
  return (
    <>
      <Router>
        <Navbar />

          <Routes>
            <Route exact path='/' element={<Home/>} />
            <Route path="/manager" element={<Manager />} />
            <Route path='/criarusuario' element={<CreateUser/>} />
            <Route path='/buscarusuario' element={<SearchUser/>} />
            <Route path="/atualizarusuario/:id" element={<UpdateUser/>} />
            <Route path='/criarespacocultural' element={<CreateEspacoCultural/>} />
            <Route path='/buscarespacocultural' element={<SearchEspacoCultural/>} />
            <Route path="/atualizarespacocultural/:id" element={<UpdateEspacoCultural/>} />
            <Route path='/criarespaco' element={<CreateEspaco/>} />
            <Route path='/buscarespaco' element={<SearchEspaco/>} />
            <Route path="/atualizarespaco/:id" element={<UpdateEspaco/>} />
            <Route path='/criarcategoria' element={<CreateCategoria/>} />
            <Route path='/buscarcategoria' element={<SearchCategoria/>} />
            <Route path="/atualizarcategoria/:id" element={<UpdateCategoria/>} />
            <Route path='/criarreacao' element={<CreateReacao/>} />
            <Route path='/buscarreacao' element={<SearchReacao/>} />
            <Route path="/atualizarreacao/:id" element={<UpdateReacao/>} />
            <Route path='/criarevento' element={<CreateEvento/>} />
            <Route path='/buscarevento' element={<SearchEvento/>} />
            <Route path="/atualizarevento/:id" element={<UpdateEvento/>} />
        </Routes>
      </Router>
    </>
  )
}

export default App;
