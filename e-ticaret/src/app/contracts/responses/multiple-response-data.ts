import { ResponseModel } from "./response";

export interface MultipleResponseData<T> extends ResponseModel
{
      data:T[]
}