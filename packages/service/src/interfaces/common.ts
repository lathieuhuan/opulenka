import { ESortOrder } from "@/constants/enums";

export type PaginationParams = {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: ESortOrder;
};