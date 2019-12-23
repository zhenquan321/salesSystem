import React from 'react';
import ReactDOM from 'react-dom';
import zhCN from 'antd/es/locale/zh_CN';
import { ConfigProvider } from 'antd';
import { Provider } from 'mobx-react';
import RenderRoutes from '@components/RenderRoutes';
import { Store } from '@store/index';
import '@styles/index.scss';

ReactDOM.render(
  <Provider {...Store}>
    <ConfigProvider locale={zhCN}>
      <RenderRoutes />
    </ConfigProvider>
  </Provider>,
  document.getElementById('root')
);
