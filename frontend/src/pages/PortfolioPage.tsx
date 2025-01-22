import React, { useState, useEffect } from 'react';
import { Layout, Button, message, Form } from 'antd';
import Dashboard from '../components/Dashboard';
import StockList from '../components/StockList';
import StockForm from '../components/StockForm';
import type { Stock } from '../types/stock';
import { mockApiCalls } from '../services/mockData';  // Import mock service

const { Content } = Layout;

const PortfolioPage: React.FC = () => {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingStock, setEditingStock] = useState<Stock | undefined>();
  const [form] = Form.useForm();

  useEffect(() => {
    fetchStocks();
  }, []);

  const fetchStocks = async () => {
    try {
      // Use mock data instead of real API
      const data = await mockApiCalls.fetchStocks();
      setStocks(data.stocks);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      message.error('Failed to fetch stocks');
    }
  };

  const handleAddStock = () => {
    form.resetFields();
    setEditingStock(undefined);
    setIsModalVisible(true);
  };

  const handleEditStock = (stock: Stock) => {
    setEditingStock(stock);
    setIsModalVisible(true);
  };

  const handleDeleteStock = async (id: number) => {
    try {
      // Use mock delete
      await mockApiCalls.deleteStock();
      message.success('Stock deleted successfully');
      setStocks(stocks.filter(stock => stock.id !== id));
    } 
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    catch (error) {
      message.error('Failed to delete stock');
    }
  };

  const handleSubmit = async (values: Partial<Stock>) => {
    try {
      if (editingStock) {
        // Update existing stock
        const updatedStock = await mockApiCalls.updateStock(editingStock.id, values);
        setStocks(stocks.map(stock => 
          stock.id === editingStock.id ? { ...stock, ...updatedStock } : stock
        ));
      } else {
        // Add new stock
        const newStock = await mockApiCalls.addStock(values);
        setStocks([...stocks, newStock as Stock]);
      }

      message.success(`Stock ${editingStock ? 'updated' : 'added'} successfully`);
      setIsModalVisible(false);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      message.error(`Failed to ${editingStock ? 'update' : 'add'} stock`);
    }
  };

  const handleCancel = () => {
    setEditingStock(undefined);
    setIsModalVisible(false);
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
          onCancel={handleCancel}
          form={form}
        />
      </Content>
    </Layout>
  );
};

export default PortfolioPage;
