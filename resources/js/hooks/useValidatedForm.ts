import { useForm } from "@inertiajs/react";
import type { FieldErrors } from "@/utils/validators";

type Validator<TForm> = (data: TForm) => FieldErrors<Extract<keyof TForm, string>>;

export function useValidatedForm<TForm extends Record<string, unknown>>(
  initial: TForm,
  validate: Validator<TForm>
) {
  const form = useForm<TForm>(initial);

  const submitValidated = (submit: () => void) => {
    const errors = validate(form.data);
    const keys = Object.keys(errors) as Array<Extract<keyof TForm, string>>;

    if (keys.length > 0) {
      keys.forEach((k) => {
        const msg = errors[k];
        if (msg) form.setError(k, msg);
      });
      return;
    }

    submit();
  };

  return { form, submitValidated };
}
