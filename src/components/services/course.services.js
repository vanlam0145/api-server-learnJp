const { CourseModel } = require('../model/course.model');
const ContentModel = require('../model/content.model');
const { UserModel } = require('../model/users.model');
const { ErrorService } = require('../../helper/errorService');
const untilServices = require('./untilServices');
const question = require('../../helper/question');
const Types = require('mongoose').Types;
exports.CourseModel = CourseModel;
exports.getList = async () => await CourseModel.find({}).exec();
exports.getById = async (id) => await CourseModel.findById(id).populate('contents').lean();
exports.create = async function (body) {
  const { title, content, _id } = body;
  const contents = await untilServices.exec(ContentModel.create(content));
  const course = await untilServices.exec(CourseModel.create({ title, contents }));
  await UserModel.updateOne({ _id }, { $push: { courses: course } });
  return course;
};
exports.makeQuestion = async (id) => {
  const courses = await CourseModel.findById(id).populate('contents').lean();
  if (!courses) throw ErrorService.somethingWentWrong("You don't have any couser");
  return question._makeQuestion({}, courses.contents);
};
exports.learn = (id) => {
  this.makeQuestion(id);
};
exports.delete = async function (id) {
  const courses = await untilServices.exec(CourseModel.findByIdAndDelete({ _id: id }));
  for (let content of courses.contents) {
    await untilServices.exec(ContentModel.deleteOne({ _id: content }));
  }
  return await ContentModel.deleteOne({ _id: id });
};
exports.updateContentOnCourse = async (body) => {
  const { course_id, contents, isAdd } = body;
  return isAdd
    ? await this.addContent(course_id, contents)
    : await this.removeContent(course_id, contents);
};
exports.addContent = async (id, content) => {
  const contents = await untilServices.exec(ContentModel.create(content));
  return await untilServices.exec(
    CourseModel.updateOne({ _id: id }, { $push: { contents } }, { new: true })
  );
};
exports.removeContent = async (id, contents) => {
  if (Types.ObjectId.isValid(id)) {
    if (!contents || contents.length == 0)
      throw ErrorService.somethingWentWrong("This request don't have any 'contens'");
    else {
      for (let content of contents) {
        if (!Types.ObjectId.isValid(content))
          throw ErrorService.somethingWentWrong('This request need contents is Array ObjectId');
      }
      const couse = await untilServices.exec(
        CourseModel.updateOne({ _id: id }, { $pull: { contents: { $in: contents } } })
      );
      return await untilServices.exec(ContentModel.deleteMany({ _id: { $in: contents } }));
    }
  } else throw ErrorService.somethingWentWrong('This request need course_id is ObjectId');
};
exports.deleteContentCourse = async (id) => {
  const content = await untilServices.exec(ContentModel.deleteOne({ _id: id }));
  return await untilServices.exec(
    CourseModel.updateOne({ contents: id }, { $pull: { contents: id } })
  );
};
