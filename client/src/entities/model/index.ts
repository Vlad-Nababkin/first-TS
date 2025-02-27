export interface INumData {
  name: string,
  number: string,
}

export interface INum extends INumData {
  id: number,
  user_id: number,
	createdAt: Date,
	updatedAt: Date,
}


export type NumArrayType = Array<INum>

