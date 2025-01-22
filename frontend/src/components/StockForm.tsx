import React from 'react';
import { Form, Input, InputNumber, Modal } from 'antd';
import type { Stock } from '../types/stock';

interface StockFormProps {
  visible: boolean;
  initialValues?: Partial<Stock>;
  onSubmit: (values: Partial<Stock>) => void;
  onCancel: () => void;
}

const StockForm: React.FC<StockFormProps> = ({
  visible,
  initialValues,
  onSubmit,
  onCancel,
}) => {
  const [form] = Form.useForm();

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      onSubmit(values);
      form.resetFields();
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  return (
    <Modal
      title={initialValues ? 'Edit Stock' : 'Add Stock'}
      open={visible}
      onOk={handleSubmit}
      onCancel={onCancel}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={initialValues}
      >
        <Form.Item
          name="name"
          label="Stock Name"
          rules={[{ required: true, message: 'Please enter stock name' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="ticker"
          label="Ticker Symbol"
          rules={[{ required: true, message: 'Please enter ticker symbol' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="quantity"
          label="Quantity"
          rules={[{ required: true, message: 'Please enter quantity' }]}
        >
          <InputNumber min={1} />
        </Form.Item>

        <Form.Item
          name="buyPrice"
          label="Buy Price"
          rules={[{ required: true, message: 'Please enter buy price' }]}
        >
          <InputNumber
            min={0}
            formatter={(value: number | undefined) => value ? `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',') : ''}
            parser={(value: string | undefined) => value ? Number(value.replace(/\$\s?|(,*)/g, '')) : 0}
          /> 
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default StockForm;
