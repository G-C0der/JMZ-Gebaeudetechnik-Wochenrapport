const hasDatePassed = (timestamp: string | undefined) => {
  const expiry = JSON.parse(timestamp || '0');
  return Date.now() >= expiry;
};

export {
  hasDatePassed
};
