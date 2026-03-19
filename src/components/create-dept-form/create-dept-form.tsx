import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { Button } from "@ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@ui/field";
import { Input } from "@ui/input";
import { useId } from "react";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import {
  createDeptFormDefaultValues,
  createDeptFormSchema,
} from "./create-dept-form.constants";
import type { CreateDeptFormValues } from "./create-dept-form.types";
import { useFormFields } from "./hooks/use-form-fields";

export const CreateDeptForm = () => {
  const form = useForm<CreateDeptFormValues>({
    defaultValues: createDeptFormDefaultValues,
    resolver: standardSchemaResolver(createDeptFormSchema),
    mode: "onSubmit",
  });

  const formId = useId();
  const fields = useFormFields();

  const handleSubmit: SubmitHandler<CreateDeptFormValues> = (formValues) => {
    console.log({ formValues });
    form.reset();
  };

  const handleReset = () => {
    form.reset();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center">Дать в долг</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(handleSubmit)} id={formId}>
          <FieldGroup>
            {fields.map((field) => {
              const { id, inputProps, label, name, required } = field;

              return (
                <Controller
                  name={name}
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={id} className="block">
                        {label}{" "}
                        {required && (
                          <span className="text-destructive">*</span>
                        )}
                      </FieldLabel>
                      <Input {...field} id={id} {...inputProps} />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              );
            })}
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Field orientation={"horizontal"} className="justify-between">
          <Button
            type="button"
            variant={"outline"}
            onClick={handleReset}
            className="w-2/5"
          >
            Сбросить
          </Button>
          <Button type="submit" form={formId} className="w-2/5">
            Добавить
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
};
