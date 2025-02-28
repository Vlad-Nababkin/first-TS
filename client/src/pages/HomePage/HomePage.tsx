import { useEffect, useState } from "react";
import { NumArrayType } from "../../entities/Num/model";
import { numApi } from "../../entities/Num/api";


export default function HomePage(): React.JSX.Element {
  const [nums, setNums] = useState<NumArrayType>([])



useEffect(() => {
	const fetchNums = async () => {
		try {
			const nums = await numApi.getAll()
			setNums(nums)
		} catch (error) {
			console.error('Error fetching nums:', error)
		}
	}

	fetchNums()
}, [])

return (
	<div className='home-page'>
		<h2>Phone Book</h2>
		<div className='nums-grid'>
			{nums.map(num => (
				<div className='item-container' key={num.id}>
					<h3>{num.name}</h3>
					<p>Number: {num.number}</p>
				</div>
			))}
		</div>
	</div>
)
}
