import React, { useState, useEffect } from 'react';
import { Layout, Button, message } from 'antd';
import Dashboard from '../components/Dashboard';
import StockList from '../components/StockList';
import StockForm from '../components/StockForm';
import type { Stock } from '../types/stock';

const { Content } = Layout;

const PortfolioPage: React.FC = () => {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingStock, setEditingStock] = useState<Stock | undefined>();

  useEffect(() => {
    fetchStocks();
  }, []);

  const fetchStocks = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/stocks');
      const data = await response.json();
      setStocks(data.stocks);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      message.error('Failed to fetch stocks');
    }
  };

  const handleAddStock = () => {
    setEditingStock(undefined);
    setIsModalVisible(true);
  };

  const handleEditStock = (stock: Stock) => {
    setEditingStock(stock);
    setIsModalVisible(true);
  };

  const handleDeleteStock = async (id: number) => {
    try {
      await fetch(`http://localhost:5000/api/stocks/${id}`, {
        method: 'DELETE',
      });
      message.success('Stock deleted successfully');
      fetchStocks();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      message.error('Failed to delete stock');
    }
  };

  const handleSubmit = async (values: Partial<Stock>) => {
    try {
      const url = editingStock
        ? `http://localhost:5000/api/stocks/${editingStock.id}`
        : 'http://localhost:5000/api/stocks';
      
      const method = editingStock ? 'PUT' : 'POST';
      
      await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      message.success(`Stock ${editingStock ? 'updated' : 'added'} successfully`);
      setIsModalVisible(false);
      fetchStocks();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      message.error(`Failed to ${editingStock ? 'update' : 'add'} stock`);
    }
  };

  return (
    <Layout>
      <Content style={{ padding: '24px' }}>
        <Dashboard stocks={stocks} />
        
        <div style={{ marginTop: '24px', marginBottom: '24px' }}>
          <Button type="primary" onClick={handleAddStock}>
            Add Stock
          </Button>
        </div>

        <StockList
          stocks={stocks}
          onEdit={handleEditStock}
          onDelete={handleDeleteStock}
        />

        <StockForm
          visible={isModalVisible}
          initialValues={editingStock}
          onSubmit={handleSubmit}
          onCancel={() => setIsModalVisible(false)}
        />
      </Content>
    </Layout>
  );
};

export default PortfolioPage;
