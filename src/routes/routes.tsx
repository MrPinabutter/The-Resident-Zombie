import React, { useContext, useEffect } from 'react';
import RegisterRoutes from './register.routes'
import AppRoutes from './app.routes'


import AuthContext from '../contexts/auth';


function Routes() {
  const { registered } = useContext(AuthContext)
  
  return registered ? <AppRoutes /> : <RegisterRoutes />
}

export default Routes;