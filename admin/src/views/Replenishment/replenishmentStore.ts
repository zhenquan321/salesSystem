import { observable, configure, action } from 'mobx';
import React from 'react';
import { createOrders } from '@api/orders';
import { notification } from 'antd';

configure({ enforceActions: 'always' });

class ReplenishmentStore {
  @observable goodsList: any[] = [];
  @observable settlementNow: boolean = false;
  @observable replenishmentStatus: number = 0;
  constructor() {}

  @action setReplenishmentStatus = (type: number) => {
    this.replenishmentStatus = type;
  };
  @action setGoodsList = (data: any) => {
    this.goodsList = data;
  };
  @action settlementFun = (type: boolean) => {
    this.settlementNow = type;
  };
  @action addGoods = (good: any): void => {
    good.replenishment_num_now = good.replenishment_num * 2 - good.stock_num;
    let goodList: any[] = JSON.parse(JSON.stringify(this.goodsList));
    let included = false;
    for (let i = 0; i < goodList.length; i++) {
      if (good.id == goodList[i].id) {
        goodList[i].replenishment_num_now = goodList[i].replenishment_num_now + 1;
        included = true;
      }
    }
    if (!included) {
      goodList.push(good);
    }
    this.goodsList = goodList;
  };
  @action updateGoods = (good: any): void => {
    let goodList: any[] = JSON.parse(JSON.stringify(this.goodsList));
    for (let i = 0; i < goodList.length; i++) {
      if (good.id == goodList[i].id) {
        goodList[i] = good;
      }
    }
    this.goodsList = goodList;
  };
  @action delGoods = (good: any, type?: string): void => {
    let goodList: any[] = JSON.parse(JSON.stringify(this.goodsList));
    for (let i = 0; i < goodList.length; i++) {
      if (good.id == goodList[i].id) {
        if (!(type && type == 'all') && goodList[i].replenishment_num_now > 1) {
          goodList[i].replenishment_num_now--;
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
