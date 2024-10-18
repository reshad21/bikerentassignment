import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from "../config";
import AppError from "../errors/AppError";
import { TUserRole } from "../modules/user/user.interface";
import catchAsync from "../utils/catchAsync";

const auth = (...requiredRoles: TUserRole[]) => {
    return catchAsync(async (req: Request, res: Response, next: NextFunction) => {

        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            throw new AppError(httpStatus.UNAUTHORIZED, "Authorization header is missing or improperly formatted!");
        }

        const token = authHeader.split(' ')[1];
        if (!token) {
            throw new AppError(httpStatus.UNAUTHORIZED, "No token provided!");
        }

        try {
            const decoded = jwt.verify(token, config.jwt_access_secret as string) as JwtPayload;

            const role = decoded.role as TUserRole;
            if (requiredRoles.length && !requiredRoles.includes(role)) {
                throw new AppError(httpStatus.FORBIDDEN, "Insufficient permissions!");
            }
            req.user = decoded;
            next();

        } catch (error) {
            throw new AppError(httpStatus.UNAUTHORIZED, "Invalid or expired token!");
        }
    });
};

export default auth;
