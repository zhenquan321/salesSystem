const { AdminService } = require("../service/admin");
const { generateToken } = require("../../core/util");
const { Auth } = require("../../middlewares/auth");

class LoginManager {
  // 管理员登录
  static async adminLogin(email, password) {
    // 验证账号密码是否正确
    const admin = await AdminService.verify(email, password);
    let userInfo = await AdminService.detail(admin.id);
    userInfo.dataValues.token = generateToken(admin.id, Auth.ADMIN);
    console.log("userInfo", userInfo.dataValues);
    return userInfo.dataValues;
  }
}

module.exports = {
  LoginManager
};
