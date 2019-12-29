const { Op } = require("sequelize");

const { Orders } = require("../models/orders");
const { Category } = require("../models/category");
const { GoodsService } = require("./goods");
const { format } = require("../../core/tools");
// 定义订单模型
class OrdersService {
  // 创建订单
  static async create(v) {
    let myDate = new Date();
    // 创建订单
    const orders = new Orders();
    orders.serial_number =
      "XSD" +
      myDate.getFullYear().toString() +
      myDate.getMonth().toString() +
      myDate.getDate().toString() +
      "T" +
      myDate.getHours().toString() +
      myDate.getMinutes().toString() +
      myDate.getSeconds().toString();
    orders.sales_amount = v.get("body.sales_amount");
    orders.orders_amount = v.get("body.orders_amount");
    orders.discount_amount = v.get("body.discount_amount");
    orders.original_amount = v.get("body.original_amount");
    orders.sale_goods = v.get("body.sale_goods");
    orders.sale_goods_count = v.get("body.sale_goods_count");
    orders.order_status = v.get("body.order_status");
    orders.Remarks = v.get("body.Remarks");
    orders.save();

    let saleGoodsArr = JSON.parse(v.get("body.sale_goods"));
    for (let i = 0; i < saleGoodsArr.length; i++) {
      GoodsService.salesGood(saleGoodsArr[i].id, saleGoodsArr[i].sales_num_now);
    }
  }

  // 获取订单列表
  static async list(params = {}) {
    const { keyword, page = 1, pageSize = 10, desc = "created_at" } = params;

    // 筛选方式
    let filter = {
      deleted_at: null
    };

    // 筛选方式：存在搜索关键字
    if (keyword) {
      filter.sale_goods = {
        [Op.like]: `%${keyword}%`
      };
    }
    const orders = await Orders.findAndCountAll({
      //
      limit: pageSize, //每页10条
      offset: (page - 1) * pageSize,
      where: filter,
      order: [[desc, "DESC"]]
    });

    return {
      data: orders.rows,
      // 分页
      meta: {
        current_page: parseInt(page),
        per_page: 10,
        count: orders.count,
        total: orders.count,
        total_pages: Math.ceil(orders.count / 10)
      }
    };
  }

  // 删除订单
  static async destroy(id) {
    // 检测是否存在订单
    const orders = await Orders.findOne({
      where: {
        id,
        deleted_at: null
      }
    });
    // 不存在抛出错误
    if (!orders) {
      throw new global.errs.NotFound("没有找到相关订单");
    }
    // 软删除订单
    orders.destroy();
  }

  // 更新订单
  static async update(id, v) {
    // 查询订单
    const orders = await Orders.findByPk(id);
    if (!orders) {
      throw new global.errs.NotFound("没有找到相关订单");
    }

    // 更新订单
    orders.sales_amount = v.get("body.sales_amount");
    orders.orders_amount = v.get("body.orders_amount");
    orders.discount_amount = v.get("body.discount_amount");
    orders.original_amount = v.get("body.original_amount");
    orders.sale_goods = v.get("body.sale_goods");
    orders.order_status = v.get("body.order_status");
    orders.Remarks = v.get("body.Remarks");

    orders.save();
  }

  // 订单详情
  static async detail(id) {
    const orders = await Orders.findOne({
      where: {
        id
      },
      // 查询每篇订单下关联的分类
      include: [
        {
          model: Category,
          as: "category",
          attributes: {
            exclude: ["deleted_at", "updated_at"]
          }
        }
      ]
    });

    if (!orders) {
      throw new global.errs.NotFound("没有找到相关订单");
    }

    return orders;
  }

  // 订单概况
  static async analysis() {
    const desc = "created_at";
    const orders = await Orders.findAndCountAll({
      order: [[desc, "DESC"]]
    });

    let salesVolume = 0;
    let ordersVolume = 0;
    let originalVolume = 0;
    let goodsAmount = 0;
    let ordersAmount = orders.count;

    for (let i = 0; i < orders.rows.length; i++) {
      salesVolume += orders.rows[i].sales_amount;
      ordersVolume += orders.rows[i].orders_amount;
      originalVolume += orders.rows[i].original_amount;
      goodsAmount += orders.rows[i].sale_goods_count;
    }
    return {
      salesVolume,
      ordersAmount,
      ordersVolume,
      originalVolume,
      goodsAmount
    };
  }

  static async dailyData() {
    const orders = await Orders.findAndCountAll({
      where: {
        deleted_at: null
      }
    });

    let time = []; //日期
    let orderQuantity = []; //订单量
    let salesVolume = []; //销售额
    let salesProfit = []; //利润
    let allData = JSON.parse(JSON.stringify(orders.rows));

    let nowTimes = new Date().getTime();
    for (let i = 30; i > -1; i--) {
      let setTime = nowTimes - 24 * 60 * 60 * 1000 * i;
      time.push(format(setTime, "yyyy-MM-dd"));
    }
    for (let i = 0; i < time.length; i++) {
      let orderQuantityDay = 0; //订单量
      let salesVolumeDay = 0; //销售额
      let salesProfitDay = 0; //利润
      for (let d = 0; d < allData.length; d++) {
        if (time[i] == allData[d].created_at) {
          orderQuantityDay += 1;
          salesVolumeDay += allData[d].sales_amount;
          salesProfitDay +=
            allData[d].sales_amount - allData[d].original_amount;
        }
      }
      orderQuantity.push(orderQuantityDay);
      salesVolume.push(salesVolumeDay);
      salesProfit.push(salesProfitDay);
    }
    return {
      orderQuantity,
      salesVolume,
      salesProfit,
      time
    };
  }
}

module.exports = {
  OrdersService
};
