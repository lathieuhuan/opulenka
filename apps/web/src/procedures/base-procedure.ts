import { ErrorResponse, ServiceProvider, COMMON_ERRORS } from "@opulenka/service";
import { DefaultContext, Procedure } from "./procedure";

// type OmitExact<T, K extends keyof T> = Omit<T, K> & {
//   [P in K]-?: T[P];
// };

// type ServiceContext = OmitExact<OpulenkaService, "configureDatabase">;

export type BaseContext = DefaultContext & {
  service: ServiceProvider["service"];
};

let provider: ServiceProvider | undefined;

export const baseProcedure = new Procedure<BaseContext, DefaultContext>(async (_, ctx) => {
  if (!provider) {
    try {
      provider = new ServiceProvider(process.env.DATABASE_URL!);
      await provider.configureDatabase();
    } catch (error) {
      return new ErrorResponse(500, COMMON_ERRORS.SYSTEM_ERROR);
    }
  }

  return {
    ...ctx,
    service: provider.service,
  };
});
