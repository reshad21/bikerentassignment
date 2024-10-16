import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AuthServices } from "./auth.service";


const createUser = catchAsync(async (req, res) => {

    const result = await AuthServices.createUserIntoDB(req.body);

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'User registered successfully',
        data: result,
    });
});


const loginUser = catchAsync(async (req, res) => {
    const result = await AuthServices.loginUser(req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User logged in successfully',
        token: result.token, // Include token at the top level
        data: result.data,
    });
});


export const AuthController = {
    createUser,
    loginUser
}