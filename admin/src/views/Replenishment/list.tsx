import React from 'react';
import PageWrapper from '@components/PageWrapper';
import FormatterLocale from '@components/FormatterLocale';
import { Card, Table, Button, Input, Divider, Pagination, Modal, notification, Icon } from 'antd';
import { replenishmentList } from '@api/replenishment';
import styles from './list.module.scss';
import { format } from '@utils/tools';
const { confirm } = Modal;

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
    replenishmentList(this.state.searchData).then((res: any) => {
      console.log(res.data.data.data);
      const data = res.data.data.data;
      this.setState({
        olderList: data,
        meta: res.data.data.meta
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
    this.initData();
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
          onSearch={this.handleSearch.bind(this)}
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
              {JSON.parse(tag.replenishment_goods).map((item: any) => {
                return (
                  <div key={item.id}>
                    {item.good_name}{' '}
                    <span style={{ color: 'green' }}>{'x' + item.replenishment_num_now}</span>
                    {item.spec}
                  </div>
                );
              })}
            </span>
          );
        }
      },
      {
        title: '进货价(￥)',
        key: 'original_price',
        render: (tag: any) => {
          return (
            <span>
              {JSON.parse(tag.replenishment_goods).map((item: any) => {
                return (
                  <div key={item.id}>
                    {item.good_name}{' '}
                    <span style={{ color: 'green' }}>-{'￥' + item.original_price}</span>
                  </div>
                );
              })}
            </span>
          );
        }
      },
      {
        title: '下单时间',
        key: 'updated_at',
        render: (tag: any) => {
          return <span>{format(tag.updated_at, 'yyyy.MM.dd hh:mm:ss')}</span>;
        }
      }
    ];
    const { olderList, meta } = this.state;
    return (
      <PageWrapper title={'补货单列表'}>
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
              current={meta.current_page}
              total={meta.total}
              pageSize={meta.per_page}
              onChange={this.onChange.bind(this)}
            />
          </div>
        </Card>
      </PageWrapper>
    );
  }
}

export default BasicTable;
