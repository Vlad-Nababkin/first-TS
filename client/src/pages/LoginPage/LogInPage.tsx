import { IUser } from '../../entities/User/model'
import SignInForm from '../../features/auth/ui/SignInForm/SignInForm'

interface LogInPageProps {
	setUser: (user: IUser | null) => void
}

export default function LogInPage({ setUser }: LogInPageProps): React.JSX.Element {
	return (
		<div>
			<SignInForm setUser={setUser} />
		</div>
	)
}
