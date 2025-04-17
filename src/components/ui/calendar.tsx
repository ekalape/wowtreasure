'use client';

import * as React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { DayPicker, useDayPicker } from 'react-day-picker';

import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({ className, classNames, showOutsideDays = true, ...props }: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn('p-3', className)}
      classNames={{
        months: 'flex flex-col ',
        month: 'space-y-4 ',
        caption: 'flex justify-center p-1 relative items-center ',
        month_caption: 'flex justify-between items-center text-foreground_alt font-hachi text-lg',
        caption_label: 'text-sm font-medium pl-3',
        nav: 'space-x-1 flex items-center ',
        nav_button: cn(
          buttonVariants({ variant: 'outline' }),
          'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 absolute ',
        ),
        nav_button_previous: 'absolute left-1 w-3',
        nav_button_next: 'absolute right-1 w-3 ',
        table: 'w-full border-collapse space-y-1',
        head_row: 'flex w-full justify-between ',
        head_cell: 'text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]',
        row: 'flex w-8 mt-2 justify-between w-full',
        cell: cn(
          'relative p-0 text-center  text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-range-end)]:rounded-r-md',
          props.mode === 'range'
            ? '[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md'
            : '[&:has([aria-selected])]:rounded-md',
        ),
        day: cn(
          buttonVariants({ variant: 'ghost' }),
          'h-6 w-8 p-0 font-normal aria-selected:opacity-100',
        ),
        day_range_start: 'day-range-start border-2 border-red-800',
        day_range_end: 'day-range-end',
        day_selected:
          'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground',
        day_today: 'bg-accent text-accent-foreground',
        day_outside:
          'day-outside text-muted-foreground aria-selected:bg-accent/50 aria-selected:text-muted-foreground',
        day_disabled: 'text-muted-foreground opacity-50 ',
        day_range_middle: 'aria-selected:bg-accent aria-selected:text-accent-foreground',
        day_hidden: 'invisible',
        weekday: 'max-w-[30px] mb-2 opacity-60',
        weekdays: ' flex w-full justify-around text-foreground_alt text-xs italic',
        ...classNames,
      }}
      components={{
        MonthCaption(props) {
          const { previousMonth, nextMonth, goToMonth } = useDayPicker();
          const curMonth = new Date();
          return (
            <div {...props}>
              {props.children}
              <div>
                <button
                  className={cn(buttonVariants({ variant: 'ghost' }), 'w-[20px]')}
                  onClick={() => goToMonth(previousMonth || curMonth)}>
                  <ChevronLeft className={cn('h-4 w-4', className)} />
                </button>

                <button
                  className={cn(buttonVariants({ variant: 'ghost' }), 'w-[20px]')}
                  onClick={() => goToMonth(nextMonth || curMonth)}>
                  <ChevronRight className={cn('h-4 w-4', className)} />
                </button>
              </div>
            </div>
          );
        },
      }}
      {...props}
    />
  );
}
Calendar.displayName = 'Calendar';

export { Calendar };
