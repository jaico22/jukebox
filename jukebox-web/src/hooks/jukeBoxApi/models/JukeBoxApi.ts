import { JukeBoxApiResponse } from "./JukeBoxApiResponse";

export default interface JukeBoxApi {
    Post<T>(route: string, body?: any) : Promise<JukeBoxApiResponse<T>>
    Get<T>(route: string) : Promise<JukeBoxApiResponse<T>> 
}