import React from 'react';
import { Row, Col, Card } from 'antd';
import { inject, observer } from 'mobx-react';
import PageWrapper from '@components/PageWrapper';
import FormatterLocale from '@components/FormatterLocale';
import ListTable from './ListTable';
import styles from './listTable.module.scss';
import LayoutStore from '@store/layoutStore';
import { goodsAnalysis } from '@api/goods';
interface BasicInjected {
  layoutStore: LayoutStore;
}
interface basicListState {
  list: any;
}
class BasicList extends React.Component<{}, basicListState> {
  state = {
    list: []
  };

  async initData() {
    let data = await goodsAnalysis();
    if (data.data.code == 200) {
      this.setState({
        list: data.data.data.list
      });
    }
    console.log(data);
  }
  componentDidMount() {
    this.initData();
  }
  render() {
    const isMobile = false;
    const { list } = this.state;

    const RowInfo = () => (
      <Row gutter={24}>
        {list.map((col: any) => {
          return (
            <Col xl={6} sm={12} xs={12} key={col.title}>
              <Card bordered={false}>
                <p className={styles.colTitle}>{col.title}</p>
                <span className={styles.colNum}>{col.value}</span>
              </Card>
            </Col>
          );
        })}
      </Row>
    );

    const DontShow = () => (
      <Card style={{ marginTop: '24px' }} bordered={false}>
        <div style={{ textAlign: 'center' }}>不给你看</div>
      </Card>
    );

    return (
      // <PageWrapper title={""}>
      <div>
        <RowInfo />
        {isMobile ? <DontShow /> : <ListTable />}
      </div>
      // </PageWrapper>
    );
  }
}

export default inject('layoutStore')(observer(BasicList));
