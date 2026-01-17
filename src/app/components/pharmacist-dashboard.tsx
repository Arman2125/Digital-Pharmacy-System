import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { 
  Package, 
  AlertTriangle, 
  ShoppingCart, 
  CheckCircle2, 
  TrendingUp,
  TrendingDown,
  FileText,
  Users
} from 'lucide-react';

interface PharmacistDashboardProps {
  onNavigate: (screen: string) => void;
}

export function PharmacistDashboard({ onNavigate }: PharmacistDashboardProps) {
  const stats = [
    { label: 'Total Inventory', value: '1,247', icon: Package, color: 'text-blue-600', trend: '+5%' },
    { label: 'Low Stock Items', value: '23', icon: AlertTriangle, color: 'text-yellow-600', trend: '+3' },
    { label: 'Pending Orders', value: '18', icon: ShoppingCart, color: 'text-orange-600', trend: '-2' },
    { label: 'Pending Prescriptions', value: '7', icon: FileText, color: 'text-purple-600', trend: '+4' },
  ];

  const criticalStock = [
    { name: 'Amoxicillin 500mg', current: 15, minimum: 50, status: 'critical' },
    { name: 'Ibuprofen 400mg', current: 28, minimum: 100, status: 'critical' },
    { name: 'Omeprazole 40mg', current: 42, minimum: 75, status: 'low' },
  ];

  const recentOrders = [
    { id: 'ORD-1001', customer: 'John Doe', items: 2, status: 'Pending', time: '10 mins ago' },
    { id: 'ORD-1002', customer: 'Jane Smith', items: 1, status: 'Processing', time: '25 mins ago' },
    { id: 'ORD-1003', customer: 'Bob Johnson', items: 3, status: 'Pending', time: '1 hour ago' },
  ];

  const getStockColor = (status: string) => {
    switch (status) {
      case 'critical': return 'bg-red-100 text-red-800';
      case 'low': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-green-100 text-green-800';
    }
  };

  const getOrderStatusColor = (status: string) => {
    switch (status) {
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Processing': return 'bg-blue-100 text-blue-800';
      case 'Completed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl mb-1">Pharmacist Dashboard</h2>
        <p className="text-gray-600">Manage inventory, orders, and prescriptions</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                  <p className="text-3xl mt-1">{stat.value}</p>
                </div>
                <stat.icon className={`w-10 h-10 ${stat.color}`} />
              </div>
              <div className="flex items-center gap-1 text-sm">
                {stat.trend.startsWith('+') ? (
                  <TrendingUp className="w-4 h-4 text-green-600" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-red-600" />
                )}
                <span className={stat.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'}>
                  {stat.trend}
                </span>
                <span className="text-gray-500">vs last week</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <Button onClick={() => onNavigate('inventory')} className="h-auto py-4 flex flex-col gap-2">
              <Package className="w-6 h-6" />
              Manage Inventory
            </Button>
            <Button onClick={() => onNavigate('orders')} variant="outline" className="h-auto py-4 flex flex-col gap-2">
              <ShoppingCart className="w-6 h-6" />
              Process Orders
            </Button>
            <Button onClick={() => onNavigate('prescriptions')} variant="outline" className="h-auto py-4 flex flex-col gap-2">
              <FileText className="w-6 h-6" />
              Review Prescriptions
            </Button>
            <Button onClick={() => onNavigate('alerts')} variant="outline" className="h-auto py-4 flex flex-col gap-2">
              <AlertTriangle className="w-6 h-6" />
              Stock Alerts
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Critical Stock Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-600" />
              Critical & Low Stock
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {criticalStock.map((item, idx) => (
                <div key={idx} className="p-3 border rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-600 mt-1">
                        Current: {item.current} | Minimum: {item.minimum}
                      </p>
                    </div>
                    <Badge className={getStockColor(item.status)}>
                      {item.status}
                    </Badge>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        item.status === 'critical' ? 'bg-red-500' : 'bg-yellow-500'
                      }`}
                      style={{ width: `${(item.current / item.minimum) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
              <Button 
                variant="link" 
                className="w-full" 
                onClick={() => onNavigate('alerts')}
              >
                View All Alerts →
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium">{order.id}</p>
                    <p className="text-sm text-gray-600">{order.customer} • {order.items} items</p>
                    <p className="text-xs text-gray-500 mt-1">{order.time}</p>
                  </div>
                  <Badge className={getOrderStatusColor(order.status)}>
                    {order.status}
                  </Badge>
                </div>
              ))}
              <Button 
                variant="link" 
                className="w-full" 
                onClick={() => onNavigate('orders')}
              >
                View All Orders →
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Today's Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Today's Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <CheckCircle2 className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <p className="text-2xl font-medium">24</p>
              <p className="text-sm text-gray-600">Orders Completed</p>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <FileText className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <p className="text-2xl font-medium">12</p>
              <p className="text-sm text-gray-600">Prescriptions Verified</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <Users className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <p className="text-2xl font-medium">48</p>
              <p className="text-sm text-gray-600">Customers Served</p>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <Package className="w-8 h-8 text-orange-600 mx-auto mb-2" />
              <p className="text-2xl font-medium">8</p>
              <p className="text-sm text-gray-600">Stock Updates</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
