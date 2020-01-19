import React from 'react';
import PageWrapper from '@components/PageWrapper';
import FormatterLocale from '@components/FormatterLocale';
import { Card, Table, Button, Input, Divider, Pagination, Modal, notification, Icon } from 'antd';
import { updateReplenishment } from '@api/replenishment';
import styles from '../list.module.scss';
const { confirm } = Modal;
import replenishmentStore from '../replenishmentStore';

interface WarehousingState {
  olderList: any[];
  meta: any;
  searchData: {
    page: number;
    keyword: string;
  };
}

const Search = Input.Search;
class Warehousing extends React.Component<{}, WarehousingState> {
  status = ['正常', '维护', '已下线', '异常'];
  styles = ['progress', 'maintain', 'offline', 'error'];
  state = {
    olderList: [],
    searchData: {
      page: 0,
      keyword: ''
    },
    meta: {
      current_page: 1,
      per_page: 10,
      count: 5,
      total: 5,
      total_pages: 1
    }
  };

  componentDidMount() {}

  changeOrder = (type: number) => {
    replenishmentStore.setReplenishmentStatus(type);
  };

  updateReplenishmentNow = () => {
    let data = {
      id: replenishmentStore.replenishmentId,
      replenishment_status: 3,
      replenishment_goods: JSON.stringify(replenishmentStore.goodsList)
    };
    updateReplenishment(replenishmentStore.replenishmentId, data).then((res: any) => {
      if (res.data.code == 200) {
        notification.open({
          message: '商品入库成功',
          description: '已更新商品库存信息，如有疑问，可手动验证',
          icon: <Icon type="smile" style={{ color: 'green' }} />
        });
        this.changeOrder(3);
      }
    });
  };

  onChangeCbj = (item: any, e: any) => {
    let goods = JSON.parse(JSON.stringify(item));
    goods.original_price = e.target.value;
    replenishmentStore.updateGoods(goods);
  };
  onChangeJhsl = (item: any, e: any) => {
    let goods = JSON.parse(JSON.stringify(item));
    goods.replenishment_num_now = e.target.value;
    replenishmentStore.updateGoods(goods);
  };
  render() {
    let { goodsList } = replenishmentStore;
    const columns = [
      {
        title: '商品',
        dataIndex: 'good_name'
      },
      {
        title: '当前库存',
        key: 'stock_num',
        render: (item: any) => {
          return (
            <span>
              {item.stock_num}
              {item.spec}
            </span>
          );
        }
      },
      {
        title: '进货成本价(￥)',
        key: 'original_price',
        // dataIndex: 'original_price',
        render: (item: any) => {
          return (
            <Input
              style={{ width: '80px' }}
              size="small"
              defaultValue={item.original_price}
              onChange={this.onChangeCbj.bind(this, item)}
            />
          );
        }
      },
      {
        title: '数量',
        // dataIndex: 'replenishment_num_now',
        key: 'replenishment_num_now',
        render: (item: any) => {
          return (
            <span>
              <Input
                style={{ width: '80px', marginRight: '5px' }}
                size="small"
                defaultValue={item.replenishment_num_now}
                onChange={this.onChangeJhsl.bind(this, item)}
              />
              {item.spec}
            </span>
          );
        }
      }
    ];
    return (
      <Card className="fat-card" bordered={false} style={{ marginTop: '20px' }}>
        <Table
          className="no-head-border"
          bordered
          columns={columns}
          pagination={false}
          dataSource={goodsList}
        />
        <div style={{ textAlign: 'center', margin: '30px 0 10px' }}>
          <Button
            onClick={this.changeOrder.bind(this, 1)}
            style={{
              marginRight: '15px'
            }}
          >
            上一步
          </Button>
          <Button type="primary" onClick={this.updateReplenishmentNow.bind(this)}>
            确定入库
          </Button>
        </div>
      </Card>
    );
  }
}

export default Warehousing;
