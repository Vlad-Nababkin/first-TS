import { FormEvent, useState } from 'react'
import { INum } from '../../../../entities/Num/model'

interface UpdateFormProps {
	num: INum
	onUpdate: (updatedNum: INum) => void
}

export default function UpdateForm({
	num,
	onUpdate,
}: UpdateFormProps): React.JSX.Element {
	const [name, setName] = useState<string>(num.name)
	const [number, setNumber] = useState<string>(num.number)

	const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		onUpdate({ ...num, name, number })
	}

	return (
		<form onSubmit={onSubmitHandler}>
			<input type='text' value={name} onChange={e => setName(e.target.value)} />
			<input
				type='text'
				value={number}
				onChange={e => setNumber(e.target.value)}
			/>
			<button type='submit'>Save</button>
		</form>
	)
}
