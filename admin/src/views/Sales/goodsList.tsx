import React from 'react';
import PageWrapper from '@components/PageWrapper';
import FormatterLocale from '@components/FormatterLocale';
import { Icon, Card, List, Button, Pagination, Input, Avatar } from 'antd';
import { goodsList } from '@api/goods';
import styles from './list.module.scss';
const Search = Input.Search;

interface CardListState {
  list: any[];
  meta: any;
  searchData: {
    keyword: string;
    page: number;
  };
}

class CardList extends React.Component<{}, CardListState> {
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

    const ExtraContent = (
      <div className={styles.extraContent}>
        <img alt="" src={require('@assets/image/cardlist.png')} />
      </div>
    );

    const Content = (
      <div className={styles.content}>
        <Button type="link">
          <Icon type="thunderbolt" />
          快速启动
        </Button>
        <Button type="link">
          <Icon type="info-circle" />
          产品简介
        </Button>
      </div>
    );

    return (
      <PageWrapper
        title={'销售商品页面'}
        subTitle={'点击立即立即结算，弹出订单结算页进行结算，或加入购物车，统一结算。'}
        extraContent={ExtraContent}
        // content={Content}
      >
        <div className={styles.SearchBtn}>
          <Search
            placeholder="搜索商品列表"
            enterButton="搜索"
            onSearch={this.handleSearch}
            style={{ width: 300, float: 'right', marginLeft: '8px' }}
          />
        </div>

        <List
          rowKey="id"
          loading={!list.length}
          grid={{ gutter: 24, lg: 3, md: 2, sm: 1, xs: 1 }}
          dataSource={[...list]}
          renderItem={
            (item: any) => (
              // item ? (
              <List.Item key={item.id}>
                <Card
                  hoverable
                  actions={[
                    <Button type="link" key={item.id + 1}>
                      <Icon type="setting" /> 立即结算
                    </Button>,
                    <Button type="link" key={item.id + 2}>
                      <Icon type="edit" /> 加入订单
                    </Button>
                  ]}
                >
                  <Card.Meta
                    avatar={<Avatar src={item.image_file} size={60} />}
                    title={
                      <Button
                        type="link"
                        style={{
                          fontWeight: 'bold'
                        }}
                      >
                        {item.good_name}
                      </Button>
                    }
                    description={
                      <div className={styles.goodInfo}>
                        <div className={styles.goodInfoSales}>
                          <div className={styles.goodInfoSalesNum}>
                            {' '}
                            售价：
                            <span className={styles.goodInfoSalesNumNumer}>￥{item.price}</span>
                          </div>
                          <div className={styles.goodInfoSalesNum}>
                            {' '}
                            已售：
                            <span className={styles.goodInfoSalesNumNumer}>{item.sales_num}</span>
                            {item.spec}
                          </div>
                          <div className={styles.goodInfoSalesNum}>
                            {' '}
                            库存：
                            <span className={styles.goodInfoSalesNumNumer}>{item.stock_num}</span>
                            {item.spec}
                          </div>
                        </div>
                        <div className={styles.description}>{item.dec}</div>
                      </div>
                    }
                  />
                </Card>
              </List.Item>
            )
            // ) : (
            //   <List.Item>
            //     <Button type="dashed" className={styles.createButton}>
            //       <Icon type="plus" /> 新建
            //     </Button>
            //   </List.Item>
            // )
          }
        />
        <div className={styles.paginationStyle}>
          <Pagination
            showQuickJumper
            defaultCurrent={meta.per_page}
            total={meta.total}
            onChange={this.onChange}
          />
        </div>
      </PageWrapper>
    );
  }
}

export default CardList;
