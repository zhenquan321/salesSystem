import React from 'react';
import PageWrapper from '@components/PageWrapper';
import FormatterLocale from '@components/FormatterLocale';
import { Icon, Card, List, Button, Pagination, Input, Avatar, Steps, Result } from 'antd';
import { goodsList } from '@api/goods';
import { replenishmentGoing } from '@api/replenishment';
import AddOrder from './part/addOrder';
import ReplenishmentGoodsList from './part/replenishmentGoodsList';
import Warehousing from './part/Warehousing';
import styles from './list.module.scss';
import { observable, observe } from 'mobx';
const Search = Input.Search;
const { Step } = Steps;
import { Link } from 'react-router-dom';

import replenishmentStore from './replenishmentStore';
import { observer } from 'mobx-react';
import { relative } from 'path';

interface CardListState {
  list: any[];
  meta: any;
  current: number;
  searchData: {
    keyword: string;
    page: number;
    pageSize: number;
  };
}

@observer
class CardList extends React.Component<{}, CardListState> {
  state = {
    list: [],
    searchData: {
      keyword: '',
      page: 1,
      pageSize: 12,
      type: 'replenishment'
    },
    current: 0,
    steps: [
      {
        id: 'form.stepTitle1',
        title: '添加补货商品'
        // component: React.lazy(() => import(/* webpackChunkName: "Step1" */ './Step1'))
      },
      {
        id: 'form.stepTitle2',
        title: '进行中的进货单'
        // component: React.lazy(() => import(/* webpackChunkName: "Step2" */ './Step2'))
      },
      {
        id: 'form.stepTitle3',
        title: '商品入库核实'
        // component: React.lazy(() => import(/* webpackChunkName: "Step3" */ './Step3'))
      },
      {
        id: 'form.stepTitle4',
        title: '完成入库'
        // component: React.lazy(() => import(/* webpackChunkName: "Step3" */ './Step3'))
      }
    ],
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
    //获取进行中的进货单
    replenishmentGoing().then((res: any) => {
      if (res.data.code == 200 && res.data.data && res.data.data.replenishment_goods) {
        replenishmentStore.setReplenishmentStatus(res.data.data.replenishment_status);
        replenishmentStore.setGoodsList(JSON.parse(res.data.data.replenishment_goods));
        replenishmentStore.setReplenishmentId(res.data.data.id);
      } else {
        replenishmentStore.setReplenishmentStatus(0);
        replenishmentStore.setGoodsList([]);
      }
    });

    //商品列表
    let {
      data: { data: _data }
    } = await goodsList(this.state.searchData);
    this.setState({
      list: _data.data,
      meta: _data.meta
    });
  }

  handleSearch = (value: string) => {
    let searchData = this.state.searchData;
    searchData.keyword = value;
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
  jsNow = (data: any) => {
    replenishmentStore.addGoods(data);
    replenishmentStore.settlementFun(true);
  };

  render() {
    const { list, meta, steps, current } = this.state;
    const { addGoods, goodsList, replenishmentStatus } = replenishmentStore;
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
      // <PageWrapper
      //   title={'销售商品页面'}
      //   subTitle={'点击立即结算，弹出订单结算页进行结算，或加入购物车，统一结算。'}
      //   extraContent={ExtraContent}
      //   // content={Content}
      // >
      <div>
        <Card bordered={false}>
          <Steps current={replenishmentStatus}>
            {steps.map(item => (
              <Step key={item.id} title={item.title} />
            ))}
          </Steps>
        </Card>
        {replenishmentStatus == 0 ? (
          <div style={{ paddingRight: '200px', paddingLeft: '5px', marginTop: '20px' }}>
            <AddOrder updataFun={this.initData.bind(this)} />
            <List
              rowKey="id"
              loading={!list.length}
              grid={{ gutter: 24, lg: 3, md: 2, sm: 1, xs: 1 }}
              dataSource={[...list]}
              renderItem={(item: any) => (
                <List.Item key={item.id} style={{ position: 'relative', overflow: 'hidden' }}>
                  {item.sort_num > 0 ? (
                    <div
                      style={{
                        backgroundColor: 'rgb(247, 138, 35)',
                        color: '#fff',
                        position: 'absolute',
                        height: '20px',
                        lineHeight: '20px',
                        fontSize: '14px',
                        transform: 'rotate(-45deg)',
                        zIndex: 100,
                        top: '18px',
                        width: '100px',
                        textAlign: 'center',
                        left: '-22px',
                        boxShadow: '0 0px 4px rgba(0, 0, 0,0.2)'
                      }}
                    >
                      建议补货
                    </div>
                  ) : (
                    ''
                  )}
                  <Card
                    hoverable
                    actions={[
                      <Button
                        type="link"
                        key={item.id + 3}
                        onClick={addGoods.bind(this, item)}
                        style={{
                          fontSize: '15px',
                          fontWeight: 'bold',
                          color: 'rgb(114, 46, 209)'
                        }}
                      >
                        加入进货单
                      </Button>
                    ]}
                  >
                    <Card.Meta
                      avatar={<Avatar src={item.image_file} shape="square" size={70} />}
                      title={
                        <Button
                          type="link"
                          style={{
                            fontWeight: 'bold',
                            padding: 0,
                            fontSize: '17px',
                            marginBottom: '5px',
                            color: '#555'
                          }}
                        >
                          {item.good_name}
                        </Button>
                      }
                      description={
                        <div className={styles.goodInfo}>
                          <div className={styles.goodInfoSales}>
                            <div className={styles.goodInfoSalesNum}>
                              进货成本价：
                              <span className={styles.goodInfoSalesNumNumer}>
                                ￥{item.original_price}
                              </span>
                            </div>
                            <div className={styles.goodInfoSalesNum}>
                              已售：
                              <span className={styles.goodInfoSalesNumNumer}>{item.sales_num}</span>
                              {item.spec}
                            </div>
                          </div>
                          <div className={styles.goodInfoSales} style={{ marginTop: 0 }}>
                            <div className={styles.goodInfoSalesNum}>
                              库存预警线：
                              <span className={styles.goodInfoSalesNumNumer}>
                                {item.replenishment_num}
                              </span>
                            </div>
                            <div className={styles.goodInfoSalesNum}>
                              剩余库存：
                              <span className={styles.goodInfoSalesNumNumer}>{item.stock_num}</span>
                              {item.spec}
                            </div>
                          </div>
                        </div>
                      }
                    />
                  </Card>
                </List.Item>
              )}
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
          </div>
        ) : (
          ''
        )}
        {replenishmentStatus == 1 ? <ReplenishmentGoodsList></ReplenishmentGoodsList> : ''}
        {replenishmentStatus == 2 ? <Warehousing></Warehousing> : ''}
        {replenishmentStatus == 3 ? (
          <Card className="fat-card" bordered={false} style={{ marginTop: '20px' }}>
            <Result status="success" title="操作成功" subTitle="商品库操作成功" />
            <div style={{ textAlign: 'center' }}>
              <Link to={'/form/goodsList'} replace>
                <Button type="primary">查看商品列表</Button>
              </Link>
            </div>
          </Card>
        ) : (
          ''
        )}
      </div>

      // </PageWrapper>
    );
  }
}

export default CardList;
