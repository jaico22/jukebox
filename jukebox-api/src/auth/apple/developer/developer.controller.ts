import express from "express";
import { DeveloperService } from "./developer.service";
import { IDeveloperService } from "./ideveloperService.interface";

const router = express.Router()

router.post("/", async (req, res, next) => {
    try {
        const developerService: IDeveloperService = new DeveloperService();

        const token = developerService.GenerateDeveloperToken();
        
        res.status(200).send(token);
        next();
    } catch (ex : any) {
        res.status(500).send(ex.message)
    }
});

export default router;