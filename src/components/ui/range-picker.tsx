import { format, isAfter } from 'date-fns';
import { ru } from 'date-fns/locale';
import { CalendarIcon } from 'lucide-react';
import type { DateRange } from 'react-day-picker';
import { Button } from './button';
import { Calendar } from './calendar';
import { Popover, PopoverContent, PopoverTrigger } from './popover';

type RangePickerProps = {
  onRangeChanged: (range: DateRange | undefined) => void;
  dateRange: DateRange;
};

export const RangePicker = ({ onRangeChanged, dateRange }: RangePickerProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          id="date-picker-range"
          className="justify-center px-2.5 font-normal"
        >
          <CalendarIcon className="" />
          {dateRange.from ? (
            dateRange.to ? (
              <>
                {format(dateRange.from, 'd MMMM yyyy', { locale: ru })} -{' '}
                {format(dateRange.to, 'd MMMM yyyy', { locale: ru })}
              </>
            ) : (
              format(dateRange.from, 'd MMMM yyyy')
            )
          ) : (
            <span>Выберите диапазон</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="range"
          defaultMonth={dateRange?.from}
          selected={dateRange}
          onSelect={onRangeChanged}
          numberOfMonths={1}
          disabled={(date) => isAfter(date, new Date())}
        />
      </PopoverContent>
    </Popover>
  );
};
