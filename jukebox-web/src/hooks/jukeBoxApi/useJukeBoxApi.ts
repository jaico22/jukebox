import axios from "axios";
import JukeBoxApi from "./models/JukeBoxApi";
import { JukeBoxApiResponse } from "./models/JukeBoxApiResponse";

export function useJukeBoxApi(): JukeBoxApi {
    const baseUrl = process.env.REACT_APP_API_BASEURL;
    const post = async function <T>(route: string, body?: any): Promise<JukeBoxApiResponse<T>> {
        var resp = await axios.post<T>(`${baseUrl}/${route}`, body);
        return {
            statusCode: resp.status,
            data: resp.data
        }
    }
    
    const get = async function <T>(route: string): Promise<JukeBoxApiResponse<T>> {
        var resp = await axios.get<T>(`${baseUrl}/${route}`);
        return {
            statusCode: resp.status,
            data: resp.data
        }
    }

    return {
        Post: post,
        Get: get
    };
}