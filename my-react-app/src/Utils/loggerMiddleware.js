const loggerMiddleware = (actionType, payload) => {
  const timestamp = new Date().toISOString();
  const logEntry = {
    timestamp,
    actionType,
    payload,
  };

  // Optional: Print to console
  console.log(`[LOG - ${timestamp}]`, actionType, payload);

  // Store logs in localStorage
  const logs = JSON.parse(localStorage.getItem('loggerLogs') || '[]');
  logs.push(logEntry);
  localStorage.setItem('loggerLogs', JSON.stringify(logs));
};

export default loggerMiddleware;
