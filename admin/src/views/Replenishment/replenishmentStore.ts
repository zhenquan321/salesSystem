import { observable, configure, action } from 'mobx';
import React from 'react';
import { createOrders } from '@api/orders';
import { notification } from 'antd';

configure({ enforceActions: 'always' });

class ReplenishmentStore {
  @observable goodsList: any[] = [];
  @observable settlementNow: boolean = false;
  constructor() {}

  @action settlementFun = (type: boolean) => {
    this.settlementNow = type;
  };
  @action addGoods = (good: any): void => {
    good.sales_num_now = 1;
    let goodList: any[] = JSON.parse(JSON.stringify(this.goodsList));
    let included = false;
    for (let i = 0; i < goodList.length; i++) {
      if (good.id == goodList[i].id) {
        if (goodList[i].sales_num_now >= goodList[i].stock_num) {
          notification.error({
            message: '库存不足',
            duration: 5,
            description: `库存仅剩余${goodList[i].stock_num}${goodList[i].spec}`
          });
        } else {
          goodList[i].sales_num_now = goodList[i].sales_num_now + 1;
        }
        included = true;
      }
    }

    if (!included) {
      goodList.push(good);
    }
    this.goodsList = goodList;
  };
  @action delGoods = (good: any, type?: string): void => {
    let goodList: any[] = JSON.parse(JSON.stringify(this.goodsList));
    for (let i = 0; i < goodList.length; i++) {
      if (good.id == goodList[i].id) {
        if (!(type && type == 'all') && goodList[i].sales_num_now > 1) {
          goodList[i].sales_num_now--;
        } else {
          goodList.splice(i, 1);
        }
      }
    }
    this.goodsList = goodList;
  };
  @action clearGoods = (): void => {
    this.goodsList = [];
  };
}

const replenishmentStore = new ReplenishmentStore();

export default replenishmentStore;
