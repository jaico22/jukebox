export interface JukeBoxApiResponse<T> {
    statusCode: number;
    data?: T;
}