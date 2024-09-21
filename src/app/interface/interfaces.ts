// Assuming your TResponse is defined like this in a file
export type TResponse<T> = {
    success: boolean;
    message: string;
    statusCode: number;
    data: T;
    token?: string; // Add token as an optional property
};
