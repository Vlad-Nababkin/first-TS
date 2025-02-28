import { useState } from 'react'
import { numApi } from '../../../../entities/Num/api'
import { INum, NumArrayType } from '../../../../entities/Num/model'
import { IUser } from '../../../../shared/types'// Предполагаем, что компонент уже типизирован
import UpdateForm from '../UpdateForm/UpdateForm'

interface NumListProps {
	user: IUser
	nums: NumArrayType
	setNums: React.Dispatch<React.SetStateAction<NumArrayType>>
}

export default function NumList({
	user,
	nums,
	setNums,
}: NumListProps): React.JSX.Element {
	const [updateNum, setUpdateNum] = useState<number | null>(null)

	const deleteHandler = async (id: number): Promise<void> => {
		try {
			await numApi.delete(id)
			setNums((prev: NumArrayType) => prev.filter(num => num.id !== id))
		} catch (error) {
			console.error('Error deleting num:', error)
		}
	}

	const updateHandler = async (updatedNum: INum): Promise<void> => {
		try {
			setNums((prev: NumArrayType) =>
				prev.map(num => (num.id === updatedNum.id ? updatedNum : num))
			)
			setUpdateNum(null)
		} catch (error) {
			console.error('Error updating num:', error)
		}
	}

	const userNums = nums.filter(num => num.user_id === user.id)

	return (
		<div className='item-list'>
			<h2>Number List</h2>
			{userNums.map(num => (
				<div className='item' key={num.id}>
					{updateNum === num.id ? (
						<UpdateForm num={num} onUpdate={updateHandler} />
					) : (
						<>
							<h3>{num.name}</h3>
							<p>Number: {num.number}</p>
							<button onClick={() => setUpdateNum(num.id)}>Update</button>
							<button className='delete' onClick={() => deleteHandler(num.id)}>
								Delete
							</button>
						</>
					)}
				</div>
			))}
		</div>
	)
}
