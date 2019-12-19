const { Op } = require("sequelize");

const { Orders } = require("../models/orders");
const { Category } = require("../models/category");

// 定义商品模型
class OrdersService {
  // 创建商品
  static async create(v) {
    // 检测是否存在商品
    const hasOrders = await Orders.findOne({
      where: {
        orderName: v.get("body.serialNumber"),
        deleted_at: null
      }
    });

    // 如果存在，抛出存在信息
    if (hasOrders) {
      throw new global.errs.Existing("商品已存在");
    }

    // 创建商品
    const orders = new Orders();

    orders.orderName = v.get("body.orderName");
    orders.price = v.get("body.price");
    orders.originalPrice = v.get("body.originalPrice");
    orders.dec = v.get("body.dec");
    orders.imageFile = v.get("body.imageFile");
    orders.spec = v.get("body.spec");
    orders.serialNumber = v.get("body.serialNumber");
    orders.save();
  }

  // 获取商品列表
  static async list(params = {}) {
    const {
      category_id,
      keyword,
      page = 1,
      pageSize = 10,
      desc = "created_at"
    } = params;

    // 筛选方式
    let filter = {
      deleted_at: null
    };

    // 筛选方式：存在分类ID
    if (category_id) {
      filter.category_id = category_id;
    }

    // 筛选方式：存在搜索关键字
    if (keyword) {
      filter.orderName = {
        [Op.like]: `%${keyword}%`
      };
    }
    const orders = await Orders.findAndCountAll({
      //
      limit: pageSize, //每页10条
      offset: (page - 1) * pageSize,
      where: filter,
      order: [[desc, "DESC"]],
      // 查询每个商品下关联的分类
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

  // 删除商品
  static async destroy(id) {
    // 检测是否存在商品
    const orders = await Orders.findOne({
      where: {
        id,
        deleted_at: null
      }
    });
    // 不存在抛出错误
    if (!orders) {
      throw new global.errs.NotFound("没有找到相关商品");
    }

    // 软删除商品
    orders.destroy();
  }

  // 更新商品
  static async update(id, v) {
    // 查询商品
    const orders = await Orders.findByPk(id);
    if (!orders) {
      throw new global.errs.NotFound("没有找到相关商品");
    }

    // 更新商品
    orders.orderName = v.get("body.orderName");
    orders.price = v.get("body.price");
    orders.originalPrice = v.get("body.originalPrice");
    orders.salesNum = v.get("body.salesNum");
    orders.imageFile = v.get("body.imageFile");
    orders.spec = v.get("body.spec");
    orders.category_id = v.get("body.category_id");
    orders.dec = v.get("body.dec");

    orders.save();
  }

  // 更新商品浏览次数
  static async updateBrowse(id, spec) {
    // 查询商品
    const orders = await Orders.findByPk(id);
    if (!orders) {
      throw new global.errs.NotFound("没有找到相关商品");
    }
    // 更新商品浏览
    orders.spec = spec;

    orders.save();
  }

  // 商品详情
  static async detail(id) {
    const orders = await Orders.findOne({
      where: {
        id
      },
      // 查询每篇商品下关联的分类
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
      throw new global.errs.NotFound("没有找到相关商品");
    }

    return orders;
  }
}

module.exports = {
  OrdersService
};
