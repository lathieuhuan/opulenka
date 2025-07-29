# Implementation Guide for adding new Account forms of some account type

Refer .cursor\rules\account-architecture.mdc for Account Architecture.

## Overview

This document provides a step-by-step guide for implementing forms for a new account type, following the established patterns in the codebase. This guide uses investment accounts as an example but can be applied to any account type.

## Implementation Steps

### 1. Add Account Service Functions

**File:** `apps/web/src/services/account-service.ts`

Add three new service functions:

```typescript
// Replace {AccountType} with account type (e.g., InvestmentAccount, SavingsAccount, CreditCard)
export function create{AccountType}(
  req: Omit<CreateAccountRequest, "userId">,
  config?: RequestConfig,
) {
  return http.request<CreateAccountResponse>("POST", "/accounts/{account-type}", {
    body: req,
    ...config,
  });
}

export function update{AccountType}(req: UpdateAccountRequest, config?: RequestConfig) {
  return http.request<UpdateAccountResponse>("PUT", `/accounts/{account-type}/${req.id}`, {
    body: req.data,
    ...config,
  });
}

export function get{AccountType}ById(accountId: number, config?: RequestConfig) {
  return http.request<GetAccountResponse>("GET", `/accounts/{account-type}/${accountId}`, {
    ...config,
  });
}
```

### 2. Implement Base Account Form

**File:** `apps/web/src/features/accounts-page/components/account-forms/{account-type}-form.tsx`

Create the base form component with account-type-specific fields:

**Required Base Fields:**

- **Name** (required) - Text input, full width
- **Description** (optional) - Text input, full width
- **Initial Balance** (required) - Number input
- **Currency** (required) - Select dropdown

**Account-Type-Specific Fields:**
Add fields relevant to your account type after the base fields.

**Example (Investment Account):**

- **Service Provider** (required) - Text input for investment provider
- **Account Number** (optional) - Text input for account identifier

**Key Implementation Details:**

- Use `create{AccountType}AccountSchema` for validation
- Set default account type: `EAccountType.{ACCOUNT_TYPE}`
- Default currency: `ECurrency.VND`
- Support field disabling for update scenarios
- Include error message display

### 3. Implement Account Create Form

**File:** `apps/web/src/features/accounts-page/components/account-create-forms/{account-type}-create-form.tsx`

```typescript
export function {AccountType}CreateForm({ id, defaultErrorMsg, onStateChange }: AccountFormProps) {
  const { mutate: tryCreateAccount, isError } = useMutation({
    mutationFn: create{AccountType},
    onSuccess: () => {
      onStateChange("success");
    },
    onError: () => {
      onStateChange("error");
    },
  });

  const handleSubmit = (data: {AccountType}FormValues) => {
    onStateChange("loading");
    tryCreateAccount(data);
  };

  return (
    <{AccountType}Form
      id={id}
      onSubmit={handleSubmit}
      errorMsg={isError ? defaultErrorMsg : undefined}
    />
  );
}
```

### 4. Implement Account Update Form

**File:** `apps/web/src/features/accounts-page/components/account-update-forms/{account-type}-update-form.tsx`

```typescript
export function {AccountType}Form({
  id,
  accountId,
  defaultErrorMsg,
  onStateChange,
}: {AccountType}FormProps) {
  const { data: account } = useQuery({
    queryKey: ["{account-type}", accountId],
    queryFn: async () => {
      onStateChange("loading");
      const res = await get{AccountType}ById(accountId);
      onStateChange("idle");
      return res.data;
    },
  });

  const { mutate: tryUpdateAccount, isSuccess, isError } = useMutation({
    mutationFn: update{AccountType},
    onSuccess: () => {
      onStateChange("success");
    },
    onError: () => {
      onStateChange("error");
    },
  });

  useAccountFormCleanUp(isSuccess, ["{account-type}", accountId]);

  // ... rest of implementation
}
```

**Standard Disabled Fields in Update Mode:**

- `initialBalance` - Cannot be changed after creation
- `currency` - Cannot be changed after creation
- Add other fields that shouldn't be editable after account creation

### 5. Update Export Files

Add exports for new components in index files:

**Files to update:**

- `apps/web/src/features/accounts-page/components/account-forms/index.ts`
- `apps/web/src/features/accounts-page/components/account-create-forms/index.ts`
- `apps/web/src/features/accounts-page/components/account-update-forms/index.ts`

```typescript
// Add to each respective index.ts file
export * from "./{account-type}-form";
export * from "./{account-type}-create-form";
export * from "./{account-type}-update-form";
```

## Prerequisites

### Validation Schemas

Ensure you have validation schemas defined in `@/validation-schemas/account-schemas/`. Ensure backend API endpoints exist. If not, create them follow apps\web\src\app\api\accounts\account-api-guide.md

- `create{AccountType}Schema` - extends base account schema with type-specific fields
- `update{AccountType}Schema` - update version with optional fields
- Export types: `Create{AccountType}Schema`, `Update{AccountType}Schema`

### API Endpoints

Ensure backend API endpoints exist. If not, create them follow apps\web\src\app\api\accounts\account-api-guide.md

- `POST /accounts/{account-type}` - Create new account
- `GET /accounts/{account-type}/{id}` - Fetch account details
- `PUT /accounts/{account-type}/{id}` - Update existing account

## Design Patterns to Follow

### Consistent Implementation

- Follow same file structure and naming conventions as existing account types
- Use `AccountFormProps` interface or extend from it
- Implement same mutation and query patterns
- Maintain consistent error handling and state management

### Form Validation

- Use Zod schemas from `@/validation-schemas/account-schemas`
- Implement React Hook Form with zodResolver
- Set form validation on touch with re-validation on change

### State Management

- Use TanStack Query for server state management
- Handle loading states and error states properly
- Implement cache invalidation on successful updates

### User Experience

- Order form fields logically for data entry flow
- Mark required fields clearly
- Disable appropriate fields in update mode
- Provide consistent error messaging
- Handle loading states
