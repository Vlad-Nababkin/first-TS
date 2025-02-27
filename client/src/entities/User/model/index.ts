export interface ITokens {
	accessToken: string
	refreshToken: string
}

export interface IUserData {
	username?: string
	email: string
	password: string
}

export interface IUser extends IUserData {
	id: number
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

export type UserArrayType = Array<IUser>