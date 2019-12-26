import React from 'react';
import { Form, Button, Select, Input, Divider, Icon, Upload, message } from 'antd';
const { TextArea } = Input;
import { FormComponentProps } from 'antd/lib/form';
import FormatterLocale from '@components/FormatterLocale';
import StepFormStore from './formStore';
import styles from './form.module.scss';

const Step1: React.FC = () => {
  const { data } = StepFormStore;
  var imageFile = '';
  const StepForm = (props: FormComponentProps) => {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      props.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          values.imageFile = imageFile;
          console.log(imageFile, values);
          StepFormStore.setValue(values);
          StepFormStore.nextStep();
        }
      });
    };
    const { getFieldDecorator } = props.form;
    const formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 }
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 16,
          offset: 8
        }
      }
    };
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">上传图片</div>
      </div>
    );
    function getBase64(img: any, callback: any) {
      const reader = new FileReader();
      reader.addEventListener('load', () => callback(reader.result));
      reader.readAsDataURL(img);
    }
    function beforeUpload(file: any) {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
      }
      return isJpgOrPng && isLt2M;
    }

    // 上传图片到服务器
    function normFile(e: any) {
      if (Array.isArray(e)) {
        return e;
      }
      if (e.file && e.file.response) {
        console.log('Upload event:', e.file.response.filePathList[0]);
        imageFile = e.file.response.filePathList[0];
      }
      return e && e.fileList[0].thumbUrl;
    }

    return (
      <Form {...formItemLayout} onSubmit={handleSubmit}>
        <Form.Item label="商品名称">
          {getFieldDecorator('goodName', {
            initialValue: '',
            rules: [{ required: true, message: '请输入商品名称!' }]
          })(<Input placeholder="请输入商品名称" autoComplete="off" />)}
        </Form.Item>
        <Form.Item label="商品简介">
          {getFieldDecorator('dec', {
            initialValue: '',
            rules: [{ required: true, message: '请输入商品简介!' }]
          })(
            <TextArea
              autoSize={{ minRows: 3, maxRows: 6 }}
              placeholder="请输入商品简介"
              autoComplete="off"
            />
          )}
        </Form.Item>
        <Form.Item label="进货价格">
          {getFieldDecorator('originalPrice', {
            initialValue: '',
            rules: [{ required: true, message: '请输入进货价格！' }]
          })(<Input placeholder="请输入进货价格" autoComplete="off" />)}
        </Form.Item>
        {/* <Form.Item label="商品分类">
          {getFieldDecorator('category', {
            initialValue: '',
            rules: [{ required: true, message: '请选择商品分类！' }]
          })(
            <Select placeholder="">
              <Select.Option value="me">我呀</Select.Option>
              <Select.Option value="noOne">谁也不说</Select.Option>
            </Select>
          )}
        </Form.Item> */}

        <Form.Item label="上传封面" extra="">
          {getFieldDecorator('imageFile', {
            valuePropName: 'imageFile',
            getValueFromEvent: normFile
          })(
            <Upload
              name="logo"
              beforeUpload={beforeUpload}
              action={
                (window.location.hostname == 'p.fengzq.cn' ? 'http://106.12.28.41:3000' : '') +
                '/v1/uploadImg'
              }
              listType="picture"
            >
              <Button>
                <Icon type="upload" />
                <span>上传产品图片</span>
              </Button>
            </Upload>
          )}
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            <FormatterLocale id="button.nextStep" defaultMessage="下一步" />
          </Button>
        </Form.Item>
      </Form>
    );
  };

  const FormContainer = Form.create({ name: 'Step1' })(StepForm);
  return (
    <div>
      <div className={styles.step}>
        <FormContainer />
      </div>
    </div>
  );
};

export default Step1;
