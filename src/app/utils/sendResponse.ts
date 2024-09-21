import { Response } from 'express';

type TResponse<T> = {
  statusCode: number;
  success: boolean;
  message?: string;
  token?: string;
  data: T;
};

const sendResponse = <T>(res: Response, data: TResponse<T>) => {
  const responsePayload: any = {
    success: data.success,
    message: data.message,
    data: data.data,
  };

  if (data.token) {
    responsePayload.token = data.token;
  }

  res.status(data.statusCode).json(responsePayload);
};

export default sendResponse;
