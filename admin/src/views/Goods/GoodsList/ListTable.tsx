import React from 'react';
import { Card, Input, Radio, List, Avatar, Progress, Button, Pagination } from 'antd';
import { goodsList } from '@api/goods';
import { getContact } from '@api/platform';
import styles from './listTable.module.scss';
import { Link } from 'react-router-dom';

const Search = Input.Search;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

interface ListTableState {
  list: any[];
  meta: any;
  searchData: {
    keyword: string;
    page: number;
  };
}

class ListTable extends React.Component<{}, ListTableState> {
  state = {
    list: [],
    searchData: {
      keyword: '',
      page: 1
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

  async initData() {
    let {
      data: { data: _data }
    } = await goodsList(this.state.searchData);

    this.setState({
      list: _data.data,
      meta: _data.meta
    });
  }

  handleSearch = (value: string) => {
    console.log(value);
    let searchData = this.state.searchData;
    searchData.keyword = value;
    this.setState({
      searchData: searchData
    });
    this.initData();
  };

  handleChange = (e: any) => {
    let eventType = e.target.value;
    if (eventType == 'b') {
    }
  };

  onChange = (pageNumber: number) => {
    let searchData = this.state.searchData;
    searchData.page = pageNumber;
    this.setState({
      searchData: searchData
    });
    this.initData();
  };
  render() {
    const { list, meta } = this.state;
    console.log(this.state.list);

    const Extra = (
      <div className={styles.Extra}>
        <Link className={styles.addBtn} to={'/form/stepForm'} replace>
          <Button type="primary" value="b">
            新增商品
          </Button>
        </Link>
        <Search
          className={styles.SearchBtn}
          placeholder="搜索商品列表"
          enterButton="搜索"
          onSearch={this.handleSearch}
          style={{ width: 200, marginLeft: '8px' }}
        />
      </div>
    );

    const ListContent = ({ data }: { data: any }) => (
      <div className={styles.content}>
        <div>
          <span>库存 </span>
          <p className={styles.pText}>{data.stock_num || 0}</p>
        </div>
        <div className={styles.handleTime}>
          <span>销量</span>
          <p className={styles.pText}>{data.sales_num || 0}</p>
        </div>
        <div className={styles.handleTime}>
          <span>售价</span>
          <p className={styles.pText}>￥{data.price || 0.0}</p>
        </div>
        <div className={styles.handleTime}>
          <span>进货价</span>
          <p className={styles.pText}>￥{data.original_price || 0.0}</p>
        </div>
      </div>
    );

    return (
      <div>
        <Card
          bordered={false}
          style={{ marginTop: '24px' }}
          className="fat-card"
          // extra={Extra}
          title=""
        >
          {Extra}

          <List
            rowKey="id"
            loading={!list.length}
            dataSource={list}
            renderItem={(item: any) => (
              <List.Item
                actions={[
                  <Button key="first" type="link">
                    编辑
                  </Button>,
                  <Button key="second" type="link">
                    更多操作
                  </Button>
                ]}
              >
                <List.Item.Meta
                  avatar={<Avatar src={item.image_file} shape="square" size={64} />}
                  title={
                    <Button type="link" style={{ padding: 0, height: '24px', fontWeight: 'bold' }}>
                      {item.good_name}
                    </Button>
                  }
                  description={<div className={styles.detail}>{item.dec}</div>}
                />
                <ListContent data={item} />
              </List.Item>
            )}
          />
          <div className={styles.paginationStyle}>
            <Pagination
              showQuickJumper
              current={meta.current_page}
              total={meta.total}
              pageSize={meta.per_page}
              onChange={this.onChange}
            />
          </div>
        </Card>
      </div>
    );
  }
}

export default ListTable;
