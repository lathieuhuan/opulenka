# Adding New Account Type Forms Implementation Guide

## Overview
This document provides a step-by-step guide for implementing forms for a new account type, following the established patterns in the codebase. This guide uses investment accounts as an example but can be applied to any account type.

## Implementation Steps

### 1. Add Account Type Service Functions
**File:** `apps/web/src/services/account-service.ts`

Add three new service functions for your account type:
```typescript
// Replace {AccountType} with your account type (e.g., Investment, Savings, Credit)
export function create{AccountType}Account(
  req: Omit<CreateAccountRequest, "userId">,
  config?: RequestConfig,
) {
  return http.request<CreateAccountResponse>("POST", "/accounts/{account-type}", {
    body: req,
    ...config,
  });
}

export function update{AccountType}Account(req: UpdateAccountRequest, config?: RequestConfig) {
  return http.request<UpdateAccountResponse>("PUT", `/accounts/{account-type}/${req.id}`, {
    body: req.data,
    ...config,
  });
}

export function get{AccountType}AccountById(accountId: number, config?: RequestConfig) {
  return http.request<GetAccountResponse>("GET", `/accounts/{account-type}/${accountId}`, {
    ...config,
  });
}
```

**Example (Investment Account):**
- `createInvestmentAccount()` - POST to `/accounts/investment`
- `updateInvestmentAccount()` - PUT to `/accounts/investment/{id}`
- `getInvestmentAccountById()` - GET to `/accounts/investment/{id}`

### 2. Implement Base Account Form
**File:** `apps/web/src/features/accounts-page/components/account-forms/{account-type}-account-form.tsx`

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
**File:** `apps/web/src/features/accounts-page/components/account-create-forms/{account-type}-account-create-form.tsx`

```typescript
export function {AccountType}AccountCreateForm({ id, defaultErrorMsg, onStateChange }: AccountFormProps) {
  const { mutate: tryCreateAccount, isError } = useMutation({
    mutationFn: create{AccountType}Account,
    onSuccess: () => {
      onStateChange("success");
    },
    onError: () => {
      onStateChange("error");
    },
  });

  const handleSubmit = (data: {AccountType}AccountFormValues) => {
    onStateChange("loading");
    tryCreateAccount(data);
  };

  return (
    <{AccountType}AccountForm
      id={id}
      onSubmit={handleSubmit}
      errorMsg={isError ? defaultErrorMsg : undefined}
    />
  );
}
```

### 4. Implement Account Update Form
**File:** `apps/web/src/features/accounts-page/components/account-update-forms/{account-type}-account-update-form.tsx`

```typescript
export function {AccountType}AccountUpdateForm({
  id,
  accountId,
  defaultErrorMsg,
  onStateChange,
}: {AccountType}AccountUpdateFormProps) {
  const { data: account } = useQuery({
    queryKey: ["{account-type}-account", accountId],
    queryFn: async () => {
      onStateChange("loading");
      const res = await get{AccountType}AccountById(accountId);
      onStateChange("idle");
      return res.data;
    },
  });

  const { mutate: tryUpdateAccount, isSuccess, isError } = useMutation({
    mutationFn: update{AccountType}Account,
    onSuccess: () => {
      onStateChange("success");
    },
    onError: () => {
      onStateChange("error");
    },
  });

  useAccountFormCleanUp(isSuccess, ["{account-type}-account", accountId]);

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
export * from "./{account-type}-account-form";
export * from "./{account-type}-account-create-form";
export * from "./{account-type}-account-update-form";
```

## Prerequisites

### Validation Schemas
Ensure you have validation schemas defined in `@/validation-schemas/account-schemas/`:
- `create{AccountType}AccountSchema` - extends base account schema with type-specific fields
- `update{AccountType}AccountSchema` - update version with optional fields
- Export types: `Create{AccountType}AccountSchema`, `Update{AccountType}AccountSchema`

### API Endpoints
Ensure backend API endpoints exist:
- `POST /accounts/{account-type}` - Create new account
- `GET /accounts/{account-type}/{id}` - Fetch account details  
- `PUT /accounts/{account-type}/{id}` - Update existing account

### Enum Values
Add account type to `EAccountType` enum in the service package if not already present.

## Design Patterns to Follow

### Consistent Implementation
- Follow same file structure and naming conventions as existing account types
- Use identical component interfaces (`AccountFormProps`)
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
- Handle loading states gracefully

## Account Type Examples

### Cash Account (Existing)
- No additional fields beyond base account fields
- Simple implementation with just core account data

### Investment Account (Example Implementation)
- **Service Provider** (required) - Investment platform/broker
- **Account Number** (optional) - Account identifier

