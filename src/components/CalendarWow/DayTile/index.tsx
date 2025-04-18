import { useMemo, useState } from 'react';
import styles from './styles.module.css';
import { format, isAfter, isBefore, isEqual, isToday } from 'date-fns';
import { useCalendarContext } from '../CalendarMain';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'motion/react';

type DayTilePropsType = {
  enabled?: boolean;
  insideRange?: boolean;
  fullProfit?: number;
  day: Date;
};

interface TooltipState {
  visible: boolean;
  content: string;
  x: number;
  y: number;
}

export default function DayTile(props: DayTilePropsType) {
  const { day, enabled = false, insideRange = false, fullProfit = 0 } = props;
  const { onDaySelect, selectedDay, setSelectedDay, disabledFrom, disabledTo } =
    useCalendarContext();

  console.log(fullProfit);
  const tooltipContent = useMemo(() => {
    return `${fullProfit ? `${fullProfit}` : 'Nothing'}`;
  }, [fullProfit]);

  const [tooltip, setTooltip] = useState<TooltipState>({ visible: false, content: '', x: 0, y: 0 });

  const bgIntencity = useMemo((): string => {
    if (!fullProfit) return 'transparent';
    if (fullProfit === 0) return 'transparent';
    if (fullProfit >= 0 && fullProfit < 1000) {
      return styles.small;
    } else if (fullProfit >= 1000 && fullProfit < 5000) {
      return styles.medium;
    } else if (fullProfit >= 5000 && fullProfit < 10000) {
      return styles.large;
    } else if (fullProfit >= 10000) {
      return styles.max;
    } else {
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
      )}
      onMouseEnter={(e) => {
        setTooltip({
          visible: true,
          content: tooltipContent,
          x: e.clientX + 10, // Смещение вправо от курсора
          y: e.clientY + 10, // Смещение вниз от курсора
        });
      }}
      onMouseLeave={() => setTooltip((prev) => ({ ...prev, visible: false }))}>
      {format(day, 'dd')}

      <AnimatePresence>
        {tooltip.visible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'fixed', // Используем fixed для позиционирования относительно окна браузера
              left: tooltip.x,
              top: tooltip.y,
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              color: 'white',
              padding: '4px 8px',
              borderRadius: '4px',
              fontSize: '12px',
              pointerEvents: 'none', // Чтобы подсказка не мешала взаимодействию
              zIndex: 1000,
            }}>
            {tooltip.content}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
