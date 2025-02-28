import { Outlet } from "react-router";
import Nav from "../Nav/Nav";

interface IUser {
  id: number
	email: string
	username: string
}

interface INavProps {
	user: IUser | null
	setUser: (user: IUser | null) => void
}

export default function Layout({user, setUser}: INavProps): React.JSX.Element {

  
  return (
    <div>
      <Nav user={user} setUser={setUser} />
      <Outlet />
    </div>
  )
}