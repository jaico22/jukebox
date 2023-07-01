import { Jwt, JwtPayload } from "jsonwebtoken";
import { IDeveloperService } from "./ideveloperService.interface";
import { DeveloperTokenResponse } from "./models/developerTokenResponse";

import fs = require('fs');
import jwt = require('jsonwebtoken');
        
export class DeveloperService implements IDeveloperService {
    GenerateDeveloperToken(): DeveloperTokenResponse {
        const issuedAt = new Date();
        const expiresAt = new Date(issuedAt.getTime())
        expiresAt.setDate(expiresAt.getDate() + 1);
        const privateKey = Buffer.from(process.env.APPLE_DEV_KEY as string, 'base64');
        const keyId = process.env.APPLE_DEV_KEY_ID as string;

        const payload = {
            iss: process.env.APPLE_DEV_TEAM_ID as string,
            iat: Math.floor(issuedAt.getTime() / 1000),
            exp: Math.floor(expiresAt.getTime() / 1000),
        }
        const token = jwt.sign(payload, privateKey, { algorithm: "ES256", keyid: keyId})

        return {
            token: token
        }
    }
}