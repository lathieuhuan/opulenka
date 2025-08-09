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

**File:** `apps/web/src/features/_components/account-forms/{account-type}-form.tsx`

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

### 5. Update Export Files

Add exports for new components in index files:

**Files to update:**

- `apps/web/src/features/_components/account-forms/index.ts`

```typescript
// Add to each respective index.ts file
export * from "./{account-type}-form";
```

## Prerequisites

### Validation Schemas

Ensure you have validation schemas defined in `@/validation-schemas/account-schemas/`. Ensure backend API endpoints exist. If not, create them follow apps\web\src\app\api\accounts\account-api-guide.md

- `create{AccountType}Schema` - extends base account schema with type-specific fields
- `update{AccountType}Schema` - update version with optional fields
- Export types: `Create{AccountType}Schema`, `Update{AccountType}Schema`

## Design Patterns to Follow

### Consistent Implementation

- Follow same file structure and naming conventions as existing account types
- Maintain consistent error handling and state management

### Form Validation

- Use Zod schemas from `@/validation-schemas/account-schemas`
- Implement React Hook Form with zodResolver
- Set form validation on touch with re-validation on change

### User Experience

- Order form fields logically for data entry flow
- Mark required fields clearly
- Provide consistent error messaging
