const { Op } = require("sequelize");

const { Replenishment } = require("../models/replenishment");
const { Category } = require("../models/category");
const { GoodsService } = require("./goods");
const { format } = require("../../core/tools");
// 定义进货单模型
class ReplenishmentService {
  // 创建进货单
  static async create(v) {
    let myDate = new Date();
    // 创建进货单
    const replenishment = new Replenishment();
    replenishment.serial_number =
      "JH" +
      myDate.getFullYear().toString() +
      myDate.getMonth().toString() +
      myDate.getDate().toString() +
      "T" +
      myDate.getHours().toString() +
      myDate.getMinutes().toString() +
      myDate.getSeconds().toString();
    replenishment.replenishment_goods = v.get("body.replenishment_goods");
    replenishment.replenishment_status = v.get("body.replenishment_status");
    replenishment.Remarks = v.get("body.Remarks");
    replenishment.save();

    let saleGoodsArr = JSON.parse(v.get("body.sale_goods"));
    for (let i = 0; i < saleGoodsArr.length; i++) {
      GoodsService.salesGood(saleGoodsArr[i].id, saleGoodsArr[i].sales_num_now);
    }
  }

  // 获取进货单列表
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
    const replenishment = await Replenishment.findAndCountAll({
      //
      limit: pageSize, //每页10条
      offset: (page - 1) * pageSize,
      where: filter,
      order: [[desc, "DESC"]]
    });

    return {
      data: replenishment.rows,
      // 分页
      meta: {
        current_page: parseInt(page),
        per_page: 10,
        count: replenishment.count,
        total: replenishment.count,
        total_pages: Math.ceil(replenishment.count / 10)
      }
    };
  }

  // 删除进货单
  static async destroy(id) {
    // 检测是否存在进货单
    const replenishment = await Replenishment.findOne({
      where: {
        id,
        deleted_at: null
      }
    });
    // 不存在抛出错误
    if (!replenishment) {
      throw new global.errs.NotFound("没有找到相关进货单");
    }
    // 软删除进货单
    replenishment.destroy();
  }

  // 更新进货单
  static async update(id, v) {
    // 查询进货单
    const replenishment = await Replenishment.findByPk(id);
    if (!replenishment) {
      throw new global.errs.NotFound("没有找到相关进货单");
    }
    // 更新进货单
    replenishment.serial_number = v.get("body.serial_number");
    replenishment.replenishment_goods = v.get("body.replenishment_goods");
    replenishment.replenishment_status = v.get("body.replenishment_status");
    replenishment.Remarks = v.get("body.Remarks");

    replenishment.save();
  }

  // 进货单详情
  static async detail(id) {
    const replenishment = await Replenishment.findOne({
      where: {
        id
      },
      // 查询每篇进货单下关联的分类
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

    if (!replenishment) {
      throw new global.errs.NotFound("没有找到相关进货单");
    }

    return replenishment;
  }

  // 进货单概况
  static async analysis() {
    const desc = "created_at";
    const replenishment = await Replenishment.findAndCountAll({
      order: [[desc, "DESC"]]
      // where: {
      //   created_at:{
      //     [Op.in]: ['2019-12-27 11:37:14', '2019-12-28 11:37:14']
      //   },
      // }
    });

    let salesVolume = 0;
    let replenishmentVolume = 0;
    let originalVolume = 0;
    let goodsAmount = 0;
    let replenishmentAmount = replenishment.count;

    for (let i = 0; i < replenishment.rows.length; i++) {
      salesVolume += replenishment.rows[i].sales_amount;
      replenishmentVolume += replenishment.rows[i].replenishment_amount;
      originalVolume += replenishment.rows[i].original_amount;
      goodsAmount += replenishment.rows[i].sale_goods_count;
    }
    return {
      salesVolume,
      replenishmentAmount,
      replenishmentVolume,
      originalVolume,
      goodsAmount
    };
  }

  static async dailyData() {
    const replenishment = await Replenishment.findAndCountAll({
      where: {
        deleted_at: null
      }
    });

    let time = []; //日期
    let orderQuantity = []; //进货单量
    let salesVolume = []; //销售额
    let salesProfit = []; //利润
    let allData = JSON.parse(JSON.stringify(replenishment.rows));

    let nowTimes = new Date().getTime();
    for (let i = 30; i > -1; i--) {
      let setTime = nowTimes - 24 * 60 * 60 * 1000 * i;
      time.push(format(setTime, "yyyy-MM-dd"));
    }
    for (let i = 0; i < time.length; i++) {
      let orderQuantityDay = 0; //进货单量
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
      salesProfit.push(salesProfitDay.toFixed(2));
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
  ReplenishmentService
};
