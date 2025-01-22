import React from 'react';
import { Table, Button, Space } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import type { Stock } from '../types/stock';

interface StockListProps {
  stocks: Stock[];
  onEdit: (stock: Stock) => void;
  onDelete: (id: number) => void;
}

const StockList: React.FC<StockListProps> = ({ stocks, onEdit, onDelete }) => {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Ticker',
      dataIndex: 'ticker',
      key: 'ticker',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Buy Price',
      dataIndex: 'buyPrice',
      key: 'buyPrice',
      render: (price: number) => `$${price.toFixed(2)}`,
    },
    {
      title: 'Current Price',
      dataIndex: 'currentPrice',
      key: 'currentPrice',
      render: (price: number) => `$${price.toFixed(2)}`,
    },
    {
      title: 'Profit/Loss',
      dataIndex: 'profit',
      key: 'profit',
      render: (profit: number) => (
        <span style={{ color: profit >= 0 ? 'green' : 'red' }}>
          ${profit.toFixed(2)}
        </span>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      render: (_: any, record: Stock) => (
        <Space>
          <Button 
            icon={<EditOutlined />} 
            onClick={() => onEdit(record)}
          />
          <Button 
            icon={<DeleteOutlined />} 
            danger 
            onClick={() => onDelete(record.id)}
          />
        </Space>
      ),
    },
  ];

  return (
    <Table 
      columns={columns} 
      dataSource={stocks} 
      rowKey="id"
      pagination={false}
    />
  );
};

export default StockList;
