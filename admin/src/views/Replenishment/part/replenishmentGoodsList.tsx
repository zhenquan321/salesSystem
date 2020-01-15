import React from 'react';
import PageWrapper from '@components/PageWrapper';
import FormatterLocale from '@components/FormatterLocale';
import { Card, Table, Button, Input, Divider, Pagination, Modal, notification, Icon } from 'antd';
import { ordersList, deleteOrders } from '@api/orders';
import styles from '../list.module.scss';
import { format, exportExcel } from '@utils/tools';
const { confirm } = Modal;
import replenishmentStore from '../replenishmentStore';

interface ReplenishmentGoodsListState {
  olderList: any[];
  meta: any;
  searchData: {
    page: number;
    keyword: string;
  };
}

const Search = Input.Search;
class ReplenishmentGoodsList extends React.Component<{}, ReplenishmentGoodsListState> {
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

  exportExcelFun = () => {
    const header: any = [
      { key: 'good_name', title: '商品' },
      { key: 'original_price', title: '进货成本价' },
      { key: 'replenishment_num_now', title: '数量' }
    ];
    let data: any = JSON.parse(JSON.stringify(replenishmentStore.goodsList));
    exportExcel(header, data, '补货清单.xlsx');
  };

  render() {
    let { goodsList } = replenishmentStore;
    const columns = [
      {
        title: '商品',
        dataIndex: 'good_name'
      },
      {
        title: '进货成本价',
        dataIndex: 'original_price'
      },
      {
        title: '数量',
        dataIndex: 'replenishment_num_now'
      }
    ];
    return (
      <Card
        className="fat-card"
        bordered={false}
        style={{ marginTop: '20px' }}
        extra={
          <Button type="primary" onClick={this.exportExcelFun}>
            导出补货单
          </Button>
        }
      >
        <Table
          className="no-head-border"
          bordered
          columns={columns}
          pagination={false}
          dataSource={goodsList}
        />
        <Button
          onClick={this.changeOrder.bind(this, 0)}
          style={{
            marginRight: '8px'
          }}
        >
          修改进货单
        </Button>
        <Button type="primary" onClick={this.changeOrder.bind(this, 2)}>
          商品入库
        </Button>
      </Card>
    );
  }
}

export default ReplenishmentGoodsList;
