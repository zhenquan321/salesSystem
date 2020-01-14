import React from 'react';
import { Button, Result } from 'antd';
import FormatterLocale from '@components/FormatterLocale';
import StepFormStore from './formStore';
import styles from './form.module.scss';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';

const Step3: React.FC = () => {
  const { initStep } = StepFormStore;
  return (
    <div className={styles.step}>
      <Result status="success" title="操作成功" subTitle="商品库操作成功" />,
      <div className={styles.buttonGroup}>
        <Link to={'/form/goodsList'} replace>
          <Button
            style={{
              marginRight: '8px'
            }}
          >
            <FormatterLocale id="step3.checkList" defaultMessage="查看商品列表" />
          </Button>
        </Link>
        <Button type="primary" onClick={initStep}>
          添加商品
        </Button>
      </div>
    </div>
  );
};

export default Step3;
