import { NavLink, useNavigate } from 'react-router' // Исправляем импорт
import UserApi from '../../entities/User/api'
import { IUser } from '../../shared/types'
import styles from './Nav.module.css' // Импортируем стили

interface INavProps {
	user: IUser | null
	setUser: (user: IUser | null) => void
}

export default function Nav({ user, setUser }: INavProps): React.JSX.Element {
	const navigate = useNavigate()

	async function signOutHandler() {
		const { statusCode, message, error } = await UserApi.signOut()

		if (error) return alert(error)

		if (statusCode === 200) {
			alert(`${message}\nГотово!`)
			setUser(null)
			navigate('/')
		}
	}

	return (
		<nav className={styles.nav}>
			<div>
				<NavLink
					to='/'
					className={({ isActive }) => (isActive ? styles.active : '')}
				>
					Home
				</NavLink>
			</div>
			<div>
				{!user && (
					<>
						<NavLink
							to='/login'
							className={({ isActive }) => (isActive ? styles.active : '')}
						>
							Login
						</NavLink>
						<NavLink
							to='/reg'
							className={({ isActive }) => (isActive ? styles.active : '')}
						>
							Sign Up
						</NavLink>
					</>
				)}
				{user && (
					<>
						<NavLink
							to='/createNum'
							className={({ isActive }) => (isActive ? styles.active : '')}
						>
							Add Num
						</NavLink>
						<button type='button' onClick={signOutHandler}>
							Выйти
						</button>
					</>
				)}
				</div>
		</nav>
	)
}
