import { useMemo, useState } from 'react';
import styles from './styles.module.css';
import { format, isAfter, isBefore, isSameDay, isToday } from 'date-fns';
import { useCalendarContext } from '../CalendarMain';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'motion/react';

type DayTilePropsType = {
  enabled?: boolean;
  insideRange?: boolean;
  fullProfit?: number;
  day: Date;
  specialDay: Date;
  showTooltip?: boolean;
  prevSelectedDay?: Date;
};

interface TooltipState {
  visible: boolean;
  content: string;
  x: number;
  y: number;
}

export default function DayTile(props: DayTilePropsType) {
  const {
    day,
    enabled = false,
    insideRange = false,
    fullProfit = 0,
    showTooltip,
    specialDay,
    prevSelectedDay,
  } = props;
  const { onDaySelect, selectedDay, setSelectedDay, disabledFrom, disabledTo } =
    useCalendarContext();

  const tooltipContent = useMemo(() => {
    return `${fullProfit ? `${fullProfit}` : '0'}`;
  }, [fullProfit]);

  const [tooltip, setTooltip] = useState<TooltipState>({ visible: false, content: '', x: 0, y: 0 });

  const bgIntencity = useMemo((): string => {
    if (!fullProfit) return 'transparent';
    if (fullProfit === 0) return 'transparent';
    if (fullProfit >= 0 && fullProfit < 20000) {
      return styles.small;
    } else if (fullProfit >= 20000 && fullProfit < 50000) {
      return styles.medium;
    } else if (fullProfit >= 50000 && fullProfit < 70000) {
      return styles.large;
/*     } else if (fullProfit >= 60000) {
      return styles.max; */
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
        selectedDay && isSameDay(day, selectedDay) && styles.selected,
        prevSelectedDay && isSameDay(day, prevSelectedDay) && styles.prevSelected,
        insideRange && styles.insideRange,
        specialDay && isSameDay(day, specialDay) && styles.specialDay,
        disabledFrom && isAfter(day, disabledFrom) && !isToday(day) && styles.disabled,
        disabledTo && isBefore(day, disabledTo) && !isToday(day) && styles.disabled,
      )}
      onMouseEnter={(e) => {
        if (showTooltip)
          setTooltip({
            visible: true,
            content: tooltipContent,
            x: e.clientX + 10,
            y: e.clientY + 10,
          });
        else setTooltip((prev) => ({ ...prev, visible: false }));
      }}
      onMouseLeave={() => showTooltip && setTooltip((prev) => ({ ...prev, visible: false }))}>
      {format(day, 'dd')}

      <AnimatePresence>
        {showTooltip && tooltip.visible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'fixed',
              left: tooltip.x,
              top: tooltip.y,
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              color: 'white',
              padding: '4px 8px',
              borderRadius: '4px',
              fontSize: '12px',
              pointerEvents: 'none',
              zIndex: 1000,
            }}>
            {tooltip.content}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
