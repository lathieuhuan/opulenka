import { IAccountRepository, ITransactionRepository } from "@/interfaces/repositories";
import {
  CreateTransactionRequest,
  CreateTransactionResponse,
  DeleteTransactionRequest,
  DeleteTransactionResponse,
  ErrorResponse,
  GetTransactionByIdRequest,
  GetTransactionByIdResponse,
  GetTransactionsRequest,
  GetTransactionsResponse,
  SuccessResponse,
  UpdateTransactionRequest,
  UpdateTransactionResponse,
} from "@/interfaces/services";
import { CatchErrors } from "./decorators";
import { ACCOUNT_ERRORS } from "./errors/account-errors";
import { TRANSACTION_ERRORS } from "./errors/transaction-errors";

export class TransactionService {
  constructor(
    private readonly transactionRepo: ITransactionRepository,
    private readonly accountRepo: IAccountRepository,
  ) {}

  @CatchErrors
  async createTransaction(request: CreateTransactionRequest): Promise<CreateTransactionResponse> {
    const account = await this.accountRepo.getAccountById(request.accountId);

    if (!account) {
      throw new ErrorResponse(404, ACCOUNT_ERRORS.ACCOUNT_NOT_FOUND);
    }

    const transaction = await this.transactionRepo.createTransaction(request);
    return new SuccessResponse(transaction);
  }

  @CatchErrors
  async getTransactionById(
    request: GetTransactionByIdRequest,
  ): Promise<GetTransactionByIdResponse> {
    const transaction = await this.transactionRepo.getTransactionById(request.id);

    if (!transaction) {
      throw new ErrorResponse(404, TRANSACTION_ERRORS.TRANSACTION_NOT_FOUND);
    }

    return new SuccessResponse(transaction);
  }

  @CatchErrors
  async getTransactions(request: GetTransactionsRequest): Promise<GetTransactionsResponse> {
    const transactions = await this.transactionRepo.getTransactions(request);
    return new SuccessResponse(transactions);
  }

  @CatchErrors
  async updateTransaction(request: UpdateTransactionRequest): Promise<UpdateTransactionResponse> {
    const transaction = await this.transactionRepo.updateTransaction(request.id, request.data);

    if (!transaction) {
      throw new ErrorResponse(404, TRANSACTION_ERRORS.TRANSACTION_NOT_FOUND);
    }

    return new SuccessResponse(transaction);
  }

  @CatchErrors
  async deleteTransaction(request: DeleteTransactionRequest): Promise<DeleteTransactionResponse> {
    const deleted = await this.transactionRepo.deleteTransaction(request.id);

    if (!deleted) {
      throw new ErrorResponse(404, TRANSACTION_ERRORS.TRANSACTION_NOT_FOUND);
    }

    return new SuccessResponse(null);
  }
}
