const { Rule, LinValidator } = require("../../core/lin-validator-v2");

const { Category } = require("../models/category");

class ReplenishmentValidator extends LinValidator {
  constructor() {
    super();
    this.replenishment_goods = [
      new Rule("isLength", "必须选择商品才能下单", { min: 1 })
    ];
  }
}

class PositiveIdParamsValidator extends LinValidator {
  constructor() {
    super();
    this.id = [new Rule("isInt", "商品ID需要正整数", { min: 1 })];
  }
}

class ReplenishmentSearchValidator extends LinValidator {
  constructor() {
    super();
    this.keyword = [new Rule("isLength", "必须传入搜索关键字", { min: 1 })];
  }
}

module.exports = {
  ReplenishmentValidator,
  PositiveIdParamsValidator,
  ReplenishmentSearchValidator
};
