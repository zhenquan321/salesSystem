const { Rule, LinValidator } = require("../../core/lin-validator-v2");

const { Category } = require("../models/category");

class OrdersValidator extends LinValidator {
  constructor() {
    super();
    this.saleGoods = [
      new Rule("isLength", "商品名称 saleGoods 不能为空", { min: 1 })
    ];
  }
}

class PositiveIdParamsValidator extends LinValidator {
  constructor() {
    super();
    this.id = [new Rule("isInt", "商品ID需要正整数", { min: 1 })];
  }
}

class OrdersSearchValidator extends LinValidator {
  constructor() {
    super();
    this.keyword = [new Rule("isLength", "必须传入搜索关键字", { min: 1 })];
  }
}

module.exports = {
  OrdersValidator,
  PositiveIdParamsValidator,
  OrdersSearchValidator
};
