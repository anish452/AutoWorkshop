const { AuthService } = require('../../application/services');
const asyncHandler = require('../../shared/utils/asyncHandler');

const login = asyncHandler(async (req, res) => {
  const ipAddress = req.ip || req.connection.remoteAddress;
  const result = await AuthService.login(req.body.email, req.body.password, ipAddress);

  res.json({
    success: true,
    message: 'Login successful',
    data: result,
  });
});

module.exports = { login };
