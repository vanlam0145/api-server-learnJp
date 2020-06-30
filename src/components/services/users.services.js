const { UserModel } = require('../model/users.model');
const { ErrorService } = require('../../helper/errorService');
const untilServices = require('./untilServices');
const { getDataDefault } = require('../../helper/until');
const imageGoogleDrive = require('../model/imageGoogleDrive.model');
const _ = require('lodash');
const bcrypt = require('bcryptjs');
exports.UserModel = UserModel;
exports.getList = async () => await UserModel.find({}).exec();
exports.notFriend = async (id) => {
  const user = getDataDefault(await UserModel.findById(id).lean(), []);
  let send = getDataDefault(user.sentRequest, []).map((va) => va.userId);
  let request = getDataDefault(user.request, []).map((va) => va.userId);
  let friend = getDataDefault(user.friends, []).map((va) => va.userId);

  return await UserModel.find({
    _id: { $nin: _.union(_.concat(send, friend, request, [id])) },
  }).lean();
};
exports.senderAddFriend = async (id) => {
  const user = getDataDefault(await UserModel.findById(id).lean(), []);
  let send = getDataDefault(user.sentRequest, []).map((va) => va.userId);
  return await UserModel.find({ _id: { $in: send } }).lean();
};
exports.requestAddFriend = async (id) => {
  const user = getDataDefault(await UserModel.findById(id).lean(), []);
  let re = getDataDefault(user.request, []).map((va) => va.userId);
  return await UserModel.find({ _id: { $in: re } }).lean();
};
exports.getById = async (id) => await UserModel.findById(id).exec();
exports.create = async function (body) {
  let role = 'user';
  if (process.env.CREATE_ADMIN_ACCOUNT) {
    if (body.token == process.env.CREATE_ADMIN_ACCOUNT) role = 'admin';
  }
  return await untilServices.exec(
    UserModel.create({
      username: body.username,
      email: body.email,
      hash: bcrypt.hashSync(body.password, 10),
      role,
      phoneNumber: body.phoneNumber,
    })
  );
};
exports.update = async (id, body) => {
  return await untilServices.exec(
    UserModel.findByIdAndUpdate(id, { $set: body }, { new: true })
  );
};
exports.delete = async (id) => {
  return await UserModel.findByIdAndDelete(id);
};
exports.login = async ({ username, password, email }) => {
  const user = await UserModel.findOne({
    ...(email ? { email } : { username }),
  });
  if (user && bcrypt.compareSync(password, user.hash)) {
    const u_user = await UserModel.findByIdAndUpdate(
      user._id,
      {
        _id: user._id,
        isGuest: false,
        $inc: { countOnline: 1 },
        ...(email
          ? { typeLogin: UserModel.type_login.EM }
          : { typeLogin: UserModel.type_login.UN }),
      },
      { new: true }
    );
    if (user.status == 'deactive')
      throw ErrorService.loginFaild(
        'Tài khoản này đã bị block! Liên hệ admin Hoàng để giải quyết!'
      );
    const { hash, ...userWithoutHash } = u_user.toJSON();
    return userWithoutHash;
  } else {
    if (user) throw ErrorService.loginFaild('Sai mật khẩu');
    else throw ErrorService.loginFaild('Người dùng không tồn tại');
  }
};
exports.getMe = async (id) => {
  return await UserModel.findById(id); //.populate({path:'friends.userId'}).select('-hash').lean()
};
exports.getCourseLatest = async (id) => {
  const user = await UserModel.findById(id)
    .populate({
      path: 'courses',
      populate: { path: 'contents' },
      options: { sort: '-create_at' },
    })
    .select('-hash')
    .lean();
  user.courses.forEach((course, index) => {
    let sumContent = course.contents.length;
    let sumContentMaster = _.filter(course.contents, { masterContent: true })
      .length;
    if (sumContentMaster > 0)
      user.courses[index].master = (sumContentMaster * 100) / sumContent;
  });
  return {
    courses: user.courses,
  };
};
exports.setAvartar = async (idimage, userID) => {
  const image = await imageGoogleDrive
    .findOne({ id: idimage, idUser: userID })
    .exec();
  if (!image || !image.webViewLink)
    throw ErrorService.somethingWentWrong("You don't have image!");
  return await UserModel.findOneAndUpdate(
    { _id: userID },
    { $set: { avatar: image.webViewLink } },
    { new: true }
  )
    .lean()
    .exec();
};
exports.changePass = async (id, role, newPass, oldPass = '') => {
  let user = await UserModel.findById(id);
  if (role != 'admin')
    if (!bcrypt.compareSync(oldPass || '', user.hash))
      throw ErrorService.somethingWentWrong('Mật khẩu cũ không đúng');
  return await user.update({ hash: bcrypt.hashSync(newPass, 10) });
};
exports.block = async (id) => {
  const user = UserModel.findById(id);
  let status = 'deactive';
  if (user.status == 'deactive') status = 'active';
  if (user.role == 'admin') status = 'active';
  return await UserModel.findByIdAndUpdate(id, { status }, { new: true });
};
