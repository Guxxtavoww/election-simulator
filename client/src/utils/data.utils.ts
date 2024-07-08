export const formatToDate = (
  currentDate: string | number | Date,
  hasMinutesAndHoursAndSecounds = true 
): string => {
  const showSubValues = hasMinutesAndHoursAndSecounds ? '2-digit' : undefined;

  const dateFormatter = new Intl.DateTimeFormat('pt-br', {
    year: 'numeric',
    day: '2-digit',
    month: '2-digit',
    minute: showSubValues,
    hour: showSubValues,
    second: showSubValues,
  });

  return dateFormatter.format(new Date(currentDate));
};

export const formatRelativeTime = (
  value: number,
  formatType?: Intl.RelativeTimeFormatUnit
): string => {
  const formater = new Intl.RelativeTimeFormat('pt-bt', {
    numeric: 'auto',
  });

  return formater.format(value, formatType || 'day');
};
