import { UserEntity } from "@/interfaces/entities";

export type AddUserParams = Pick<UserEntity, "email" | "password">;

export interface IUserRepository {
  //
  addUser(params: AddUserParams): Promise<UserEntity>;

  getUserByEmail(email: string): Promise<UserEntity | null>;
}
