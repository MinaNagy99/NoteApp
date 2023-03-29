import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Register from './Component/Register/Register.jsx';
import Home from './Component/Home/Home.jsx';
import Layout from './Component/Latout/Layout.jsx';
import NotFound from './Component/NotFound/NotFound.jsx';
import Login from './Component/Login/Login.jsx';
import ProtectedRoute from './Component/protectedRoute/ProtectedRoute.jsx';




function App() {
  let routers = createBrowserRouter([
    {path:'/' , element:<Layout/> , children : [
      
      {index:true, element: <ProtectedRoute><Home/></ProtectedRoute>},
      {path : 'register' , element:<Register/>},
      {path : 'login' , element:<Login/>},

      {path : '*' , element:<NotFound/>},


    ]}
  ])
  return <RouterProvider router={routers}/>;
}

export default App;
