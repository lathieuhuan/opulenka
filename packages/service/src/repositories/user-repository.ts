import { eq } from "drizzle-orm";

import { UserTable } from "@/db";
import { UserEntity } from "@/interfaces/entities";
import { AddUserParams, IUserRepository } from "@/interfaces/repositories";
import { BaseRepository } from "./base-repository";

export class UserRepository extends BaseRepository implements IUserRepository {
  //
  async addUser(params: AddUserParams) {
    const [user] = await this.db
      .insert(UserTable)
      .values({ email: params.email, password: params.password })
      .returning();
    return user;
  }

  async getUserByEmail(email: string): Promise<UserEntity | null> {
    const user = await this.db.select().from(UserTable).where(eq(UserTable.email, email));
    return user[0] || null;
  }
}
