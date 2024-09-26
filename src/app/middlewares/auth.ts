import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from "../config";
import AppError from "../errors/AppError";
import { TUserRole } from "../modules/user/user.interface";
import catchAsync from "../utils/catchAsync";

const auth = (...requiredRoles: TUserRole[]) => {
    return catchAsync(async (req: Request, res: Response, next: NextFunction) => {

        // Extract Bearer token
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            throw new AppError(httpStatus.UNAUTHORIZED, "No token provided!");
        }

        // Verify token
        jwt.verify(token, config.jwt_access_secret as string, (err, decoded) => {
            if (err) {
                throw new AppError(httpStatus.UNAUTHORIZED, "Invalid token!");
            }

            // Extract role from decoded token
            const role = (decoded as JwtPayload).role;

            if (requiredRoles.length && !requiredRoles.includes(role)) {
                throw new AppError(httpStatus.FORBIDDEN, "Insufficient permissions!");
            }

            // Attach decoded token to request object
            req.user = decoded as JwtPayload;
            next();
        });
    });
}

export default auth;
