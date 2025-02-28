import { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router'
import Layout from '../widgets/Layout/Layout'
import RegPage from '../pages/RegPage/RegPage'
import LogInPage from '../pages/LoginPage/LogInPage'
import HomePage from '../pages/HomePage/HomePage'
import UserApi from '../entities/User/api'
import { setAccessToken } from '../shared/lib/axiosinstance'
import CreatePage from '../pages/CreatePage/CreatePage'
import { IUser } from '../shared/types'
import './index.css'


function App(): React.JSX.Element {
	const [user, setUser] = useState<IUser | null>(null)
  
	useEffect(() => {
		UserApi.refreshToken()
			.then(({ error, data, statusCode }) => {
				if (error) {
					setUser(null)
					return
				}
				if (statusCode === 200) {
					setUser(data.user)
					setAccessToken(data.accessToken)
				}
			})
			.catch(error => {
				console.error('Error refreshing token:', error)
			})
	}, [])

	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Layout user={user} setUser={setUser} />}>
					<Route path='/' element={<HomePage />} />
					<Route path='/reg' element={<RegPage setUser={setUser} />} />
					<Route path='/login' element={<LogInPage setUser={setUser} />} />
					<Route path='/createNum' element={<CreatePage user={user} />} />
				</Route>
			</Routes>
		</BrowserRouter>
	)
}

export default App
