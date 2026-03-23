import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { DateFormatters } from "@/constants/date";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { type Ref } from "react";

type DatePickerProps = {
  onChange: (date: Date | undefined) => void;
  value?: Date;
  placeholder?: string;
  id?: string;
  ref?: Ref<HTMLButtonElement>;
};

const DEFAULT_PLACEHOLDER = "Выберите дату";

export function DatePicker(props: DatePickerProps) {
  const { onChange, id, ref, value, placeholder } = props;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          ref={ref}
          variant="outline"
          id={id}
          className="justify-start font-normal"
        >
          {value ? (
            format(value, DateFormatters.FULL_DATE_HUMAN, { locale: ru })
          ) : (
            <span>{placeholder || DEFAULT_PLACEHOLDER}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={value}
          onSelect={onChange}
          defaultMonth={value}
        />
      </PopoverContent>
    </Popover>
  );
}
