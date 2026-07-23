const sanitizeUser = (user) => {
  if (!user) return null;
  const { password, ...safeUser } = user;
  return safeUser;
};

const generateJobNumber = async (prisma) => {
  const count = await prisma.job.count();
  const year = new Date().getFullYear();
  const sequence = String(count + 1).padStart(5, '0');
  return `JOB-${year}-${sequence}`;
};

const calculateTimeTakenMinutes = (startedAt, completedAt, pausedMinutes = 0) => {
  if (!startedAt || !completedAt) return null;
  const diffMs = new Date(completedAt) - new Date(startedAt);
  const grossMinutes = Math.round(diffMs / 60000);
  return Math.max(0, grossMinutes - (pausedMinutes || 0));
};

const formatMinutes = (minutes) => {
  if (minutes == null) return null;
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins ? `${hours}h ${mins}m` : `${hours}h`;
};

module.exports = {
  sanitizeUser,
  generateJobNumber,
  calculateTimeTakenMinutes,
  formatMinutes,
};
