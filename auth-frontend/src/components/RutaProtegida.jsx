import { Navigate, Outlet } from 'react-router-dom'

export const RutaProtegida = ({ isAllowed, children, redirectTo="/login"}) => {
  if (!isAllowed) {
    console.log(isAllowed)
    return <Navigate to= {redirectTo} />
  }
    return children ? children : <Outlet/>
}