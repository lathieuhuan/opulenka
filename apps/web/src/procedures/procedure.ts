import { NextRequest, NextResponse } from "next/server";
import { ServiceResponse, ErrorResponse, SuccessResponse } from "@opulenka/service";

export type DefaultContext = {
  params: Promise<{ [key: string]: string }>;
};

export type RequestInterceptor<TContext = void, TPreContext = void> = (
  request: NextRequest,
  ctx: TPreContext,
) => Promise<TContext | ErrorResponse | SuccessResponse<any>>;

type Handler<TContext = void> = (
  request: NextRequest,
  ctx: TContext,
) => Promise<ServiceResponse<any>>;

export type ResponseInterceptor = (response: ServiceResponse<any>) => void | Promise<void>;

function isResponse<TContext>(
  response: TContext | ErrorResponse | SuccessResponse<any>,
): response is ErrorResponse | SuccessResponse<any> {
  return response instanceof ErrorResponse || response instanceof SuccessResponse;
}

export class Procedure<
  TContext extends DefaultContext = DefaultContext,
  TPreContext extends DefaultContext = DefaultContext,
> {
  //
  constructor(
    private readonly interceptor?: RequestInterceptor<TContext, TPreContext>,
    private readonly responseInterceptors: ResponseInterceptor[] = [],
  ) {}

  interceptRequest<TNewContext extends DefaultContext>(interceptor: RequestInterceptor<TNewContext, TContext>) {
    const prevInterceptor = this.interceptor;

    if (prevInterceptor) {
      const newInterceptor: RequestInterceptor<TNewContext, TPreContext> = async (request, ctx) => {
        const preCtx = await prevInterceptor(request, ctx);
        return isResponse(preCtx) ? preCtx : interceptor(request, preCtx);
      };
      return new Procedure(newInterceptor, this.responseInterceptors);
    }
    return new Procedure(interceptor, this.responseInterceptors);
  }

  interceptResponse(...interceptors: ResponseInterceptor[]) {
    return new Procedure(this.interceptor, this.responseInterceptors.concat(interceptors));
  }

  private async _interceptResponse(response: ServiceResponse<any>) {
    for (const interceptor of this.responseInterceptors) {
      await interceptor(response);
    }
    return NextResponse.json(response, { status: response.status });
  }

  createHandler(handler: Handler<TContext>) {
    const interceptor = this.interceptor;

    if (interceptor) {
      return async (request: NextRequest, prevCtx: TPreContext) => {
        const ctx = await interceptor(request, prevCtx);
        const response = isResponse(ctx) ? ctx : await handler(request, ctx);
        return this._interceptResponse(response);
      };
    }

    return async (request: NextRequest, prevCtx: TContext) => {
      const response = await handler(request, prevCtx);
      return this._interceptResponse(response);
    };
  }
}
