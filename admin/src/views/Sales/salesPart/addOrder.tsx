import React from 'react';
import { Card, Input, Radio, List, Avatar, Progress, Button, Pagination } from 'antd';
import { goodsList } from '@api/goods';
import { getContact } from '@api/platform';
import styles from './listTable.module.scss';
import { Link } from 'react-router-dom';

interface State {
  list: any[];
}

class ListTable extends React.Component<{}, State> {
  state = {
    list: []
  };

  componentDidMount() {
    this.initData();
  }

  async initData() {}

  render() {
    return <div></div>;
  }
}

export default ListTable;
