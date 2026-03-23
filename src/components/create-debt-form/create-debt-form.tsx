import { useDebtStore } from "@/stores/use-debt-store";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { Button } from "@ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@ui/collapsible";
import { DatePicker } from "@ui/date-picker";
import { Field, FieldError, FieldGroup, FieldLabel } from "@ui/field";
import { Input } from "@ui/input";
import { ChevronDown } from "lucide-react";
import { useId } from "react";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import {
  createDebtFormDefaultValues,
  createDebtFormSchema,
} from "./create-debt-form.constants";
import type { CreateDebtFormValues } from "./create-debt-form.types";
import { useFormFields } from "./hooks/use-form-fields";

export const CreateDebtForm = () => {
  const form = useForm<CreateDebtFormValues>({
    defaultValues: createDebtFormDefaultValues,
    resolver: standardSchemaResolver(createDebtFormSchema),
    mode: "onSubmit",
  });
  const lend = useDebtStore((state) => state.lend);

  const formId = useId();
  const { mainFields, extraFields } = useFormFields();

  const handleSubmit: SubmitHandler<CreateDebtFormValues> = (formValues) => {
    lend({ ...formValues });
    toast.success("Запись была успешно добавлена");
    form.reset();
  };

  const handleReset = () => {
    form.reset();
  };

  return (
    <Collapsible>
      <Card>
        <CardHeader>
          <CardTitle className="text-center">Дать в долг</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(handleSubmit)} id={formId}>
            <FieldGroup>
              {mainFields.map((field) => {
                const { id, inputProps, label, name, required } = field;

                return (
                  <Controller
                    name={name}
                    key={id}
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={id} className="block">
                          {label}{" "}
                          {required && (
                            <span className="text-destructive">*</span>
                          )}
                        </FieldLabel>
                        <Input
                          {...field}
                          id={id}
                          {...inputProps}
                          value={field.value as string}
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                );
              })}

              <CollapsibleContent className="flex flex-col gap-5">
                {extraFields.map((field) => {
                  const { id, label, name, required } = field;

                  return (
                    <Controller
                      name={name}
                      key={id}
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor={id} className="block">
                            {label}{" "}
                            {required && (
                              <span className="text-destructive">*</span>
                            )}
                          </FieldLabel>
                          <DatePicker
                            onChange={field.onChange}
                            ref={field.ref}
                            value={field.value as Date}
                          />
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />
                  );
                })}
              </CollapsibleContent>
            </FieldGroup>
          </form>
        </CardContent>
        <CollapsibleTrigger className="group w-full -mb-4" asChild>
          <Button variant="ghost">
            <ChevronDown className="group-data-[state=open]:rotate-180" />
          </Button>
        </CollapsibleTrigger>
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
    </Collapsible>
  );
};
