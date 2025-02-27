import SignInForm from "../../features/auth/ui/SignInForm/SignInForm";

export default function LogInPage({ setUser }) {
    return (
      <div>
        <SignInForm setUser={setUser} />
      </div>
    )
}
