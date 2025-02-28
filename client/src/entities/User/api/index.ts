import { axiosInstance } from "../../../shared/lib/axiosinstance";
import { IApiResponseSuccess, ITokens, IUserData } from "../model";

export default class UserApi {
  static async refreshToken(): Promise<IApiResponseSuccess<ITokens>> {
    const response = await axiosInstance.get('/auth/refreshTokens')
    console.log(response,'apiResponse')
    return response.data
  }

  static async signUp(userData: IUserData): Promise<IApiResponseSuccess<ITokens>> {
    const { data } = await axiosInstance.post('/auth/signUp', userData) 
    return data
  }

  static async signIn(userData: IUserData): Promise<IApiResponseSuccess<ITokens>> {
    const {data} = await axiosInstance.post('/auth/signIn', userData)
    return data
  }

    static async signOut(): Promise<IApiResponseSuccess<void>> {
    const { data } = await axiosInstance.get('/auth/signOut');
    return data;
  }
}