import { UseFormProps } from "react-hook-form";

export const USE_FORM_DEFAULT_PROPS: Pick<UseFormProps, "mode" | "reValidateMode"> = {
  mode: "onTouched",
  reValidateMode: "onChange",
};

export const DEFAULT_PAGINATION_PARAMS = {
  page: 1,
  limit: 10,
};
