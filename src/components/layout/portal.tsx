import { Outlet } from "react-router"
import { Navbar } from "./navbar"

export const Portal = () => {
  return (
    <main>
      <nav>
        <Navbar />
      </nav>
      <Outlet />
    </main>
  )
}