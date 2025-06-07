import { ErrorResponse, OpulenkaService, COMMON_ERRORS } from "@opulenka/service";
import { Procedure } from "./procedure";

// type OmitExact<T, K extends keyof T> = Omit<T, K> & {
//   [P in K]-?: T[P];
// };

// type ServiceContext = OmitExact<OpulenkaService, "configureDatabase">;

let service: OpulenkaService | undefined;

export const baseProcedure = new Procedure(async () => {
  if (!service) {
    try {
      service = new OpulenkaService(process.env.DATABASE_URL!);
      await service.configureDatabase();
    } catch (error) {
      return new ErrorResponse(500, COMMON_ERRORS.SYSTEM_ERROR);
    }
  }
  const { configureDatabase, ...rest } = service;

  return rest;
});
