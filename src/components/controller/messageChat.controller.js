const MessageChatService = require('../services/messageChat.services');
const { createSchema } = require('./messageChat.schema');
const until = require('../services/untilServices');
const { resErrorModify, resDataModify } = require('../../helper/until');
const { ErrorService } = require('../../helper/errorService');
exports.getList = async (req, res) => {
  const result = await MessageChatService.getList();
  resDataModify(res, result);
};
exports.getById = async (req, res) => {
  const result = await MessageChatService.getById(req.params.id);
  resDataModify(res, result);
};
exports.create = async (req, res) => {
  until.validateJson(createSchema, req.body);
  const result = await MessageChatService.create(req.body);
  resDataModify(res, result);
};
exports.update = async (req, res) => {
  const result = await MessageChatService.update(req);
  resDataModify(res, result);
};
exports.delete = async (req, res) => {
  const result = await MessageChatService.delete(req.params.id);
  resDataModify(res, result);
};
exports.ofFriend = async (req, res) => {
  until.validateJson(
    {
      type: 'object',
      properties: {
        friend: { type: 'string' },
      },
      required: ['friend'],
    },
    req.body
  );
  const result = await MessageChatService.ofFriend(req);
  resDataModify(res, result);
};
