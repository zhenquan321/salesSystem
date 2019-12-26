import { observable, configure, action } from 'mobx';
import React from 'react';
import { createGoods } from '@api/goods';

configure({ enforceActions: 'always' });

interface StepObj {
  id: string;
  title: string;
  component: any;
}

interface StepData {
  goodName: string;
  imageFile: string;
  price: number;
  originalPrice: number;
  stockNum: number;
  spec: string;
  dec: string;
}

class SalesStore {
  @observable data: StepData = {
    goodName: '',
    imageFile: '',
    price: 0,
    originalPrice: 0,
    stockNum: 0,
    spec: '',
    dec: ''
  };
  steps: Array<StepObj>;

  constructor() {
    this.steps = [];
  }

  @action onSubmit = (): void => {
    let goodsData = JSON.parse(JSON.stringify(this.data));
    createGoods(goodsData)
      .then((res: any) => {
        console.log(res.data);
        const { code, data } = res.data;
        if (code === 200) {
        }
      })
      .catch(() => {});
  };
}

const salesStore = new SalesStore();

export default salesStore;
