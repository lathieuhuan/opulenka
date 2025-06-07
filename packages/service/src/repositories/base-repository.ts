import { NeonHttpDatabase } from "drizzle-orm/neon-http";

export class BaseRepository {
  constructor(protected readonly db: NeonHttpDatabase) {}
}
