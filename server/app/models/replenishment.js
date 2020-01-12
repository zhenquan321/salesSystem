const moment = require("moment");
const { sequelize } = require("../../core/db");
const { Sequelize, Model } = require("sequelize");
const { Category } = require("./category");

// 定义商品模型
class Replenishment extends Model {}

// 初始商品模型
Replenishment.init(
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    serial_number: {
      type: Sequelize.STRING(50),
      allowNull: false,
      comment: "流水号"
    },
    replenishment_goods: {
      type: Sequelize.STRING(10000),
      allowNull: true,
      defaultValue: 0,
      comment: "进货商品详情"
    },
    replenishment_status: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 1, //"1:已完成,2:已取消",
      comment: "进货状态"
    },
    Remarks: {
      type: Sequelize.STRING(1000),
      allowNull: true,
      defaultValue: "",
      comment: "备注"
    },
    created_at: {
      type: Sequelize.DATE,
      allowNull: false,
      get() {
        return moment(this.getDataValue("created_at")).format("YYYY-MM-DD");
      }
    }
  },
  {
    sequelize,
    modelName: "replenishment",
    tableName: "replenishment"
  }
);

module.exports = {
  Replenishment
};
