import React from 'react';
import { Form, Button, Input, Select } from 'antd';
import { observer } from 'mobx-react';
import FormatterLocale from '@components/FormatterLocale';
import StepFormStore from './formStore';
import styles from './form.module.scss';
import { FormComponentProps } from 'antd/lib/form';

const Step2: React.FC = () => {
  const { data, submitting, onSubmit, onPrev } = StepFormStore;
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 }
  };
  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0
      },
      sm: {
        span: 18,
        offset: 6
      }
    }
  };
  const StepForm = (props: FormComponentProps) => {
    const { getFieldDecorator } = props.form;
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      props.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          let useData: any = JSON.parse(JSON.stringify(data));
          let formData: any = Object.assign(useData, values);
          StepFormStore.setValue(formData);
          StepFormStore.onSubmit();
        }
      });
    };
    return (
      <Form {...formItemLayout} onSubmit={handleSubmit}>
        <Form.Item label={'销售价格'}>
          {getFieldDecorator('price', {
            initialValue: data.price,
            rules: [{ required: true, message: '请输入销售价格!' }]
          })(<Input placeholder="请输入销售价格" autoComplete="off" />)}
        </Form.Item>
        <Form.Item label="商品库存">
          {getFieldDecorator('stockNum', {
            initialValue: data.stockNum,
            rules: [{ required: true, message: '请输入商品库存！' }]
          })(<Input placeholder="请输入商品库存" autoComplete="off" />)}
        </Form.Item>

        <Form.Item label="计量单位">
          {getFieldDecorator('spec', {
            initialValue: data.spec || '盒',
            rules: [{ required: true, message: '请选择计量单位' }]
          })(
            <Select placeholder="请选择计量单位">
              <Select.Option value="盒">盒</Select.Option>
              <Select.Option value="瓶">瓶</Select.Option>
              <Select.Option value="支">支</Select.Option>
              <Select.Option value="板">板</Select.Option>
              <Select.Option value="颗">颗</Select.Option>
            </Select>
          )}
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit" loading={submitting}>
            <FormatterLocale id="button.submit" defaultMessage="提交" />
          </Button>
          <Button
            onClick={onPrev}
            style={{
              marginLeft: '8px'
            }}
          >
            <FormatterLocale id="button.prevStep" defaultMessage="上一步" />
          </Button>
        </Form.Item>
      </Form>
    );
  };
  const FormContainer = Form.create({ name: 'Step2' })(StepForm);
  return (
    <div className={styles.step}>
      <FormContainer />
    </div>
  );
};

export default observer(Step2);
