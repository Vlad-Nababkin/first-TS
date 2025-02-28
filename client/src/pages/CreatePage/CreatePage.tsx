import { useEffect, useState } from "react"
import { numApi } from "../../entities/Num/api"
import CreateForm from "../../features/auth/ui/CreateForm/CreateForm"
import NumList from "../../features/auth/ui/NumList/NumList"

interface IUser {
	id: number
	email: string
	username: string
}

interface INum {
	id: number
	name: string
	number: string
	user_id: number
}

interface CreatePageProps {
	user: IUser 
}

export default function CreatePage({ user }: CreatePageProps): React.JSX.Element {
  const [nums, setNums] = useState<INum[]>([])

  useEffect(() => {
		numApi.getAll().then(setNums)
	}, [user])

  const createNumHandler = (newNum: INum) => {
		setNums(prev => [...prev, newNum])
	}
  return (
    <div>
      <CreateForm onCreate={createNumHandler} />
      <NumList user={user} nums={nums} setNums={setNums}/>
    </div>
  )
}