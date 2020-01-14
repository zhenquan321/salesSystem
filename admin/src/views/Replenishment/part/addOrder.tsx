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
import { createReplenishment } from '@api/replenishment';
import styles from '../list.module.scss';
import { Link } from 'react-router-dom';
import replenishmentStore from '../replenishmentStore';
import { observer } from 'mobx-react';
import Item from 'antd/lib/list/Item';
import { debounce } from '@utils/tools';

interface State {
  visible: boolean;
  zkJe: number;
  orderInfo: {
    replenishment_goods: string;
    replenishment_status: number;
    Remarks: string;
    orders_amount: number;
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
      replenishment_goods: '',
      replenishment_status: 1,
      Remarks: '',
      orders_amount: 0
    }
  };

  componentDidMount() {
    this.initData();
  }

  async initData() {}

  createOrders = () => {
    createReplenishment(this.state.orderInfo)
      .then((res: any) => {
        this.openNotification();
        replenishmentStore.settlementFun(false);
        // replenishmentStore.clearGoods();
      })
      .catch((res: any) => {
        console.log(res);
      });
  };

  onChange(item: any, value: any) {
    let goods = JSON.parse(JSON.stringify(item));
    let replenishment_num_now = goods.replenishment_num_now;
    let num = value - replenishment_num_now;
    if (num > 0) {
      for (let a = 0; a < num; a++) {
        replenishmentStore.addGoods(goods);
      }
    } else if (num < 0) {
      for (let a = 0; a < -num; a++) {
        replenishmentStore.delGoods(goods);
      }
    }
    this.allSalesFun();
  }
  onChangeJg = (item: any, e: any) => {
    let goods = JSON.parse(JSON.stringify(item));
    goods.original_price = e.target.value;
    replenishmentStore.updateGoods(goods);
    this.allSalesFun();
  };
  showDrawer = () => {
    replenishmentStore.settlementFun(true);
    this.allSalesFun();
  };

  allSalesFun = () => {
    let orderInfo = this.state.orderInfo;
    let list = replenishmentStore.goodsList;
    for (let i = 0; i < list.length; i++) {
      orderInfo.orders_amount += list[i].original_price * list[i].replenishment_num_now;
    }
    orderInfo.replenishment_goods = JSON.stringify(list);
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
      message: '已创建补货单',
      description: '已创建补货单，后续商品采购完成，入库需再次确认商品细节',
      icon: <Icon type="smile" style={{ color: 'green' }} />
    });
  };
  render() {
    let { orderInfo } = this.state;
    let { goodsList, addGoods, delGoods, settlementNow, settlementFun } = replenishmentStore;
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
                      补货：
                      <InputNumber
                        style={{ width: '50px' }}
                        size="small"
                        defaultValue={item.replenishment_num_now}
                        value={item.replenishment_num_now}
                        onChange={debounce(this.onChange.bind(this, item), 500)}
                      />
                      {item.spec}
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
            <Button type="primary" size="small" shape="round" onClick={this.showDrawer}>
              创建补货单
            </Button>
          </div>
        </div>
        <Drawer
          title="确认补货单"
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
                    <div style={{ marginBottom: '10px' }}>
                      进货成本价：
                      <Input
                        style={{ width: '50px' }}
                        size="small"
                        defaultValue={item.original_price}
                        onChange={this.onChangeJg.bind(this, item)}
                      />
                    </div>
                    <div>
                      数量：
                      <InputNumber
                        style={{ width: '50px' }}
                        size="small"
                        defaultValue={item.replenishment_num_now}
                        value={item.replenishment_num_now}
                        onChange={debounce(this.onChange.bind(this, item), 500)}
                      />
                      {item.spec}
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
            {/* <div className={styles.zhekou}>
              <Form>
                <Form.Item label="折扣">
                  <Input placeholder="请输入此单折扣金额" onChange={this.zkFun} />
                </Form.Item>
              </Form>
            </div> */}
            <div className={styles.zjCard}>
              成本总计：
              <span style={{ color: '#f35a1e', fontWeight: 'bold', fontSize: '20px' }}>
                ￥{orderInfo.orders_amount}
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
              确认
            </Button>
          </div>
        </Drawer>
      </div>
    );
  }
}

export default AddOrder;
