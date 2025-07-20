import { eq } from "drizzle-orm";

import { UserTable } from "@/db";
import { UserEntity } from "@/interfaces/entities";
import { AddUserParams, IUserRepository } from "@/interfaces/repositories";
import { omitNull } from "@/utils/omit-null";
import { BaseRepository } from "./base-repository";

export class UserRepository extends BaseRepository implements IUserRepository {
  //
  async addUser(params: AddUserParams) {
    const [user] = await this.db
      .insert(UserTable)
      .values({ email: params.email, password: params.password })
      .returning();
    return omitNull(user);
  }

  async getUserByEmail(email: string): Promise<UserEntity | null> {
    const user = await this.db.select().from(UserTable).where(eq(UserTable.email, email));
    return omitNull(user[0]) || null;
  }
}
