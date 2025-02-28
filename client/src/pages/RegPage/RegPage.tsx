import SignUpForm from '../../features/auth/ui/SignUpForm/SignUpForm'
import { IUser } from '../../shared/types'
interface RegPageProps {
	setUser: (user: IUser | null) => void
}

export default function RegPage({ setUser }: RegPageProps): React.JSX.Element {
	return (
		<div>
			<SignUpForm setUser={setUser} />
		</div>
	)
}
