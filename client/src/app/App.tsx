import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import Layout from '../widgets/Layout/Layout'
import RegPage from '../pages/RegPage/RegPage'
import LogInPage from '../pages/LoginPage/LogInPage'

function App(): React.JSX.Element {
	const [user, setUser] = useState(null)

	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Layout user={user} setUser={setUser} />}>
					{/* <Route path='/' element={<HomePage />} /> */}
					<Route path='/reg' element={<RegPage setUser={setUser} />} />
					<Route path='/login' element={<LogInPage setUser={setUser} />} />
					{/* <Route path='/createNum' element={<CreatePage user={user} />} /> */}
				</Route>
			</Routes>
		</BrowserRouter>
	)
}

export default App
