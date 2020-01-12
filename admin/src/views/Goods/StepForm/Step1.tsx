import React from 'react';
import { Form, Button, Select, Input, Divider, Icon, Upload, message } from 'antd';
const { TextArea } = Input;
import { FormComponentProps } from 'antd/lib/form';
import FormatterLocale from '@components/FormatterLocale';
import StepFormStore from './formStore';
import styles from './form.module.scss';
import { observer } from 'mobx-react';

const Step1: React.FC = () => {
  const { data } = StepFormStore;
  var imageFile = '';
  const StepForm = (props: FormComponentProps) => {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      props.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          let useDate = JSON.parse(JSON.stringify(data));
          values.imageFile = imageFile ? imageFile : useDate.imageFile;
          let formData: any = Object.assign(useDate, values);
          StepFormStore.setValue(formData);
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

    let fileList: any = data.imageFile
      ? [
          {
            uid: '-1',
            name: data.imageFile,
            status: 'done',
            url: data.imageFile,
            thumbUrl: data.imageFile
          }
        ]
      : [];

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
            initialValue: data.goodName,
            rules: [{ required: true, message: '请输入商品名称!' }]
          })(<Input placeholder="请输入商品名称" autoComplete="off" />)}
        </Form.Item>
        <Form.Item label="商品简介">
          {getFieldDecorator('dec', {
            initialValue: data.dec,
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
            initialValue: data.originalPrice,
            rules: [{ required: true, message: '请输入进货价格！' }]
          })(
            <Input
              placeholder="请输入进货价格"
              disabled={data.id ? true : false}
              autoComplete="off"
            />
          )}
        </Form.Item>
        <Form.Item label="上传封面" extra="">
          {getFieldDecorator('imageFile', {
            valuePropName: 'imageFile',
            initialValue: data.imageFile,
            getValueFromEvent: normFile
          })(
            <Upload
              beforeUpload={beforeUpload}
              action={'/api/v1/uploadImg'}
              listType="picture"
              defaultFileList={fileList}
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

export default observer(Step1);
