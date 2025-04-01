import { format, parse } from 'date-fns';

export function transformToDate(value: string) {
  if (!value) return new Date();
  if (/^\d{2}-\d{2}-\d{4}$/.test(value)) return parse(value, 'dd-MM-yyyy', new Date());
  if (/^\d{2}\/\d{2}\/\d{4}$/.test(value)) return parse(value, 'dd/MM/yyyy', new Date());
  if (/^\d{4}\/\d{2}\/\d{2}$/.test(value)) return parse(value, 'yyyy/MM/dd', new Date());
  else return new Date(value);
}

export function transformToString(value: Date) {
  return format(value, 'dd-MM-yyyy');
}
