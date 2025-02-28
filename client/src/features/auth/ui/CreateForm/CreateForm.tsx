import { FormEvent, useState } from "react"
import { numApi } from "../../../../entities/Num/api"
import { useNavigate } from "react-router"

interface INum {
	id: number
	name: string
	number: string
}

interface CreateFormProps {
	onCreate: (newNum: INum) => void
}

export default function CreateForm({ onCreate }: CreateFormProps): React.JSX.Element {
	const [name, setName] = useState<string>('')
	const [number, setNumber] = useState<string>('')
	const navigate = useNavigate()

	const onSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
    try {
      const newNum = await numApi.create({ name, number });
      onCreate(newNum);
      setName('');
      setNumber('');
			navigate('/')
    } catch (error) {
      console.error('Error creating Num:', error);
    }
	}

	return (
		<form onSubmit={onSubmitHandler}>
			<input
				type='text'
				placeholder='Name'
				value={name}
				onChange={e => setName(e.target.value)}
				required
			/>
			<input
				type='text'
				placeholder='Phone Number'
				value={number}
				onChange={e => setNumber(e.target.value)}
				required
			/>
			<button type='submit'>Create Num</button>
		</form>
	)
}
