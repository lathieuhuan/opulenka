import { AddUserParams } from "@/interfaces/repositories";
import { ServiceResponse } from "./base-response";

export type RegisterRequest = AddUserParams;

export type RegisterResponse = ServiceResponse<{
  id: number;
  email: string;
  username: string | null;
}>;

export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = ServiceResponse<{
  id: number;
  email: string;
  username: string | null;
}>;
