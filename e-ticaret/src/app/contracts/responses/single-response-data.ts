import { ResponseModel } from "./response";

export interface SingleResponseData<T> extends ResponseModel {
     data: T;
}
