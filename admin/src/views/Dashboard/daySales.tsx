import React from 'react';
import { Card } from 'antd';
import EchartsReact from '@components/Echarts';
import { globalTrendsOption } from '@assets/chartOption';
import FormatterLocale from '@components/FormatterLocale';
import { dailyDataAnalysis } from '@api/orders';
import emitter from '@utils/ev';

interface DaySalesState {
  option: any;
  eventEmitter: any;
}

class DaySales extends React.Component<{}, DaySalesState> {
  state = {
    eventEmitter: '',
    option: {
      title: {
        text: '日销售概况',
        subtext: '最近一月每日的销售和利润'
      },
      grid: {
        bottom: 20,
        left: 50,
        right: 30
      },
      xAxis: {
        type: 'category',
        data: ['1', '2', '3', '4', '5', '6', '7']
      },
      dataZoom: [
        {
          show: true,
          realtime: true,
          start: 65,
          end: 85
        },
        {
          type: 'inside',
          realtime: true,
          start: 65,
          end: 85
        }
      ],
      yAxis: {
        type: 'value'
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['利润', '销售额', '订单量']
      },

      toolbox: {
        show: true,
        feature: {
          dataZoom: {
            yAxisIndex: 'none'
          },
          dataView: { readOnly: false },
          magicType: { type: ['line', 'bar'] },
          restore: {},
          saveAsImage: {}
        }
      },
      series: [
        {
          name: '利润',
          data: [0, 0, 0, 0, 0, 0, 0],
          type: 'line',
          smooth: true
        },
        {
          name: '销售额',
          data: [0, 0, 0, 0, 0, 0, 0],
          type: 'line',
          smooth: true
        },
        {
          name: '订单量',
          data: [0, 0, 0, 0, 0, 0, 0],
          type: 'line',
          smooth: true
        }
      ]
    }
  };
  initData = (time: any) => {
    dailyDataAnalysis({ time: time }).then((res: any) => {
      console.log(res.data);
      if (res.data.code == 200) {
        let option = this.state.option;
        option.xAxis.data = res.data.data.time;
        option.series[0].data = res.data.data.salesProfit;
        option.series[1].data = res.data.data.salesVolume;
        option.series[2].data = res.data.data.orderQuantity;
        this.setState({
          option
        });
      }
    });
  };
  componentDidMount() {
    this.initData('');
    let eventEmitter = emitter.addListener('timeChange', time => {
      this.initData(time);
    });
    this.setState({
      eventEmitter
    });
  }
  componentWillUnmount() {
    emitter.removeListener(this.state.eventEmitter, res => {});
  }
  render() {
    let { option } = this.state;
    return (
      <Card
        hoverable
        bordered={false}
        className="fat-card global-trends"
        bodyStyle={{ overflow: 'hidden' }}
      >
        <EchartsReact style={{ height: '350px', width: '100%' }} option={option} />
      </Card>
    );
  }
}

export default DaySales;
