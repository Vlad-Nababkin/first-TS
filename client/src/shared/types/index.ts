export interface IUser {
	id: number
	email: string
	username: string
}

export interface INum {
	id: number
	name: string
	number: string
	user_id: number
	createdAt: Date
	updatedAt: Date
}

export interface IApiResponseSuccess<T> {
	data: T
	message: string
	statusCode: number
	error: null
}

export interface IApiResponseReject {
	data: null
	message: string
	statusCode: number
	error: string
}
