import { IUserRepository } from "@/interfaces/repositories";
import {
  ErrorResponse,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  SuccessResponse,
} from "@/interfaces/services";
import pbkdf2 from "@/utils/pbkdf2";
import { CatchErrors } from "./decorators";
import { AUTH_ERRORS } from "./errors";

export class AuthService {
  protected saltKey = import.meta.env.SALT_KEY || "salt-key";

  constructor(private readonly userRepository: IUserRepository) {}

  protected async hashPassword(password: string) {
    return await pbkdf2(password, this.saltKey, 10000, 64);
  }

  @CatchErrors
  async register(request: RegisterRequest): Promise<RegisterResponse> {
    const userByEmail = await this.userRepository.getUserByEmail(request.email);

    if (userByEmail) {
      throw new ErrorResponse(400, AUTH_ERRORS.USED_EMAIL);
    }

    const user = await this.userRepository.addUser({
      ...request,
      password: await this.hashPassword(request.password),
    });

    return new SuccessResponse(user);
  }

  @CatchErrors
  async login(request: LoginRequest): Promise<LoginResponse> {
    const user = await this.userRepository.getUserByEmail(request.email);

    if (!user) {
      throw new ErrorResponse(400, AUTH_ERRORS.INVALID_LOGIN_INFO);
    }

    const hashedRequestPassword = await this.hashPassword(request.password);

    if (user.password !== hashedRequestPassword) {
      throw new ErrorResponse(400, AUTH_ERRORS.INVALID_LOGIN_INFO);
    }

    return new SuccessResponse({
      id: user.id,
      email: user.email,
      username: user.username,
    });
  }
}
