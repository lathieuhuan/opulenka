import { ErrorResponse, OpulenkaService, COMMON_ERRORS } from "@opulenka/service";
import { DefaultContext, Procedure } from "./procedure";

// type OmitExact<T, K extends keyof T> = Omit<T, K> & {
//   [P in K]-?: T[P];
// };

// type ServiceContext = OmitExact<OpulenkaService, "configureDatabase">;

type BaseContext = DefaultContext & Omit<OpulenkaService, "configureDatabase">;

let service: OpulenkaService | undefined;

export const baseProcedure = new Procedure<BaseContext, DefaultContext>(async (_, ctx) => {
  if (!service) {
    try {
      service = new OpulenkaService(process.env.DATABASE_URL!);
      await service.configureDatabase();
    } catch (error) {
      return new ErrorResponse(500, COMMON_ERRORS.SYSTEM_ERROR);
    }
  }
  const { configureDatabase, ...rest } = service;

  return Object.assign(rest, ctx);
});
