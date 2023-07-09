import { DeveloperTokenResponse } from "./models/developerTokenResponse.js";

export interface IDeveloperService {
    GenerateDeveloperToken() : DeveloperTokenResponse;
}