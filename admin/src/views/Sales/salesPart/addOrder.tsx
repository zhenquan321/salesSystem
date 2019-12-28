import React from 'react';
import {
  Card,
  Input,
  Radio,
  List,
  Avatar,
  Icon,
  Button,
  InputNumber,
  Drawer,
  Form,
  notification
} from 'antd';
import { createOrders } from '@api/orders';
import styles from '../list.module.scss';
import { Link } from 'react-router-dom';
import salesStore from '../salesStore';
import { observer } from 'mobx-react';
import Item from 'antd/lib/list/Item';
import { debounce } from '@utils/tools';

interface State {
  visible: boolean;
  zkJe: number;
  orderInfo: {
    sales_amount: number;
    orders_amount: number;
    discount_amount: number;
    original_amount: number;
    sale_goods: string;
    sale_goods_count: number;
    order_status: number; //"1:已完成,2:已取消",
    Remarks: string;
  };
}
interface Props {
  updataFun: Function;
}

@observer
class AddOrder extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }
  state = {
    visible: false,
    zkJe: 0,
    orderInfo: {
      sales_amount: 0,
      orders_amount: 0,
      discount_amount: 0,
      original_amount: 0,
      sale_goods: '',
      sale_goods_count: 0,
      order_status: 1,
      Remarks: ''
    }
  };

  componentDidMount() {
    this.initData();
  }

  async initData() {}

  createOrders = () => {
    createOrders(this.state.orderInfo)
      .then((res: any) => {
        this.openNotification();
        salesStore.settlementFun(false);
        salesStore.clearGoods();
        setTimeout(() => {
          this.props.updataFun();
        }, 500);
      })
      .catch((res: any) => {
        console.log(res);
      });
  };

  onChange(item: any, value: any) {
    let goods = JSON.parse(JSON.stringify(item));
    let sales_num_now = goods.sales_num_now;
    if (value >= goods.stock_num) {
      notification.error({
        message: '库存不足',
        duration: 5,
        description: `库存仅剩余${goods.stock_num}${goods.spec}`
      });
      value = goods.stock_num;
    }
    let num = value - sales_num_now;
    if (num > 0) {
      for (let a = 0; a < num; a++) {
        salesStore.addGoods(goods);
      }
    } else if (num < 0) {
      for (let a = 0; a < -num; a++) {
        salesStore.delGoods(goods);
      }
    }
    this.allSalesFun();
  }

  showDrawer = () => {
    salesStore.settlementFun(true);
    this.allSalesFun();
  };

  allSalesFun = () => {
    let orderInfo = this.state.orderInfo;
    orderInfo.sales_amount = 0;
    orderInfo.orders_amount = 0;
    orderInfo.original_amount = 0;
    let list = salesStore.goodsList;
    for (let i = 0; i < list.length; i++) {
      orderInfo.orders_amount += list[i].price * list[i].sales_num_now;
      orderInfo.original_amount += list[i].original_price * list[i].sales_num_now;
      orderInfo.sale_goods_count += list[i].sales_num_now;
    }
    orderInfo.sales_amount = orderInfo.orders_amount - this.state.zkJe;
    orderInfo.sales_amount = Number(orderInfo.sales_amount.toFixed(2));
    orderInfo.discount_amount = this.state.zkJe;
    orderInfo.sale_goods = JSON.stringify(list);

    this.setState({
      orderInfo: orderInfo
    });
  };
  zkFun = (e: any) => {
    this.setState(
      {
        zkJe: e.target.value
      },
      () => {
        this.allSalesFun();
      }
    );
  };
  openNotification = () => {
    notification.open({
      message: '下单成功',
      description: '该订单已完成结算，可前往订单列表查看',
      icon: <Icon type="smile" style={{ color: 'green' }} />
    });
  };
  render() {
    let { orderInfo } = this.state;
    let { goodsList, addGoods, delGoods, settlementNow, settlementFun } = salesStore;
    return (
      <div>
        <div className="AddOrder">
          <List
            itemLayout="horizontal"
            className={styles.ovfAut}
            dataSource={goodsList}
            renderItem={item => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar style={{ marginRight: '-5px' }} src={item.image_file} />}
                  title={<a className={styles.dsCss}>{item.good_name}</a>}
                  description={
                    <div
                      style={{
                        marginTop: '-5px'
                      }}
                    >
                      数量：
                      <InputNumber
                        style={{ width: '50px' }}
                        size="small"
                        defaultValue={item.sales_num_now}
                        value={item.sales_num_now}
                        onChange={debounce(this.onChange.bind(this, item), 500)}
                      />
                      <Icon
                        className={styles.deleteIcon}
                        onClick={delGoods.bind(this, item, 'all')}
                        type="close-circle"
                      />
                    </div>
                  }
                />
              </List.Item>
            )}
          />
          <div className={styles.jdBtn}>
            <Button
              type="primary"
              size="small"
              shape="round"
              icon="money-collect"
              onClick={this.showDrawer}
            >
              结算
            </Button>
          </div>
        </div>
        <Drawer
          title="订单结算"
          width={520}
          closable={false}
          onClose={settlementFun.bind(this, false)}
          visible={settlementNow}
        >
          <div className="jsCard">
            <List
              itemLayout="horizontal"
              dataSource={goodsList}
              renderItem={item => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar src={item.image_file} size={60} />}
                    title={<a className={styles.dsCss2}>{item.good_name}</a>}
                    description={<div className={styles.dhsl}>{item.dec}</div>}
                  />
                  <div>
                    <div>
                      金额：{' '}
                      <span style={{ color: '#f35a1e', fontWeight: 'bold', fontSize: '20px' }}>
                        ￥{item.price}
                      </span>
                    </div>
                    <div>
                      数量：
                      <InputNumber
                        style={{ width: '50px' }}
                        size="small"
                        defaultValue={item.sales_num_now}
                        value={item.sales_num_now}
                        onChange={debounce(this.onChange.bind(this, item), 500)}
                      />
                      <Icon
                        className={styles.deleteIcon}
                        onClick={delGoods.bind(this, item, 'all')}
                        type="close-circle"
                      />
                    </div>
                  </div>
                </List.Item>
              )}
            />
            <div className={styles.zhekou}>
              <Form>
                <Form.Item label="折扣">
                  <Input placeholder="请输入此单折扣金额" onChange={this.zkFun} />
                </Form.Item>
              </Form>
            </div>
            <div className={styles.zjCard}>
              总计：
              <span style={{ color: '#f35a1e', fontWeight: 'bold', fontSize: '20px' }}>
                ￥{orderInfo.sales_amount}
              </span>
            </div>
          </div>
          <div className={styles.dbBtn}>
            <Button
              style={{
                marginRight: 8
              }}
              onClick={settlementFun.bind(this, false)}
            >
              取消
            </Button>
            <Button onClick={this.createOrders} type="primary">
              完成
            </Button>
          </div>
        </Drawer>
      </div>
    );
  }
}

export default AddOrder;
