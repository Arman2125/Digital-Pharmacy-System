import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { 
  ShoppingCart, 
  Package, 
  Clock, 
  CheckCircle2, 
  Pill,
  TrendingUp,
  AlertCircle
} from 'lucide-react';

interface CustomerDashboardProps {
  onNavigate: (screen: string) => void;
}

export function CustomerDashboard({ onNavigate }: CustomerDashboardProps) {
  const stats = [
    { label: 'Active Orders', value: '3', icon: ShoppingCart, color: 'text-blue-600' },
    { label: 'Completed', value: '12', icon: CheckCircle2, color: 'text-green-600' },
    { label: 'Pending', value: '2', icon: Clock, color: 'text-yellow-600' },
    { label: 'Refills Due', value: '1', icon: Package, color: 'text-orange-600' },
  ];

  const recentOrders = [
    { id: 'ORD-1001', medicine: 'Amoxicillin 500mg', status: 'Out for Delivery', date: '2026-01-17' },
    { id: 'ORD-1002', medicine: 'Lisinopril 10mg', status: 'Packed', date: '2026-01-16' },
    { id: 'ORD-1003', medicine: 'Metformin 850mg', status: 'Approved', date: '2026-01-15' },
  ];

  const refillReminders = [
    { medicine: 'Atorvastatin 20mg', daysLeft: 3, quantity: 30 },
    { medicine: 'Omeprazole 40mg', daysLeft: 7, quantity: 30 },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Out for Delivery': return 'bg-blue-100 text-blue-800';
      case 'Packed': return 'bg-purple-100 text-purple-800';
      case 'Approved': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl mb-1">Welcome Back!</h2>
        <p className="text-gray-600">Manage your orders and prescriptions</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                  <p className="text-3xl mt-1">{stat.value}</p>
                </div>
                <stat.icon className={`w-10 h-10 ${stat.color}`} />
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <Button onClick={() => onNavigate('search')} className="h-auto py-4 flex flex-col gap-2">
              <Pill className="w-6 h-6" />
              Search Medicines
            </Button>
            <Button onClick={() => onNavigate('upload')} variant="outline" className="h-auto py-4 flex flex-col gap-2">
              <TrendingUp className="w-6 h-6" />
              Upload Prescription
            </Button>
            <Button onClick={() => onNavigate('tracking')} variant="outline" className="h-auto py-4 flex flex-col gap-2">
              <Package className="w-6 h-6" />
              Track Orders
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium">{order.id}</p>
                    <p className="text-sm text-gray-600">{order.medicine}</p>
                    <p className="text-xs text-gray-500 mt-1">{order.date}</p>
                  </div>
                  <Badge className={getStatusColor(order.status)}>
                    {order.status}
                  </Badge>
                </div>
              ))}
              <Button 
                variant="link" 
                className="w-full" 
                onClick={() => onNavigate('tracking')}
              >
                View All Orders →
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Refill Reminders */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-orange-600" />
              Refill Reminders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {refillReminders.map((item, idx) => (
                <div key={idx} className="p-3 border rounded-lg bg-orange-50 border-orange-200">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="font-medium">{item.medicine}</p>
                      <p className="text-sm text-gray-600">Quantity: {item.quantity} tablets</p>
                      <p className="text-sm text-orange-700 mt-1">
                        <Clock className="w-3 h-3 inline mr-1" />
                        {item.daysLeft} days remaining
                      </p>
                    </div>
                    <Button 
                      size="sm" 
                      onClick={() => onNavigate('refill')}
                    >
                      Refill
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
