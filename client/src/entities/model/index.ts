export interface INumData {
  name: string,
  number: string,
  user_id: number,
}

export interface INum extends INumData {
	id: number,
	createdAt: Date,
	updatedAt: Date,
}

export type NumArrayType = Array<INum>

