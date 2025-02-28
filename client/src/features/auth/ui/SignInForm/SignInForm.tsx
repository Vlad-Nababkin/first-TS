import { ChangeEvent, FormEvent, useState } from 'react'
import { useNavigate } from 'react-router'
import UserValidator from '../../../../entities/UserValidator'
import UserApi from '../../../../entities/User/api'
import { setAccessToken } from '../../../../shared/lib/axiosinstance'


interface IUser {
  id: number
	email: string
	username: string
}

interface SignInFormProps {
	setUser: (user: IUser | null) => void
}

interface InputsState {
	email: string
	password: string
}

const INITIAL_INPUTS_DATA: InputsState = {
	email: '',
	password: '',
}


export default function SignInForm({
	setUser,
}: SignInFormProps): React.JSX.Element {
	const [inputs, setInputs] = useState<InputsState>(INITIAL_INPUTS_DATA)
	const navigate = useNavigate()

	const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target
		setInputs(prev => ({ ...prev, [name]: value }))
	}

const onSubmitHandler = async (event: FormEvent<HTMLFormElement>) => {
	event.preventDefault()
	const { isValid, error } = UserValidator.validateSignIn(inputs)

	if (!isValid) {
		alert(error)
		return
	}

	try {
		const {
			statusCode,
			data,
			error: responseError,
		} = await UserApi.signIn(inputs)

		if (responseError) {
			alert(responseError)
			return
		}

		if (statusCode === 200 && data.user) {
			setUser(data.user)
			setAccessToken(data.accessToken)
			setInputs(INITIAL_INPUTS_DATA)
			navigate('/')
		}
	} catch (error) {
		console.error('Error during sign in:', error)
		alert((error as Error).message)
	}
}
  const {email, password} = inputs
	return (
		<>
			<div className='background'>
				<div className='shape'></div>
				<div className='shape'></div>
			</div>
			<form onSubmit={onSubmitHandler}>
				<h3>Login Here</h3>
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

				<button>Log In</button>
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
