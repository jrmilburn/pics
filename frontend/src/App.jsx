import { useState } from 'react';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';

import { AuthProvider } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import IndexPage from './pages/IndexPage';
import MessagePage from './pages/MessagePage';
import ProfilePage from './pages/ProfilePage';
import CreatePage from './pages/CreatePage';
import PrivateRoute from './context/PrivateRoute';
import NavBar from './components/NavBar/NavBar';

function App() {

  const [messagePage, setMessagePage] = useState(false);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/register" element={<RegisterPage />} />
        <Route index path="/login" element={<LoginPage />} />
        <Route element={<PrivateRoute />} >
          <Route path='/' element={<NavBar messagePage={messagePage} setMessagePage={setMessagePage} />}>
            <Route index element={<IndexPage />} />
            <Route path='/message' element={<MessagePage />} />
            <Route path='/profile' element={<ProfilePage />} />
            <Route path='/create' element={<CreatePage />} />
          </Route>
        </Route>

      </>
    )
  );

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  )
}

export default App
