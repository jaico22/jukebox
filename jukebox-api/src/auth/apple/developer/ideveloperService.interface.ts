import { DeveloperTokenResponse } from "./models/developerTokenResponse";

export interface IDeveloperService {
    GenerateDeveloperToken() : DeveloperTokenResponse;
}