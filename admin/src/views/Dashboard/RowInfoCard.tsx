import React from 'react';
import { Row, Col, Card, Icon } from 'antd';
import { CustomIconComponentProps } from 'antd/lib/icon';
import { BoxSvg, EmpolyeesSvg, OrdersSvg, SalesSvg } from '@components/SvgIcon';
import FormatterLocale from '@components/FormatterLocale';
import { goodsAnalysis } from '@api/goods';
import { ordersAnalysis } from '@api/orders';

interface InfoCardProps {
  icon: React.ComponentType<CustomIconComponentProps>;
  tips: string;
  title: string;
  num: string | number;
  tipIcon: string;
  index?: string | number;
}
interface RowInfoCardStage {
  details: InfoCardProps[];
}

class RowInfoCard extends React.Component<{}, RowInfoCardStage> {
  state: RowInfoCardStage = {
    details: [
      {
        icon: SalesSvg,
        tips: '所有商品营业',
        title: '营业额',
        num: '￥0',
        tipIcon: 'fund'
      },
      {
        icon: OrdersSvg,
        tips: '所有已售商品毛利',
        title: '毛利',
        num: '￥0',
        tipIcon: 'shake'
      },
      {
        icon: EmpolyeesSvg,
        tips: '所有成交订单',
        title: '订单量 ',
        num: '0',
        tipIcon: 'redo'
      },
      {
        icon: BoxSvg,
        tips: '剩余库存总额',
        title: '库存额',
        num: '￥0',
        tipIcon: 'exclamation-circle'
      }
    ]
  };

  componentDidMount() {
    let details = this.state.details;
    ordersAnalysis().then((res: any) => {
      let data = res.data.data;
      details[0].num = '￥' + data.salesVolume.value;
      details[1].num = '￥' + (data.salesVolume.value - data.originalVolume.value).toFixed(2);
      details[2].num = data.ordersAmount.value;
      this.setState({
        details: details
      });
    });
    goodsAnalysis().then((res: any) => {
      let data = res.data.data;
      details[3].num = '￥' + data.stockAllValue.value;
      this.setState({
        details: details
      });
    });
  }

  render() {
    const InfoCard = (props: InfoCardProps) => {
      const { icon, tips, title, num, tipIcon, index } = props;
      return (
        <Card className="info-card fat-card" bordered={false} hoverable>
          <div className="top">
            <Icon component={icon} />
            <div className="right-part">
              <p className="title">{title}</p>
              <h3 className="num">{num}</h3>
            </div>
          </div>
          <p className="mb-0 mt-3 text-muted">
            <Icon type={tipIcon} className="mr-2" />
            {tips}
          </p>
        </Card>
      );
    };
    return (
      <Row gutter={24} className="rowInfo-card">
        {this.state.details.map((dl, index) => {
          return (
            <Col
              xl={6}
              lg={12}
              md={12}
              sm={24}
              xs={24}
              key={index}
              style={{ marginBottom: '24px' }}
            >
              <InfoCard {...dl} index={index} />
            </Col>
          );
        })}
      </Row>
    );
  }
}

export default RowInfoCard;
