import React from 'react';
import { Row, Col, Card } from 'antd';
import { inject, observer } from 'mobx-react';
import PageWrapper from '@components/PageWrapper';
import FormatterLocale from '@components/FormatterLocale';
import ListTable from './ListTable';
import styles from './listTable.module.scss';
import LayoutStore from '@store/layoutStore';

interface BasicInjected {
  layoutStore: LayoutStore;
}

const BasicList: React.FC<BasicInjected> = props => {
  const list = [
    {
      title: '商品总品类',
      num: '2113'
    },
    {
      title: '商品总库存',
      num: '1231'
    },
    {
      title: '商品库存总值',
      num: '13222'
    }
  ];
  const RowInfo = () => (
    <Row gutter={24}>
      {list.map(col => {
        return (
          <Col xl={8} sm={24} xs={24} key={col.title}>
            <Card bordered={false}>
              <p className={styles.colTitle}>{col.title}</p>
              <span className={styles.colNum}>{col.num}</span>
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

  const { isMobile } = props.layoutStore;
  return (
    <PageWrapper title={<FormatterLocale id="basicList.title" />}>
      <RowInfo />
      {isMobile ? <DontShow /> : <ListTable />}
    </PageWrapper>
  );
};

export default inject('layoutStore')(observer(BasicList));
