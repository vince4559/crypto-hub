import { Outlet } from 'react-router-dom'
import Header from './Header'

const SharedComponents = () => {
  return (
    <>
    <Header />
    <Outlet />
    </>
  )
}

export default SharedComponents
