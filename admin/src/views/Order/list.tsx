import React from 'react';
import PageWrapper from '@components/PageWrapper';
import FormatterLocale from '@components/FormatterLocale';
import { Card, Table, Button, Input, Divider, Pagination } from 'antd';
import { ordersList } from '@api/orders';
import styles from './list.module.scss';
import { format } from '@utils/tools';

interface BasicTableState {
  olderList: any[];
  meta: any;
  searchData: {
    page: number;
    keyword: string;
  };
}

const Search = Input.Search;
class BasicTable extends React.Component<{}, BasicTableState> {
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

  componentDidMount() {
    this.initData();
  }
  initData = () => {
    ordersList().then((res: any) => {
      console.log(res.data.data.data);
      const data = res.data.data.data;
      this.setState({
        olderList: data
      });
    });
  };
  handleSearch = (value: any) => {
    let searchData = this.state.searchData;
    searchData.keyword = value;
    searchData.page = 0;
    this.setState({
      searchData: searchData
    });
  };

  onChange(pageNumber: number) {
    let searchData = this.state.searchData;
    searchData.page = pageNumber;
    this.setState({
      searchData: searchData
    });
    this.initData();
  }
  render() {
    const Extra = (
      <div>
        <Search
          placeholder="搜索"
          onSearch={this.handleSearch}
          style={{ width: 200, marginLeft: '8px' }}
        />
      </div>
    );

    const columns = [
      {
        title: '订单编号',
        dataIndex: 'serial_number'
      },
      {
        title: '商品',
        key: 'sale_goods',
        render: (tag: any) => {
          return (
            <span>
              {JSON.parse(tag.sale_goods).map((item: any) => {
                return (
                  <div>
                    {item.good_name}{' '}
                    <span style={{ color: '#722ed1' }}>{'x' + item.sales_num_now}</span>
                  </div>
                );
              })}
            </span>
          );
        }
      },
      {
        title: '销售额(￥)',
        dataIndex: 'sales_amount'
      },
      {
        title: '成本(￥)',
        dataIndex: 'original_amount'
      },
      {
        title: '利润(￥)',
        key: 'sales_amount',
        render: (tag: any) => {
          return <span>{tag.sales_amount - tag.original_amount}</span>;
        }
      },
      {
        title: '下单时间',
        key: 'updated_at',
        render: (tag: any) => {
          return <span>{format(tag.updated_at, 'yyyy.MM.dd hh:mm:ss')}</span>;
        }
      },
      {
        title: '操作',
        key: 'id',
        render: () => {
          return (
            <span>
              {/* <Divider type="vertical" /> */}
              <Button type="link">删除</Button>
            </span>
          );
        }
      }
    ];
    const { olderList, meta } = this.state;
    return (
      <PageWrapper title={'订单列表'}>
        <Card className="fat-card" bordered={false} extra={Extra}>
          <Table
            className="no-head-border"
            bordered
            columns={columns}
            pagination={false}
            dataSource={olderList}
          />
          <div className={styles.paginationStyle}>
            <Pagination
              showQuickJumper
              defaultCurrent={meta.per_page}
              total={meta.total}
              onChange={this.onChange}
            />
          </div>
        </Card>
      </PageWrapper>
    );
  }
}

export default BasicTable;
