const moment = require('moment');
const {sequelize} = require('../../core/db')
const {Sequelize, Model} = require('sequelize')
const {Category} = require('./category')







// 定义商品模型
class Goods extends Model {

}

// 初始商品模型
Goods.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  goodName: {
    type: Sequelize.STRING(50),
    allowNull: false,
    comment: '产品名称'
  },
  imageFile: {
    type: Sequelize.STRING(100),
    allowNull: false,
    comment: '商品图片'
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
    comment: '商品销售价格'
  },
  originalPrice: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
    comment: '商品进货价格'
  },
  salesNum: {
    type: Sequelize.INTEGER,
    allowNull: true,
    defaultValue: 0,
    comment: "销量"
  },
  spec: {
    type:  Sequelize.STRING(50),
    allowNull: true,
    defaultValue: "",
    comment: '规格'
  },
  dec: {
    type: Sequelize.TEXT,
    allowNull: false,
    comment: '商品描述'
  },
  created_at: {
    type: Sequelize.DATE,
    allowNull: false,
    get() {
      return moment(this.getDataValue('created_at')).format('YYYY-MM-DD');
    }
  }
}, {
  sequelize,
  modelName: 'goods',
  tableName: 'goods'
})

// 商品关联分类
Category.hasMany(Goods, {
  foreignKey: 'category_id', sourceKey: 'id', as: 'goods'
})
Goods.belongsTo(Category, {
  foreignKey: 'category_id', targetKey: 'id', as: 'category'
})

module.exports = {
  Goods
}
