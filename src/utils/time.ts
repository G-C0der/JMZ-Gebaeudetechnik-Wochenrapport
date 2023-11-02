const hasDatePassed = (timestamp: string | null) => {
  const expiry = JSON.parse(timestamp || '0');
  return Date.now() >= expiry;
};

export {
  hasDatePassed
};
