import { axiosInstance } from "../../shared/lib/axiosinstance";
import { INum, INumData, NumArrayType } from "../model";

export interface IApiResponseSuccess<T> {
  data: T,
  message: string,
  statusCode: number,
  error: null,
}

export interface IApiResponseReject {
	data: null,
	message: string,
	statusCode: number,
  error: string,
}

interface INumApi {
  getAll(): Promise<IApiResponseSuccess<NumArrayType>>
  create(inputsData: INumData): Promise<IApiResponseSuccess<INum>>
}

class NumApi implements INumApi {
  async getAll(): Promise<IApiResponseSuccess<NumArrayType>> {
    const {data} = await axiosInstance.get('/num')
    return data
  }

  async create(inputsData: INumData): Promise<IApiResponseSuccess<INum>> {
    const { data } = await axiosInstance.post('/num', inputsData)
    return data
  }
}

export const numApi = new NumApi()