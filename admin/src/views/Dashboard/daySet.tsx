import React from 'react';
import { Card } from 'antd';
import EchartsReact from '@components/Echarts';
import { globalTrendsOption } from '@assets/chartOption';
import FormatterLocale from '@components/FormatterLocale';
import { dailyDataAnalysis } from '@api/orders';
import { DatePicker } from 'antd';
const { RangePicker } = DatePicker;
import moment from 'moment';
import emitter from '@utils/ev';
interface DaySetState {}

class DaySet extends React.Component<{}, DaySetState> {
  state = {};
  initData = () => {};
  onChange(dates: any, dateStrings: any) {
    console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
    if (dateStrings[0]) {
      emitter.emit('timeChange', [dateStrings[0], dateStrings[1]]);
    } else {
      emitter.emit('timeChange', '');
    }
  }
  componentDidMount() {
    this.initData();
  }
  render() {
    return (
      <div className="SearchBtn">
        <div className="headerTitle">选择时间分析</div>
        <RangePicker
          style={{ float: 'right' }}
          ranges={{
            Today: [moment(), moment()],
            'This Month': [moment().startOf('month'), moment().endOf('month')]
          }}
          onChange={this.onChange.bind(this)}
        />
      </div>
    );
  }
}

export default DaySet;
