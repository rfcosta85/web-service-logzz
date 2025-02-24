import { NextFunction, Request, Response } from "express";
import { RequestLog } from "../models/RequestLogModel";
import { RequestLogRepository } from "../repository/request_log/RequestLogRepository";
import geoip from 'geoip-lite'

export class RequestContextLoggerMiddleware {
    private requestLogRepository: RequestLogRepository;

    constructor(requestLogRepository: RequestLogRepository) {
        this.requestLogRepository = requestLogRepository;
    }
    async use(req: Request, res: Response, next: NextFunction) {
        try {
            const ip: string | undefined = req.ip;
            if (!ip) {
                console.error('IP is undefined');
                return next(new Error('IP is undefined'));
            }

            const geo = geoip.lookup(ip)
            const country: string = geo?.country ?? 'Unknown';
            if (!ip || !country) {
                console.error('IP or country is undefined');
                return next(new Error('IP or country is undefined'));
            }
            
            const log: RequestLog = {
                ip,
                country,
            };

            await this.requestLogRepository.save(log);
            next();
            
        } catch (error) {
            console.error('Error in log request', error);
        }
    }    
}
