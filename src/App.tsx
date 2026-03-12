// import { useState } from "react"
// import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
// import ProtectedRoute from "./components/ProtectedRouter/ProtectedRouter"


// //Paginas de Ejemplo
// const Home = () => <h1 className="text-xl">Pagina Publica Home</h1>
// const Admin = () => <h1 className="text-xl text-indigo-600 font-bold">Zona VIP: Panel de Administracion</h1>
// const Login = () => <h1 className="text-xl text-red-500">Desdes Iniciar Sesion</h1>

// function App() {
//   const [user, setUser] = useState<{id:number; name: string} | null >(null)
//   const login = () => setUser({id:1, name: "Alberto"})
//   const logout = () => setUser(null)
//   return (
//     <BrowserRouter>
//     <nav className="p-4 bg-slate-800 text-white flex justify-between">
      
//       <div className="flex gap-4">
//         <Link to="/">Inicio</Link>
//         <Link to="/admin">Admin (VIP)</Link>
//       </div>

//     <button className={`px-3 py-1 rounded ${user ? 'bg-red-500': 'bg-green-500'}`} onClick={user ? logout : login}>
//       {user ? 'Cerrar Sesion': 'Simular Login'}
//     </button>
//     </nav>
//     <div className="p-10">
//     <Routes>
//       <Route path="/" element={<Home />}/>
//       <Route path="/login" element={<Login />}/>
//       {/* Ruta protegida- Envolvemos el componente admin con nuestro Guardaespalda */}
//       <Route path="/admin" element={
//         <ProtectedRoute isAllowed={!!user}>
//           <Admin />
//         </ProtectedRoute>
//       } />
//     </Routes>
//     </div>
//     </BrowserRouter>
//   )
// }

// export default App


// import { useState } from "react"
// import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
// import ProtectedRoute from "./components/ProtectedRouter/ProtectedRouter2"


// //Paginas de Ejemplo
// const Home = () => <h1 className="text-xl">Pagina Publica Home</h1>
// const Admin = () => <h1 className="text-xl text-indigo-600 font-bold">Zona VIP: Panel de Administracion</h1>
// const Login = () => <h1 className="text-xl text-red-500">Desdes Iniciar Sesion</h1>
// const Denegado = () => <h1 className="text-xl text-red-500">Acceso Denegado</h1>

// // Paginas Protegidas
// const Perfil = () => <h1 className="text-xl text-green-500">Mi Perfil de Usuario</h1>
// const DashboardAdmin = () => <h1 className="text-xl text-green-500">Dashboard de Administracion (Solo para Admins)</h1>

// function App() {
//   const [user, setUser] = useState<{id: number, name: string, role: 'admin' | 'user'} | null>(null)

//   // Funciones Simuladoras
//   const loginAdmin = () => setUser({id: 1, name: "Ana", role: "admin"});
//   const loginUser = () => setUser({id: 2, name: "Alberto", role: "user"});
//   const logout = () => setUser(null)
  
//   return (
//     <BrowserRouter>
//     <nav className="p-4 bg-slate-800 text-white flex justify-between">
      
//       <div className="flex gap-4">
//         <Link to="/">Inicio</Link>
//         <Link to="/perfil">Mi perfil</Link>
//         <Link to="/admin">Admin (VIP)</Link>
//       </div>
//     {/* Panel de Control */}
//     <div className="flex gap-2 items-center">
//       <span className="mr-4 text-sm text-gray-300">
//         {user ? `Hola, ${user.name} (${user.role})`: 'Desconectado'}
//       </span>
//       <button onClick={loginUser} className="px-3 py-1 bg-green-600 rounded text-sm">Entrar como user</button>
//       <button onClick={loginAdmin} className="px-3 py-1 bg-purple-600 rounded text-sm">Admin</button>
//       <button onClick={logout} className="px-3 py-1">Salir</button>

//     </div>
    
//     </nav>
//     <div className="p-10">
//     <Routes>
//       <Route path="/" element={<Home />}/>
//       <Route path="/login" element={<Login />}/>
//       <Route path="/denegado" element={<Denegado />}/>
//       {/* Rutas protegidas */}
//       <Route path="/perfil" element={<ProtectedRoute user={user}>
//         <Perfil></Perfil>
//       </ProtectedRoute>}>
//       </Route>
//       <Route path="/admin" element={<ProtectedRoute user={user} requiredRole="admin">
//         <DashboardAdmin></DashboardAdmin>
//       </ProtectedRoute>} />
      
//     </Routes>
//     </div>
//     </BrowserRouter>
//   )
// }

// export default App

import { useState } from "react"
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom"

import ProtectedRoute from "./components/ProtectedRouter/ProtectedRouter2"

import Home from "./pages/Home"
import Login from "./pages/Login"
import Denegado from "./pages/Denegado"
import Perfil from "./pages/Perfil"
import DashboardAdmin from "./pages/DashboardAdmin"

// Definimos como es nuestro usuario
interface User {
  id: number
  name: string
  role: 'admin' | 'user'
}

function App() {

  const [user, setUser] = useState<User | null>(null)

  // Handlers de autenticacion
  const handleLoginAdmin = () => {
    setUser({ id: 1, name: "Ana", role: "admin" })
  }

  const handleLoginUser = () => {
    setUser({ id: 2, name: "Alberto", role: "user" })
  }

  const handleLogout = () => {
    setUser(null)
  }

  return (

    <BrowserRouter>

      {/* NAVBAR */}

      <nav className="p-4 bg-slate-800 text-white flex justify-between items-center">

        <div className="flex gap-6 font-medium">

          <NavLink 
            to="/" 
            className={({isActive}) => isActive ? "text-yellow-400" : "hover:text-gray-300"}
          >
            Inicio
          </NavLink>

          <NavLink 
            to="/perfil"
            className={({isActive}) => isActive ? "text-yellow-400" : "hover:text-gray-300"}
          >
            Mi perfil
          </NavLink>

          <NavLink 
            to="/admin"
            className={({isActive}) => isActive ? "text-yellow-400" : "hover:text-gray-300"}
          >
            Admin
          </NavLink>

        </div>

        {/* PANEL CONTROL USUARIO */}

        <div className="flex gap-3 items-center">

          <span className="text-sm text-gray-300">
            {user ? `Hola, ${user.name} (${user.role})` : "Desconectado"}
          </span>

          <button
            onClick={handleLoginUser}
            className="px-3 py-1 bg-green-600 rounded text-sm hover:bg-green-700"
          >
            Entrar user
          </button>

          <button
            onClick={handleLoginAdmin}
            className="px-3 py-1 bg-purple-600 rounded text-sm hover:bg-purple-700"
          >
            Admin
          </button>

          <button
            onClick={handleLogout}
            className="px-3 py-1 bg-gray-600 rounded text-sm hover:bg-gray-700"
          >
            Salir
          </button>

        </div>

      </nav>

      {/* CONTENIDO */}

      <div className="p-10">

        <Routes>

          <Route path="/" element={<Home />} />

          <Route path="/login" element={<Login />} />

          <Route path="/denegado" element={<Denegado />} />

          {/* RUTAS PROTEGIDAS */}

          <Route
            path="/perfil"
            element={
              <ProtectedRoute user={user}>
                <Perfil />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin"
            element={
              <ProtectedRoute user={user} requiredRole="admin">
                <DashboardAdmin />
              </ProtectedRoute>
            }
          />

        </Routes>

      </div>

    </BrowserRouter>

  )
}

export default App