import { useMemo } from 'react';
import styles from './styles.module.css';
import { format, isAfter, isBefore, isEqual, isToday } from 'date-fns';
import { useCalendarContext } from '../CalendarMain';
import clsx from 'clsx';

type DayTilePropsType = {
  enabled?: boolean;
  insideRange?: boolean;
  value?: number;
  day: Date;
};

export default function DayTile(props: DayTilePropsType) {
  const { day, enabled = false, insideRange = false, value = 0 } = props;
  const { onDaySelect, selectedDay, setSelectedDay, disabledFrom, disabledTo } =
    useCalendarContext();

  const bgIntencity = useMemo((): string => {
    switch (value) {
      case 0:
        return 'transparent';
      case 1:
        return styles.small;
      case 2:
        return styles.medium;
      case 3:
        return styles.large;
      case 4:
        return styles.max;

      default:
        return 'transparent';
    }
  }, []);

  return (
    <div
      onClick={() => {
        onDaySelect(day);
        setSelectedDay(day);
      }}
      className={clsx(
        styles.dayTile,
        enabled || styles.disabled,
        bgIntencity,
        isToday(day) && styles.today,
        selectedDay && isEqual(day, selectedDay) && styles.selected,
        insideRange && styles.insideRange,
        disabledFrom && isAfter(day, disabledFrom) && !isToday(day) && styles.disabled,
        disabledTo && isBefore(day, disabledTo) && !isToday(day) && styles.disabled,
        /*        props.fromDate && isBefore(day, props.fromDate) && !isToday(day) && styles.afterToDate,
        props.toDate && isAfter(day, props.toDate) && !isToday(day) && styles.afterToDate, */
      )}>
      {format(day, 'dd')}
    </div>
  );
}
