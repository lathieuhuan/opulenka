import {
  IAccountRepository,
  ICreditCardRepository,
  IInvestmentAccountRepository,
  ISavingsAccountRepository,
} from "@/interfaces/repositories";
import {
  CreateAccountRequest,
  CreateAccountResponse,
  CreateCreditCardRequest,
  CreateCreditCardResponse,
  CreateInvestmentAccountRequest,
  CreateInvestmentAccountResponse,
  CreateSavingsAccountRequest,
  CreateSavingsAccountResponse,
  DeleteAccountRequest,
  DeleteAccountResponse,
  ErrorResponse,
  GetAccountRequest,
  GetAccountResponse,
  GetAccountsRequest,
  GetAccountsResponse,
  GetCreditCardResponse,
  GetCreditCardsResponse,
  GetInvestmentAccountResponse,
  GetInvestmentAccountsResponse,
  GetSavingsAccountResponse,
  GetSavingsAccountsResponse,
  SuccessResponse,
  UpdateAccountRequest,
  UpdateAccountResponse,
  UpdateCreditCardRequest,
  UpdateCreditCardResponse,
  UpdateInvestmentAccountRequest,
  UpdateInvestmentAccountResponse,
  UpdateSavingsAccountRequest,
  UpdateSavingsAccountResponse,
} from "@/interfaces/services";
import { CatchErrors } from "./decorators";
import { ACCOUNT_ERRORS } from "./errors";

export class AccountService {
  constructor(
    private readonly accountRepo: IAccountRepository,
    private readonly creditCardRepo: ICreditCardRepository,
    private readonly investmentAccountRepo: IInvestmentAccountRepository,
    private readonly savingsAccountRepo: ISavingsAccountRepository,
  ) {}

  // ===== ACCOUNT =====

  @CatchErrors
  async createAccount(request: CreateAccountRequest): Promise<CreateAccountResponse> {
    const account = await this.accountRepo.createAccount(request);
    return new SuccessResponse(account);
  }

  @CatchErrors
  async getAccountById(request: GetAccountRequest): Promise<GetAccountResponse> {
    const account = await this.accountRepo.getAccountByUserIdAndId(request.userId, request.id);

    if (!account) {
      throw new ErrorResponse(404, ACCOUNT_ERRORS.ACCOUNT_NOT_FOUND);
    }

    return new SuccessResponse(account);
  }

  @CatchErrors
  async getAccounts(request: GetAccountsRequest): Promise<GetAccountsResponse> {
    const accounts = await this.accountRepo.getAccountsByUserId(request.userId);
    return new SuccessResponse(accounts);
  }

  @CatchErrors
  async updateAccount(request: UpdateAccountRequest): Promise<UpdateAccountResponse> {
    const { id, data } = request;
    const account = await this.accountRepo.updateAccount(id, data);

    if (!account) {
      throw new ErrorResponse(404, ACCOUNT_ERRORS.ACCOUNT_NOT_FOUND);
    }

    return new SuccessResponse(account);
  }

  @CatchErrors
  async deleteAccount(request: DeleteAccountRequest): Promise<DeleteAccountResponse> {
    const success = await this.accountRepo.deleteAccount(request.id);

    if (!success) {
      throw new ErrorResponse(404, ACCOUNT_ERRORS.ACCOUNT_NOT_FOUND);
    }

    return new SuccessResponse({ success });
  }

  // ===== CREDIT CARD =====

  @CatchErrors
  async createCreditCard(request: CreateCreditCardRequest): Promise<CreateCreditCardResponse> {
    const account = await this.creditCardRepo.createAccount(request);
    return new SuccessResponse(account);
  }

  @CatchErrors
  async getCreditCardById(request: GetAccountRequest): Promise<GetCreditCardResponse> {
    const account = await this.creditCardRepo.getAccountByUserIdAndId(request.userId, request.id);

    if (!account) {
      throw new ErrorResponse(404, ACCOUNT_ERRORS.ACCOUNT_NOT_FOUND);
    }

    return new SuccessResponse(account);
  }

  @CatchErrors
  async getCreditCards(request: GetAccountsRequest): Promise<GetCreditCardsResponse> {
    const accounts = await this.creditCardRepo.getAccountsByUserId(request.userId);
    return new SuccessResponse(accounts);
  }

  @CatchErrors
  async updateCreditCard(request: UpdateCreditCardRequest): Promise<UpdateCreditCardResponse> {
    const { id, data } = request;
    const account = await this.creditCardRepo.updateAccount(id, data);

    if (!account) {
      throw new ErrorResponse(404, ACCOUNT_ERRORS.ACCOUNT_NOT_FOUND);
    }

    return new SuccessResponse(account);
  }

  @CatchErrors
  async deleteCreditCard(request: DeleteAccountRequest): Promise<DeleteAccountResponse> {
    const success = await this.creditCardRepo.deleteAccount(request.id);

    if (!success) {
      throw new ErrorResponse(404, ACCOUNT_ERRORS.ACCOUNT_NOT_FOUND);
    }

    return new SuccessResponse({ success });
  }

  // ===== INVESTMENT ACCOUNT =====

  @CatchErrors
  async createInvestmentAccount(
    request: CreateInvestmentAccountRequest,
  ): Promise<CreateInvestmentAccountResponse> {
    const account = await this.investmentAccountRepo.createAccount(request);
    return new SuccessResponse(account);
  }

  @CatchErrors
  async getInvestmentAccountById(
    request: GetAccountRequest,
  ): Promise<GetInvestmentAccountResponse> {
    const account = await this.investmentAccountRepo.getAccountByUserIdAndId(
      request.userId,
      request.id,
    );

    if (!account) {
      throw new ErrorResponse(404, ACCOUNT_ERRORS.ACCOUNT_NOT_FOUND);
    }

    return new SuccessResponse(account);
  }

  @CatchErrors
  async getInvestmentAccounts(request: GetAccountsRequest): Promise<GetInvestmentAccountsResponse> {
    const accounts = await this.investmentAccountRepo.getAccountsByUserId(request.userId);
    return new SuccessResponse(accounts);
  }

  @CatchErrors
  async updateInvestmentAccount(
    request: UpdateInvestmentAccountRequest,
  ): Promise<UpdateInvestmentAccountResponse> {
    const { id, data } = request;
    const account = await this.investmentAccountRepo.updateAccount(id, data);

    if (!account) {
      throw new ErrorResponse(404, ACCOUNT_ERRORS.ACCOUNT_NOT_FOUND);
    }

    return new SuccessResponse(account);
  }

  @CatchErrors
  async deleteInvestmentAccount(request: DeleteAccountRequest): Promise<DeleteAccountResponse> {
    const success = await this.investmentAccountRepo.deleteAccount(request.id);

    if (!success) {
      throw new ErrorResponse(404, ACCOUNT_ERRORS.ACCOUNT_NOT_FOUND);
    }

    return new SuccessResponse({ success });
  }

  // ===== SAVINGS ACCOUNT =====

  @CatchErrors
  async createSavingsAccount(
    request: CreateSavingsAccountRequest,
  ): Promise<CreateSavingsAccountResponse> {
    const account = await this.savingsAccountRepo.createAccount(request);
    return new SuccessResponse(account);
  }

  @CatchErrors
  async getSavingsAccountById(request: GetAccountRequest): Promise<GetSavingsAccountResponse> {
    const account = await this.savingsAccountRepo.getAccountByUserIdAndId(
      request.userId,
      request.id,
    );

    if (!account) {
      throw new ErrorResponse(404, ACCOUNT_ERRORS.ACCOUNT_NOT_FOUND);
    }

    return new SuccessResponse(account);
  }

  @CatchErrors
  async getSavingsAccounts(request: GetAccountsRequest): Promise<GetSavingsAccountsResponse> {
    const accounts = await this.savingsAccountRepo.getAccountsByUserId(request.userId);
    return new SuccessResponse(accounts);
  }

  @CatchErrors
  async updateSavingsAccount(
    request: UpdateSavingsAccountRequest,
  ): Promise<UpdateSavingsAccountResponse> {
    const { id, data } = request;
    const account = await this.savingsAccountRepo.updateAccount(id, data);

    if (!account) {
      throw new ErrorResponse(404, ACCOUNT_ERRORS.ACCOUNT_NOT_FOUND);
    }

    return new SuccessResponse(account);
  }

  @CatchErrors
  async deleteSavingsAccount(request: DeleteAccountRequest): Promise<DeleteAccountResponse> {
    const success = await this.savingsAccountRepo.deleteAccount(request.id);

    if (!success) {
      throw new ErrorResponse(404, ACCOUNT_ERRORS.ACCOUNT_NOT_FOUND);
    }

    return new SuccessResponse({ success });
  }
}
