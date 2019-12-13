const {
  Rule,
  LinValidator
} = require('../../core/lin-validator-v2')

const {Category} = require('../models/category')

class GoodsValidator extends LinValidator {
  constructor() {
    super();

    this.goodName = [new Rule("isLength", "商品名称 goodName 不能为空", {min: 1})];
    this.price = [new Rule("isLength", "商品价格 price 不能为空", {min: 1})];
    this.imageFile = [new Rule("isLength", " imageFile 不能为空", {min: 1})];
    this.originalPrice = [new Rule("isLength", "商品简介 originalPrice 不能为空", {min: 1})];
    this.dec = [new Rule("isLength", "商品描述 dec 不能为空", {min: 1})];
    this.category_id = [new Rule("isLength", "商品分类 category_id 不能为空", {min: 1})];
  }

  async validateCategoryId(vals) {
    const categoryId = vals.body.category_id;

    const category = await Category.findOne({
      where: {
        id: categoryId
      }
    });

    if (!category) {
      throw new Error('暂无此分类ID')
    }
  }
}

class PositiveIdParamsValidator extends LinValidator {
  constructor() {
    super();
    this.id = [
      new Rule('isInt', '商品ID需要正整数', {min: 1})
    ]
  }
}

class GoodsSearchValidator extends LinValidator {
  constructor() {
    super();
    this.keyword = [
      new Rule('isLength', '必须传入搜索关键字', {min: 1})
    ]
  }
}

module.exports = {
  GoodsValidator,
  PositiveIdParamsValidator,
  GoodsSearchValidator
}
