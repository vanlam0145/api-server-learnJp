const TimeOnlineService = require('../services/timeOnline.services');
const { createSchema } = require('./timeOnline.schema');
const until = require('../services/untilServices');
const { resErrorModify, resDataModify } = require('../../helper/until');
const { ErrorService } = require('../../helper/errorService');
const moment = require('moment');
const { ROLE } = require('../../config/role');
exports.getList = async (req, res) => {
  if (req.user.role == ROLE.ADMIN && req.user._id != req.queryInfor.filter.userId) {
    delete req.queryInfor.filter.userId;
  }
  const result = await TimeOnlineService.getList(req.queryInfor.filter);
  resDataModify(res, result);
};
exports.getById = async (req, res) => {
  const result = await TimeOnlineService.getById(req.params.id);
  resDataModify(res, result);
};
exports.create = async (req, res) => {
  until.validateJson(createSchema, req.body);
  req.body.userId = req.user._id;
  const dateMoment = moment(req.body.date);
  let dateSubtractMinus = moment(req.body.date).subtract(req.body.minute, 'minute');
  let dateSince = moment(req.body.date).subtract(req.body.minute, 'minute').startOf('date');
  let numDayCreate = Math.floor((dateMoment - dateSince) / 86400000);
  let dateAr = [];
  if (numDayCreate == 0) {
    dateAr.push({
      date: dateMoment.format('DD/MM/YYYY'),
      minute: req.body.minute,
      month: dateMoment.format('MM'),
    });
  } else {
    while (numDayCreate >= 0) {
      if (numDayCreate == 0) {
        dateAr.push({
          date: dateMoment.format('DD/MM/YYYY'),
          minute: Math.round((dateMoment - moment(req.body.date).startOf('date')) / 1000 / 60),
          month: dateMoment.format('MM'),
        });
      } else {
        dateAr.push({
          date: dateSubtractMinus.format('DD/MM/YYYY'),
          minute: Math.round(
            (moment(dateSubtractMinus).endOf('date') - dateSubtractMinus) / 1000 / 60
          ),
          month: dateSubtractMinus.format('MM'),
        });
        if (numDayCreate > 0) dateSubtractMinus.add(1, 'day').startOf('date');
      }
      numDayCreate--;
    }
  }
  req.body.dateAr = dateAr;
  const result = await TimeOnlineService.create(req.body);
  resDataModify(res, result);
};
exports.update = async (req, res) => {
  const result = await TimeOnlineService.update(req);
  resDataModify(res, result);
};
exports.delete = async (req, res) => {
  const result = await TimeOnlineService.delete(req.params.id);
  resDataModify(res, result);
};
