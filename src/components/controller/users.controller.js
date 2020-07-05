const UsersService = require('../services/users.services');
const { createSchema } = require('./users.schema');
const Types = require('mongoose').Types;
const multer = require('multer');
const folderLv2Drive = require('../model/folderLv2Drive.model');
const driverGoogle = require('../../helper/googleDriverApi');
const imageModel = require('../model/imageGoogleDrive.model');
const driverGoogleHelper = require('../../helper/googleDriverHelper');
const fs = require('fs');
const path = require('path');
const { ErrorService } = require('../../helper/errorService');
const until = require('../services/untilServices');
const typeToken = {
  accessToken: 'access',
  refreshToken: 'refresh',
};
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const rp = require('request-promise');
const { resDataModify, resErrorModify } = require('../../helper/until');
exports.getList = async (req, res) => {
  const result = await UsersService.getList();
  resDataModify(res, result);
};
exports.notFriend = async (req, res) => {
  const result = await UsersService.notFriend(req.user._id);
  resDataModify(res, result);
};
exports.senderAddFriend = async (req, res) => {
  const result = await UsersService.senderAddFriend(req.user._id);
  resDataModify(res, result);
};
exports.requestAddFriend = async (req, res) => {
  const result = await UsersService.requestAddFriend(req.user._id);
  resDataModify(res, result);
};
exports.getById = async (req, res) => {
  const result = await UsersService.getById(req.params.id);
  resDataModify(res, result);
};
exports.create = async (req, res) => {
  until.validateJson(createSchema, req.body);
  const result = await UsersService.create(req.body);
  resDataModify(res, result);
};
exports.update = async (req, res) => {
  const result = await UsersService.update(req.user._id, req.body);
  resDataModify(result);
};
exports.delete = async (req, res) => {
  const result = await UsersService.delete(req.params.id);
  resDataModify(res, result);
};
exports.login = async (req, res) => {
  const result = await UsersService.login(req.body);
  resDataModify(res, {
    ...result,
    isGuest: false,
    ...(!'' && { token: _createToken(result).token }),
  });
};
exports.me = async (req, res) => {
  const result = await UsersService.getMe(req.user._id);
  resDataModify(res, result);
};
exports.getCourseLatest = async (req, res) => {
  const result = await UsersService.getCourseLatest(req.user._id);
  resDataModify(res, result);
};
exports.deleteImage = async (req, res) => {
  try {
    const content = fs.readFileSync('credentials.json');
    const auth = await driverGoogle.authorize(JSON.parse(content));
    const deleteFile = await driverGoogle.deleteFile(auth, req.params.id);
    let image = '';
    if (deleteFile.success && deleteFile.data == '') {
      image = await imageModel.findOneAndDelete({ id: req.params.id });
    }
    resDataModify(res, image);
  } catch (error) {
    console.log(error);
    throw ErrorService.somethingWentWrong(
      `Error loading client secret file:', ${error}`
    );
  }
};
exports.addImage = async (req, res) => {
  try {
    if (!fs.existsSync(path.join(__dirname, '../../../uploads'))) {
      fs.mkdir('./uploads', { recursive: true }, (err) => {
        if (err) throw err;
      });
    }
    const file = await uploadFile(req, res);
    const content = fs.readFileSync('credentials.json');
    const auth = await driverGoogle.authorize(JSON.parse(content));
    if (!file)
      throw ErrorService.somethingWentWrong(
        `Gui len khong dung format "multipart/form-data"?`
      );
    var options = {
      method: 'POST',
      uri: 'https://api.imgur.com/3/upload',
      formData: {
        image: {
          value: fs.createReadStream(
            path.join(__dirname, `../../../uploads/${req.file.filename}`)
          ),
          options: {
            contentType: 'image/jpg',
          },
        },
      },
      headers: { Authorization: 'Client-ID e305cf5bfd7da15' },
      //json: true, // Automatically stringifies the body to JSON
    };
    const imageNew = await rp.post(options);
    fs.unlinkSync(
      path.join(__dirname, `../../../uploads/${req.file.filename}`)
    );
    const userNewAvartar = await UsersService.UserModel.findByIdAndUpdate(
      req.user._id,
      {
        avatar: JSON.parse(imageNew).data.link,
      },
      { new: true }
    );
    resDataModify(res, userNewAvartar);
  } catch (error) {
    console.log(error);
    throw ErrorService.somethingWentWrong(error);
  }
};
exports.setAvartar = async (req, res) => {
  const result = await UsersService.setAvartar(
    req.params.idimage,
    req.user._id
  );
  resDataModify(res, result);
};
exports.changePass = async (req, res) => {
  until.validateJson(
    {
      type: 'object',
      properties: { newPass: { type: 'string' }, oldPass: { type: 'string' } },
      required: ['newPass'],
    },
    req.body
  );
  if (!req.user.role == 'admin' && req.user._id != req.params.id)
    throw ErrorService.permissionDeny();
  const result = await UsersService.changePass(
    req.params.id,
    req.user.role,
    req.body.newPass,
    req.body.oldPass
  );
  resDataModify(res, result);
};
exports.block = async (req, res) => {
  const result = await UsersService.block(req.params.id);
  resDataModify(res, result);
};
exports.resetPassword = async (req, res) => {
  until.validateJson(
    {
      type: 'object',
      properties: {
        email: { type: 'string' },
      },
      required: ['email'],
    },
    req.body
  );
  const user = await UsersService.UserModel.findOne({
    email: req.body.email,
  }); //.lean();
  if (!user)
    throw ErrorService.dataEmpty(
      `Không tìm thấy người dùng có email là ${req.body.email}`
    );
  var transporter = nodemailer.createTransport({
    // config mail server
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'lamhua66@gmail.com', //Tài khoản gmail vừa tạo
      pass: '0984745399', //Mật khẩu tài khoản gmail vừa tạo
    },
    tls: {
      // do not fail on invalid certs
      rejectUnauthorized: false,
    },
  });
  var content = '';
  content += `
    <div style="padding: 10px; background-color: #003375">
        <div style="padding: 10px; background-color: white;">
            <span style="color: black">Đây là mail reset mật khẩu!</span>
            <h4 style="color: #0085ff">123123</h4>
            <span style="color: black">Trên đây là mật khẩu mới của bạn với tải khoản là: "${user.username}"</span>
        </div>
    </div>
  `;
  var mainOptions = {
    to: req.body.email,
    subject: 'Reset Password',
    html: content,
  };

  transporter.sendMail(mainOptions, async function (err, info) {
    if (err) {
      resErrorModify(res, ErrorService.somethingWentWrong(err));
    } else {
      console.log(user);
      await UsersService.changePass(user._id, 'admin', '123123');
      resDataModify(res, {
        message: 'Đã gửi mật khẩu mới tới email của bạn!',
      });
    }
  });
};

const _createToken = (user) => {
  const payload = {
    email: user.email,
    username: user.username,
    _id: user._id.toString(),
    type: typeToken.accessToken,
    role: user.role,
  };
  return {
    token: jwt.sign(payload, process.env.TOKEN_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRED,
      //expiresIn: 30
      //Giay
    }),
  };
};
let diskStorage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'uploads');
  },
  filename: (req, file, callback) => {
    let math = ['image/jpeg'];
    if (math.indexOf(file.mimetype) === -1) {
      let errorMess = `The file <strong>${file.originalname}</strong> is invalid. Only allowed to upload image jpeg.`;
      return callback(errorMess, null);
    }
    let filename = `avartar-${Date.now()}-${file.originalname}`;
    callback(null, filename);
  },
});
let uploadFileConfig = multer({ storage: diskStorage }).single('file');
const uploadFile = (req, res) => {
  return new Promise((resolve, reject) => {
    uploadFileConfig(req, res, (error) => {
      if (error) reject(error);
      resolve(req.file);
    });
  });
};
