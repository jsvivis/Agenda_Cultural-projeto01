import { BrowserRouter, Routes, Route } from 'react-router-dom';

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
import Home from './components/home';

function App() {
  return (
    <>
      <BrowserRouter>
        <div>
          <Navbar/>
        </div>
        <Routes>
          <Route exact path='/' element={<Home/>} />
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
      </BrowserRouter>
    </>
  )
}

export default App;



// // BIBLIOTECAS
// import React from 'react';
// import { BrowserRouter, Routes, Route, Navigate, Router } from 'react-router-dom';

// // IMPORTAÇÕES
// import { AuthProvider, useAuth } from './components/login/authContext';
// import Navbar from './components/navbar';
// import CreateUser from './components/usuario/createUser';
// import SearchUser from './components/usuario/searchUser';
// import UpdateUser from './components/usuario/updateUser';
// import CreateEspacoCultural from './components/espacoCultural/createEspacoCultural';
// import SearchEspacoCultural from './components/espacoCultural/searchEspacoCultural';
// import UpdateEspacoCultural from './components/espacoCultural/updateEspacoCultural';
// import CreateEspaco from './components/espaco/createEspaco';
// import SearchEspaco from './components/espaco/searchEspaco';
// import UpdateEspaco from './components/espaco/updateEspaco';
// import CreateCategoria from './components/categoria/createCategoria';
// import SearchCategoria from './components/categoria/searchCategoria';
// import UpdateCategoria from './components/categoria/updateCategoria';
// import CreateReacao from './components/reacao/createReacao';
// import SearchReacao from './components/reacao/searchReacao';
// import UpdateReacao from './components/reacao/updateReacao';
// import CreateEvento from './components/evento/createEvento';
// import SearchEvento from './components/evento/searchEvento';
// import UpdateEvento from './components/evento/updateEvento';
// import Home from './components/home';
// import SignIn from './components/login/signIn';
// import { Switch } from '@mui/material';



// function App() {

//   const { user } = useAuth;
//   console.log('user app' ,user)
//   return (
//     <AuthProvider>
//       <BrowserRouter>
//         <div>
//           <Navbar />
//         </div>
//         <Routes>
//           <Route exact path='/login' element={<SignIn />} />
//           <Route path='/register' element={<CreateUser />} />
//           <Route exact path='/' element={user ? <Home /> : <Navigate to="/login" />} />
//           <Route path='/criarusuario' element={user ? <CreateUser /> : <Navigate to="/login" />} />
//           <Route path='/buscarusuario' element={user ? <SearchUser /> : <Navigate to="/login" />} />
//           <Route path="/atualizarusuario/:id" element={user ? <UpdateUser /> : <Navigate to="/login" />} />
//           <Route path='/criarespacocultural' element={user ? <CreateEspacoCultural /> : <Navigate to="/login" />} />
//           <Route path='/buscarespacocultural' element={user ? <SearchEspacoCultural /> : <Navigate to="/login" />} />
//           <Route path="/atualizarespacocultural/:id" element={user ? <UpdateEspacoCultural /> : <Navigate to="/login" />} />
//           <Route path='/criarespaco' element={user ? <CreateEspaco /> : <Navigate to="/login" />} />
//           <Route path='/buscarespaco' element={user ? <SearchEspaco /> : <Navigate to="/login" />} />
//           <Route path="/atualizarespaco/:id" element={user ? <UpdateEspaco /> : <Navigate to="/login" />} />
//           <Route path='/criarcategoria' element={user ? <CreateCategoria /> : <Navigate to="/login" />} />
//           <Route path='/buscarcategoria' element={user ? <SearchCategoria /> : <Navigate to="/login" />} />
//           <Route path="/atualizarcategoria/:id" element={user ? <UpdateCategoria /> : <Navigate to="/login" />} />
//           <Route path='/criarreacao' element={user ? <CreateReacao /> : <Navigate to="/login" />} />
//           <Route path='/buscarreacao' element={user ? <SearchReacao /> : <Navigate to="/login" />} />
//           <Route path="/atualizarreacao/:id" element={user ? <UpdateReacao /> : <Navigate to="/login" />} />
//           <Route path='/criarevento' element={user ? <CreateEvento /> : <Navigate to="/login" />} />
//           <Route path='/buscarevento' element={user ? <SearchEvento /> : <Navigate to="/login" />} />
//           <Route path="/atualizarevento/:id" element={user ? <UpdateEvento /> : <Navigate to="/login" />} />
//         </Routes>
//       </BrowserRouter>
//     </AuthProvider>
//   );
// }

// export default App;
