class BaseServiceResponse {
  constructor(
    public status: number,
    public message: string,
  ) {}
}

export class SuccessResponse<TData> extends BaseServiceResponse {
  constructor(
    public readonly data: TData,
    public status = 200,
    public message = "SUCCESS",
  ) {
    super(status, message);
  }
}

export class ErrorResponse extends BaseServiceResponse {
  constructor(
    public status: number,
    public message: string,
    public readonly detail?: {
      content: string;
      path: string;
    },
  ) {
    super(status, message);
  }
}

export type ServiceResponse<TData> = ErrorResponse | SuccessResponse<TData>;
