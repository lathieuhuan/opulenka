import { UseFormProps } from "react-hook-form";

export const USE_FORM_DEFAULT_PROPS: Pick<UseFormProps, "mode" | "reValidateMode"> = {
  mode: "onTouched",
  reValidateMode: "onChange",
};
