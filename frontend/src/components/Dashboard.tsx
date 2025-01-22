import React from 'react';
import { Card, Row, Col, Statistic } from 'antd';
import { DollarOutlined, ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import type { Stock } from '../types/stock';

interface DashboardProps {
  stocks: Stock[];
}

const Dashboard: React.FC<DashboardProps> = ({ stocks }) => {
  const totalValue = stocks.reduce((sum, stock) => 
    sum + (stock.currentPrice * stock.quantity), 0
  );

  const totalProfit = stocks.reduce((sum, stock) => sum + stock.profit, 0);

  const bestPerformer = stocks.reduce((best, stock) => 
    (!best || stock.profit > best.profit) ? stock : best
  , stocks[0]);

  return (
    <Row gutter={16}>
      <Col span={8}>
        <Card>
          <Statistic
            title="Portfolio Value"
            value={totalValue}
            precision={2}
            prefix={<DollarOutlined />}
          />
        </Card>
      </Col>
      <Col span={8}>
        <Card>
          <Statistic
            title="Total Profit/Loss"
            value={totalProfit}
            precision={2}
            valueStyle={{ color: totalProfit >= 0 ? '#3f8600' : '#cf1322' }}
            prefix={totalProfit >= 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
          />
        </Card>
      </Col>
      <Col span={8}>
        <Card>
          <Statistic
            title="Best Performer"
            value={bestPerformer?.name}
            suffix={`$${bestPerformer?.profit.toFixed(2)}`}
          />
        </Card>
      </Col>
    </Row>
  );
};

export default Dashboard;
