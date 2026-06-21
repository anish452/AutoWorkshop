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

const calculateTimeTakenMinutes = (startedAt, completedAt) => {
  if (!startedAt || !completedAt) return null;
  const diffMs = new Date(completedAt) - new Date(startedAt);
  return Math.round(diffMs / 60000);
};

module.exports = {
  sanitizeUser,
  generateJobNumber,
  calculateTimeTakenMinutes,
};
