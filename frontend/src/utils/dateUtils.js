export const toLocalDateKey = (date = new Date()) => {
  const value = date instanceof Date ? date : new Date(date);

  if (Number.isNaN(value.getTime())) {
    return '';
  }

  const year = value.getFullYear();
  const month = String(value.getMonth() + 1).padStart(2, '0');
  const day = String(value.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

export const isSameLocalDay = (dateA, dateB = new Date()) => {
  return toLocalDateKey(dateA) === toLocalDateKey(dateB);
};

export const parseTaskDate = (taskDate) => {
  if (!taskDate) {
    return null;
  }

  const date = new Date(taskDate);
  return Number.isNaN(date.getTime()) ? null : date;
};

export const startOfLocalDay = (date = new Date()) => {
  const value = date instanceof Date ? date : new Date(date);

  if (Number.isNaN(value.getTime())) {
    return null;
  }

  return new Date(value.getFullYear(), value.getMonth(), value.getDate());
};
