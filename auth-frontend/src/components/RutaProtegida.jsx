import { Navigate, Outlet } from 'react-router-dom'

export const RutaProtegida = ({ user, children,redirectoTo="/" }) => {
  if (!user) {
    return <Navigate to= {redirectoTo} />
  }
    return children ? children : <Outlet/>
}