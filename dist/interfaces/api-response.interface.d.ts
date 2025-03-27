export interface ApiResponse<T> {
    message: string;
    data?: T;
    statusCode: number;
}
export interface HelloResponse extends ApiResponse<string> {
}
