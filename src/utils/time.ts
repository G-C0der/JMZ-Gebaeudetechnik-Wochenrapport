const hasDatePassed = (timestamp: string | undefined) => {
  const expiry = JSON.parse(timestamp || '0');
  return Date.now() >= expiry;
};

const timeStringToMinutes = (time: string | null) => {
  if (!time) return 0;
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
};

export {
  hasDatePassed,
  timeStringToMinutes
};
