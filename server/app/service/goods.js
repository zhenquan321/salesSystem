const { Op } = require("sequelize");

const { Goods } = require("../models/goods");
const { Category } = require("../models/category");

// 定义商品模型
class GoodsService {
  // 创建商品
  static async create(v) {
    // 检测是否存在商品
    const hasGoods = await Goods.findOne({
      where: {
        good_name: v.get("body.goodName"),
        deleted_at: null
      }
    });

    // 如果存在，抛出存在信息
    if (hasGoods) {
      throw new global.errs.Existing("商品已存在");
    }

    // 创建商品
    const goods = new Goods();

    goods.good_name = v.get("body.goodName");
    goods.price = v.get("body.price");
    goods.original_price = v.get("body.originalPrice");
    goods.dec = v.get("body.dec");
    goods.image_file = v.get("body.imageFile");
    goods.spec = v.get("body.spec");
    goods.stock_num = v.get("body.stockNum");

    // goods.category_id = v.get("body.category_id");

    goods.save();
  }

  // 获取商品列表
  static async list(params = {}) {
    const {
      // category_id,
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
    // if (category_id) {
    //   filter.category_id = category_id;
    // }

    // 筛选方式：存在搜索关键字
    if (keyword) {
      filter.good_name = {
        [Op.like]: `%${keyword}%`
      };
    }
    const goods = await Goods.findAndCountAll({
      //
      limit: pageSize, //每页10条
      offset: (page - 1) * pageSize,
      where: filter,
      order: [[desc, "DESC"]]
      // 查询每个商品下关联的分类
      // include: [
      //   {
      //     model: Category,
      //     as: "category",
      //     attributes: {
      //       exclude: ["deleted_at", "updated_at"]
      //     }
      //   }
      // ]
    });

    return {
      data: goods.rows,
      // 分页
      meta: {
        current_page: parseInt(page),
        per_page: 10,
        count: goods.count,
        total: goods.count,
        total_pages: Math.ceil(goods.count / 10)
      }
    };
  }

  // 删除商品
  static async destroy(id) {
    // 检测是否存在商品
    const goods = await Goods.findOne({
      where: {
        id,
        deleted_at: null
      }
    });
    // 不存在抛出错误
    if (!goods) {
      throw new global.errs.NotFound("没有找到相关商品");
    }

    // 软删除商品
    goods.destroy();
  }

  // 更新商品
  static async update(id, v) {
    // 查询商品
    const goods = await Goods.findByPk(id);
    if (!goods) {
      throw new global.errs.NotFound("没有找到相关商品");
    }

    // 更新商品
    goods.goodName = v.get("body.goodName");
    goods.price = v.get("body.price");
    goods.originalPrice = v.get("body.originalPrice");
    goods.salesNum = v.get("body.salesNum");
    goods.imageFile = v.get("body.imageFile");
    goods.spec = v.get("body.spec");
    goods.category_id = v.get("body.category_id");
    goods.dec = v.get("body.dec");

    goods.save();
  }

  // 更新商品浏览次数
  static async updateBrowse(id, spec) {
    // 查询商品
    const goods = await Goods.findByPk(id);
    if (!goods) {
      throw new global.errs.NotFound("没有找到相关商品");
    }
    // 更新商品浏览
    goods.spec = spec;

    goods.save();
  }

  // 商品详情
  static async detail(id) {
    const goods = await Goods.findOne({
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

    if (!goods) {
      throw new global.errs.NotFound("没有找到相关商品");
    }

    return goods;
  }
}

module.exports = {
  GoodsService
};
