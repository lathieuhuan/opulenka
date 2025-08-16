import { parseSearchParams, toSearchParams } from "@/lib/utils/parsers";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo } from "react";
import { z } from "zod";

type PartialParams<TSchema extends z.ZodType> = Partial<z.infer<TSchema>>;

export function useQueryParams<TSchema extends z.ZodType>(
  schema: TSchema,
  defaultParams?: PartialParams<TSchema>,
) {
  //
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const parsedResult = useMemo(() => {
    const params: Partial<z.infer<TSchema>> = parseSearchParams(
      searchParams,
      defaultParams as Record<string, any>,
    );
    const { success } = schema.safeParse(params);

    return {
      params,
      valid: success,
    };
  }, [searchParams, schema]);

  useEffect(() => {
    if (defaultParams && !searchParams.size) {
      const usedParams: Record<string, any> = {};

      for (const [key, value] of Object.entries(defaultParams)) {
        if (typeof value !== "object" && value !== undefined && value !== null) {
          usedParams[key] = value;
        }
      }

      updateParams(usedParams);
    }
  }, []);

  const updateRouter = (params: URLSearchParams) => {
    router.push(`${pathname}?${params.toString()}`);
  };

  const updateParams = (params: PartialParams<TSchema>) => {
    const newParams = {
      ...parsedResult.params,
      ...params,
    };

    updateRouter(toSearchParams(newParams));
  };

  const setParams = (params: PartialParams<TSchema>) => {
    updateRouter(toSearchParams(params));
  };

  return {
    ...parsedResult,
    updateParams,
    setParams,
  };
}
