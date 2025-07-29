# Account APIs Implementation Guide

Refer .cursor\rules\account-architecture.mdc for Account Architecture.

## Generic Steps for Implementing an Account APIs of some type

For example the type here is investment account

### 1. Validation Schemas Implementation

- Make file `investment-account-schemas.ts` in `apps\web\src\validation-schemas\account-schemas` which will contain 2 schemas: 1 for create and 1 for update account. They extend schemas from account-schemas with validation that meets the request in `packages\service\src\services\account-service.ts`.

### 2. Main Route Implementation

**File:** `apps/web/src/app/api/accounts/[account-type]/route.ts`

**For account types that extends from base account type**

```typescript
export const POST = baseProcedure
  .interceptRequest(validateBody(create[AccountType]AccountSchema))
  .interceptRequest(addUserInfo())
  .createHandler(async (_, ctx) => {
    const response = await ctx.service.account.create[AccountType]Account({
      ...ctx.body,
      userId: ctx.user.userId,
    });
    return response;
  });
```

**For account types that utilize the base account type directly**

```typescript
export const POST = baseProcedure
  .interceptRequest(validateBody(create[AccountType]AccountSchema))
  .interceptRequest(addUserInfo())
  .createHandler(async (_, ctx) => {
    const response = await ctx.service.account.createAccount({
      ...ctx.body,
      userId: ctx.user.userId,
      type: EAccountType.[ACCOUNT_TYPE],
    });
    return response;
  });
```

### 3. Individual Account Route Implementation

**File:** `apps/web/src/app/api/accounts/[account-type]/[accountId]/route.ts`

**For account types that extends from base account type**

```typescript
export const GET = baseProcedure
  .interceptRequest(validateSegments(z.object({ accountId: z.coerce.number() })))
  .interceptRequest(addUserInfo())
  .createHandler(async (_, ctx) => {
    const response = await ctx.service.account.get[AccountType]AccountById({
      userId: ctx.user.userId,
      id: ctx.segments.accountId,
    });
    return response;
  });

export const PUT = baseProcedure
  .interceptRequest(validateSegments(z.object({ accountId: z.coerce.number() })))
  .interceptRequest(validateBody(update[AccountType]AccountSchema))
  .interceptRequest(addUserInfo())
  .createHandler(async (_, ctx) => {
    const response = await ctx.service.account.update[AccountType]Account({
      id: ctx.segments.accountId,
      data: ctx.body,
    });
    return response;
  });
```

**For account types that utilize the base account type directly**

```typescript
export const GET = baseProcedure
  .interceptRequest(validateSegments(z.object({ accountId: z.coerce.number() })))
  .interceptRequest(addUserInfo())
  .createHandler(async (_, ctx) => {
    const response = await ctx.service.account.getAccountById({
      userId: ctx.user.userId,
      id: ctx.segments.accountId,
    });
    return response;
  });

export const PUT = baseProcedure
  .interceptRequest(validateSegments(z.object({ accountId: z.coerce.number() })))
  .interceptRequest(validateBody(update[AccountType]AccountSchema))
  .interceptRequest(addUserInfo())
  .createHandler(async (_, ctx) => {
    const response = await ctx.service.account.updateAccount({
      id: ctx.segments.accountId,
      data: ctx.body,
    });
    return response;
  });
```

### 4. Imports only necessary

```typescript
import { addUserInfo, validateBody, validateSegments } from "@/procedures/add-ons";
import { baseProcedure } from "@/procedures/base-procedure";
import { create[AccountType]AccountSchema, update[AccountType]AccountSchema } from "@/validation-schemas/account-schemas";
import { EAccountType } from "@opulenka/service";
// other utilities, constants
```
