export type AccountFormState = "idle" | "loading" | "success" | "error";

export type AccountFormProps = {
  id: string;
  defaultErrorMsg?: string;
  onStateChange: (state: AccountFormState) => void;
};
