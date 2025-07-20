import { IAccountRepository } from "@/interfaces/repositories";
import {
  CreateAccountRequest,
  CreateAccountResponse,
  DeleteAccountRequest,
  DeleteAccountResponse,
  ErrorResponse,
  GetAccountRequest,
  GetAccountResponse,
  GetAccountsRequest,
  GetAccountsResponse,
  SuccessResponse,
  UpdateAccountRequest,
  UpdateAccountResponse,
} from "@/interfaces/services";
import { CatchErrors } from "./decorators";
import { ACCOUNT_ERRORS } from "./errors";

export class AccountService {
  constructor(private readonly accountRepository: IAccountRepository) {}

  @CatchErrors
  async createAccount(request: CreateAccountRequest): Promise<CreateAccountResponse> {
    const account = await this.accountRepository.createAccount(request);
    return new SuccessResponse(account);
  }

  @CatchErrors
  async getAccount(request: GetAccountRequest): Promise<GetAccountResponse> {
    const account = await this.accountRepository.getAccountById(request.id);

    if (!account) {
      throw new ErrorResponse(404, ACCOUNT_ERRORS.ACCOUNT_NOT_FOUND);
    }

    return new SuccessResponse(account);
  }

  @CatchErrors
  async getAccounts(request: GetAccountsRequest): Promise<GetAccountsResponse> {
    const accounts = await this.accountRepository.getAccountsByUserId(request.userId);
    return new SuccessResponse(accounts);
  }

  @CatchErrors
  async updateAccount(request: UpdateAccountRequest): Promise<UpdateAccountResponse> {
    const { id, data } = request;
    const account = await this.accountRepository.updateAccount(id, data);

    if (!account) {
      throw new ErrorResponse(404, ACCOUNT_ERRORS.ACCOUNT_NOT_FOUND);
    }

    return new SuccessResponse(account);
  }

  @CatchErrors
  async deleteAccount(request: DeleteAccountRequest): Promise<DeleteAccountResponse> {
    const success = await this.accountRepository.deleteAccount(request.id);

    if (!success) {
      throw new ErrorResponse(404, ACCOUNT_ERRORS.ACCOUNT_NOT_FOUND);
    }

    return new SuccessResponse({ success });
  }
}
