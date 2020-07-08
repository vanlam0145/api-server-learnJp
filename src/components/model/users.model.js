const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const type_login = {
  FB: 'FB',
  UN: 'UN', //username
  EM: 'EM', //email
};
const usersSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    hash: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      unique: true,
      required: true,
    },
    isGuest: {
      type: Boolean,
      default: true,
    },
    fbId: String,
    typeLogin: {
      type: String,
      default: type_login.UN,
    },
    dynamic_props: {},
    userForWeb: {
      type: Boolean,
      default: false,
    },
    isOnline: {
      type: Boolean,
      default: false,
    },
    socketId: {
      type: String,
    },
    phoneNumber: {
      type: String,
      minlength: 9,
    },
    experience: {
      type: Number,
      default: 0,
    },
    level: {
      type: Number,
      default: 0,
    },
    countOnline: {
      type: Number,
      default: 0,
    },
    sumQuestion: {
      type: Number,
      default: 12,
    },
    numberAnswer: {
      type: Number,
      default: 4,
    },
    lession_number: {
      type: Number,
      default: 1,
    },
    request: [
      {
        userId: {
          type: Schema.Types.ObjectId,
          ref: 'User',
        },
        username: { type: String },
      },
    ],
    friends: [
      {
        userId: {
          type: Schema.Types.ObjectId,
          ref: 'Users',
        },
        username: { type: String },
      },
    ],
    sentRequest: [
      {
        userId: {
          type: Schema.Types.ObjectId,
          ref: 'Users',
        },
        username: { type: String },
      },
    ],
    totalRequest: { type: Number },
    totalSenderRequest: { type: Number },
    avatar: {
      type: String,
    },
    courses: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Course',
      },
    ],
    histories: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'History',
      },
    ],
    archivements: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Archivement',
      },
    ],
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    ngTao: { type: String },
    ngCapNhat: { type: String },
    status: { type: String, enum: ['active', 'deactive'], default: 'active' },
  },
  { timestamps: true }
);
usersSchema.index({ username: 1, email: 1 }, { unique: true });
const user = mongoose.model('Users', usersSchema);
user.type_login = type_login;
module.exports = { UserModel: user };
