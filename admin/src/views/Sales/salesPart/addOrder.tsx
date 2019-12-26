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
import { getContact } from '@api/platform';
import styles from '../list.module.scss';
import { Link } from 'react-router-dom';

interface State {
  list: any[];
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
  goodList: any[];
}

class AddOrder extends React.Component<Props, State> {
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
    },
    list: [
      {
        created_at: '2019-12-24',
        id: 6,
        good_name: '爱仕达无大无大大所大无',
        image_file: 'http://localhost:3000/uploadResources/1577196769611_WechatIMG62.jpeg',
        price: 12,
        original_price: 12,
        sales_num: 0,
        stock_num: 12,
        spec: '盒',
        sales_num_now: 1,
        dec:
          '爱我打算打算打算打算打打流口水都爱过四大皆空山豆根ASDO奥古斯丁OASGD偶啊施工队LaS阿苏好的oASisDAL D AWDAWDAWDASDAWWFAFQWA我打打女',
        updated_at: '2019-12-24T14:12:55.000Z',
        deleted_at: null
      }
    ]
  };

  componentWillReceiveProps(prevProps: any) {
    if (prevProps.goodList !== this.state.list) {
      this.setState({
        list: prevProps.goodList
      });
    }
  }

  componentDidMount() {
    this.setState({
      list: this.props.goodList
    });
    this.initData();
  }

  async initData() {}

  createOrders = () => {
    createOrders(this.state.orderInfo)
      .then((res: any) => {
        console.log(res);
        this.onClose();
        this.openNotification();
      })
      .catch((res: any) => {
        console.log(res);
      });
  };

  onChange(value: any) {}
  showDrawer = () => {
    this.setState({
      visible: true
    });
    this.allSalesFun();
  };
  onClose = () => {
    this.setState({
      visible: false
    });
  };
  allSalesFun = () => {
    let orderInfo = this.state.orderInfo;
    orderInfo.sales_amount = 0;
    orderInfo.orders_amount = 0;
    orderInfo.original_amount = 0;
    let list = this.state.list;
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
    let { list, orderInfo } = this.state;

    return (
      <div>
        <div className={styles.AddOrder}>
          <List
            itemLayout="horizontal"
            dataSource={list}
            renderItem={item => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar src={item.image_file} />}
                  title={<a className={styles.dsCss}>{item.good_name}</a>}
                  description={
                    <div>
                      数量：
                      <InputNumber
                        style={{ width: '50px' }}
                        size="small"
                        min={1}
                        max={100000}
                        value={item.sales_num_now}
                        onChange={this.onChange.bind(this)}
                      />
                      <Icon className={styles.deleteIcon} type="close-circle" />
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
              {' '}
              结算{' '}
            </Button>
          </div>
        </div>
        <Drawer
          title="订单结算"
          width={520}
          closable={false}
          onClose={this.onClose}
          visible={this.state.visible}
        >
          <div className="jsCard">
            <List
              itemLayout="horizontal"
              dataSource={list}
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
                        min={1}
                        max={100000}
                        value={item.sales_num_now}
                        onChange={this.onChange.bind(this)}
                      />
                      <Icon className={styles.deleteIcon} type="close-circle" />
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
              onClick={this.onClose}
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
