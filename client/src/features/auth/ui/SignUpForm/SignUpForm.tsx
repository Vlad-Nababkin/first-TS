import { ChangeEvent, FormEvent, useState } from 'react'
import { useNavigate } from 'react-router' // Исправляем импорт
import { setAccessToken } from '../../../../shared/lib/axiosinstance'
import UserApi from '../../../../entities/User/api'
import UserValidator from '../../../../entities/UserValidator'
import './SignUpForm.css'

interface IUser {
	email: string
	username: string
}

interface SignUpFormProps {
	setUser: (user: IUser | null) => void
}

interface InputsState {
	username: string
	email: string
	password: string
	repeatPassword: string
}

const INITIAL_INPUTS_DATA: InputsState = {
	username: '',
	email: '',
	password: '',
	repeatPassword: '',
}

export default function SignUpForm({
	setUser,
}: SignUpFormProps): React.JSX.Element {
	const [inputs, setInputs] = useState<InputsState>(INITIAL_INPUTS_DATA)
	const navigate = useNavigate()

	const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target
		setInputs(prev => ({ ...prev, [name]: value }))
	}

	const onSubmitHandler = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		const { isValid, error } = UserValidator.validateSignUp(inputs)

		if (!isValid) {
			alert(error)
			return
		}

		try {
			const {
				statusCode,
				data,
				error: responseError,
			} = await UserApi.signUp(inputs)

			if (responseError) {
				alert(responseError)
				return
			}

			if (statusCode === 201) {
				setUser(data.user)
				setAccessToken(data.accessToken)
				localStorage.setItem('user', JSON.stringify(data.user))
				setInputs(INITIAL_INPUTS_DATA)
				navigate('/')
			}
		} catch (error) {
			console.log(error)
			alert((error as Error).message)
		}
	}

	const { username, email, password, repeatPassword } = inputs

	return (
		<>
			<div className='background'>
				<div className='shape'></div>
				<div className='shape'></div>
			</div>
			<form onSubmit={onSubmitHandler}>
				<h3>Register Here</h3>
				<input
					type='text'
					name='username'
					placeholder='Username'
					value={username}
					onChange={onChangeHandler}
				/>
				<input
					type='email'
					name='email'
					placeholder='Email'
					value={email}
					onChange={onChangeHandler}
				/>
				<input
					type='password'
					name='password'
					placeholder='Password'
					value={password}
					onChange={onChangeHandler}
				/>
				<input
					type='password'
					name='repeatPassword'
					placeholder='Confirm Password'
					value={repeatPassword}
					onChange={onChangeHandler}
				/>
				<button type='submit'>Register</button>
				<div className='social'>
					<div className='go'>
						<i className='fab fa-google'></i> Google
					</div>
					<div className='fb'>
						<i className='fab fa-facebook'></i> Telegram
					</div>
				</div>
			</form>
		</>
	)
}
