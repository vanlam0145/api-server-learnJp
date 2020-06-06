const _ = require('lodash');
const { ErrorService } = require('./errorService');
const jwt = require('jsonwebtoken');
exports.authMiddleware = (roles) => (req, res, next) => {
  try {
    let token =
      req.headers['x-access-token'] ||
      (req.headers.authorization ? req.headers.authorization.split(' ')[1] : '');
    if (token) {
      let decode = jwt.verify(token, process.env.TOKEN_SECRET);
      req.user = decode;
      if (roles.indexOf(req.user.role) === -1)
        return res.status(ErrorService.badToken.code).json(ErrorService.badToken);
      else next();
    } else {
      return res.status(ErrorService.unauthorized.code).json(ErrorService.unauthorized);
    }
  } catch (err) {
    if (err.name == 'TokenExpiredError')
      return res.status(ErrorService.tokenExpired.code).json(ErrorService.tokenExpired);
    return res.status(500).json({ message: 'JsonWebTokenError' });
  }
};
exports.authMiddlewareSocket = (roles, socket, io, room) => {
  try {
    socket.auth = false;
    let token = socket.handshake.query.token;
    if (token) {
      let decode = jwt.verify(token, process.env.TOKEN_SECRET);
      if (roles.indexOf(decode.role) == -1) io.to(room).emit('authenticate', ErrorService.badToken);
      else {
        socket.user = decode;
        socket.auth = true;
      }
    } else io.to(room).emit('authenticate', ErrorService.unauthorized);
  } catch (err) {
    if (err.name == 'TokenExpiredError')
      io.to(room).emit('authenticate', ErrorService.tokenExpired);
    io.to(room).emit('authenticate', { code: 500, message: 'JsonWebTokenError' });
  }
};
exports.queryMiddleware = () => (req, res, next) => {
  const { filter, page, limit } = req.query;
  req.queryInfor = _.merge({
    filter: { ...JSON.parse(filter || null), userId: req.user._id },
    page,
    limit,
  });
  next();
};
exports.resErrorModify = (res, error) => {
  console.log(error);
  return res.status(error.code).json(error);
};
exports.resDataModify = (res, data, code = 200) => {
  return res.status(code).json({ code, result: data });
};
exports.serverWithPort = (port) => {
  if (port == 1903) return `http://localhost:1903`;
  return `https://learn-jp-kltn.herokuapp.com`;
};
exports.getDataDefault = (v, d) => v || d;
exports.addZero = (name) => {
  let newNum = name + '';
  while (newNum.toString().length < 3) newNum = '0' + newNum;
  return newNum;
};
