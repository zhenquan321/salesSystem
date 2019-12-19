const moment = require("moment");
const { sequelize } = require("../../core/db");
const { Sequelize, Model } = require("sequelize");
const { Category } = require("./category");

// 定义商品模型
class Orders extends Model {}

// 初始商品模型
Orders.init(
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

    order_amount: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
      comment: "实际销售金额"
    },
    orders_amount: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
      comment: "销售总价"
    },
    discount_amount: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
      comment: "折扣金额"
    },
    original_amount: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
      comment: "成本总价"
    },
    sale_goods: {
      type: Sequelize.STRING(10000),
      allowNull: true,
      defaultValue: 0,
      comment: "销量商品详情"
    },
    order_status: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 1, //"1:已完成,2:已取消",
      comment: "订单状态"
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
    modelName: "orders",
    tableName: "orders"
  }
);

module.exports = {
  Orders
};
