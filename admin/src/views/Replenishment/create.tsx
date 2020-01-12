import React from 'react';
import PageWrapper from '@components/PageWrapper';
import FormatterLocale from '@components/FormatterLocale';
import { Icon, Card, List, Button, Pagination, Input, Avatar, Steps } from 'antd';
import { goodsList } from '@api/goods';
import AddOrder from './part/addOrder';
import styles from './list.module.scss';
import { observable, observe } from 'mobx';
const Search = Input.Search;
const { Step } = Steps;

import replenishmentStore from './replenishmentStore';
import { observer } from 'mobx-react';

interface CardListState {
  list: any[];
  meta: any;
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
      pageSize: 12
    },
    current: 0,
    steps: [
      {
        id: 'form.stepTitle1',
        title: '选择进货商品'
        // component: React.lazy(() => import(/* webpackChunkName: "Step1" */ './Step1'))
      },
      {
        id: 'form.stepTitle2',
        title: '确认进货单'
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
    const { addGoods, goodsList } = replenishmentStore;

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
      //   subTitle={'点击立即立即结算，弹出订单结算页进行结算，或加入购物车，统一结算。'}
      //   extraContent={ExtraContent}
      //   // content={Content}
      // >
      <div>
        <Card>
          <Steps current={current}>
            {steps.map(item => (
              <Step key={item.id} title={item.title} />
            ))}
          </Steps>
        </Card>
      </div>

      // <div style={{ paddingRight: '200px', paddingLeft: '5px' }}>

      //   <AddOrder updataFun={this.initData.bind(this)} />
      //   <List
      //     rowKey="id"
      //     loading={!list.length}
      //     grid={{ gutter: 24, lg: 3, md: 2, sm: 1, xs: 1 }}
      //     dataSource={[...list]}
      //     renderItem={(item: any) => (
      //       // item ? (
      //       <List.Item key={item.id}>
      //         <Card
      //           hoverable
      //           actions={
      //             item.stock_num > 1
      //               ? [
      //                   <Button
      //                     type="link"
      //                     key={item.id + 1}
      //                     onClick={this.jsNow.bind(this, item)}
      //                     style={{
      //                       fontSize: '15px',
      //                       fontWeight: 'bold',
      //                       color: '#555'
      //                     }}
      //                   >
      //                     {/* <Icon type="setting" />  */}
      //                     立即结算
      //                   </Button>,
      //                   <Button
      //                     type="link"
      //                     key={item.id + 2}
      //                     onClick={addGoods.bind(this, item)}
      //                     style={{
      //                       fontSize: '15px',
      //                       fontWeight: 'bold',
      //                       color: '#722ed1'
      //                     }}
      //                   >
      //                     {/* <Icon type="edit" /> */}
      //                     加入订单
      //                   </Button>
      //                 ]
      //               : [
      //                   <Button
      //                     type="link"
      //                     key={item.id + 3}
      //                     style={{
      //                       fontSize: '15px',
      //                       fontWeight: 'bold',
      //                       color: 'red'
      //                     }}
      //                   >
      //                     已售完
      //                   </Button>
      //                 ]
      //           }
      //         >
      //           <Card.Meta
      //             avatar={<Avatar src={item.image_file} shape="square" size={70} />}
      //             title={
      //               <Button
      //                 type="link"
      //                 style={{
      //                   fontWeight: 'bold',
      //                   padding: 0,
      //                   fontSize: '17px',
      //                   marginBottom: '5px',
      //                   color: '#555'
      //                 }}
      //               >
      //                 {item.good_name}
      //               </Button>
      //             }
      //             description={
      //               <div className={styles.goodInfo}>
      //                 <div className={styles.goodInfoSales}>
      //                   <div className={styles.goodInfoSalesNum}>
      //                     售价：
      //                     <span className={styles.goodInfoSalesNumNumer}>￥{item.price}</span>
      //                   </div>
      //                   <div className={styles.goodInfoSalesNum}>
      //                     已售：
      //                     <span className={styles.goodInfoSalesNumNumer}>{item.sales_num}</span>
      //                     {item.spec}
      //                   </div>
      //                   <div className={styles.goodInfoSalesNum}>
      //                     库存：
      //                     <span className={styles.goodInfoSalesNumNumer}>{item.stock_num}</span>
      //                     {item.spec}
      //                   </div>
      //                 </div>
      //                 <div className={styles.description}>{item.dec}</div>
      //               </div>
      //             }
      //           />
      //         </Card>
      //       </List.Item>
      //     )}
      //   />
      //   <div className={styles.paginationStyle}>
      //     <Pagination
      //       showQuickJumper
      //       current={meta.current_page}
      //       total={meta.total}
      //       pageSize={meta.per_page}
      //       onChange={this.onChange.bind(this)}
      //     />
      //   </div>
      // </div>
      // // </PageWrapper>
    );
  }
}

export default CardList;
