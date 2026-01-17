import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Button } from '@/app/components/ui/button';
import { 
  Package, 
  CheckCircle2, 
  Clock, 
  Truck, 
  MapPin,
  Phone,
  Mail
} from 'lucide-react';

const orders = [
  {
    id: 'ORD-1001',
    date: '2026-01-17',
    items: [
      { name: 'Amoxicillin 500mg', quantity: 30 },
      { name: 'Vitamin D3', quantity: 60 },
    ],
    total: 45.98,
    status: 'Out for Delivery',
    currentStep: 3,
    estimatedDelivery: '2026-01-17 (Today, 5:00 PM)',
    trackingSteps: [
      { label: 'Placed', date: '2026-01-17 09:00 AM', completed: true },
      { label: 'Approved', date: '2026-01-17 10:30 AM', completed: true },
      { label: 'Packed', date: '2026-01-17 12:00 PM', completed: true },
      { label: 'Out for Delivery', date: '2026-01-17 02:00 PM', completed: true },
      { label: 'Delivered', date: '', completed: false },
    ],
    deliveryPartner: {
      name: 'John Delivery',
      phone: '+1 (555) 123-4567',
    },
  },
  {
    id: 'ORD-1002',
    date: '2026-01-16',
    items: [
      { name: 'Lisinopril 10mg', quantity: 30 },
    ],
    total: 8.99,
    status: 'Packed',
    currentStep: 2,
    estimatedDelivery: '2026-01-18',
    trackingSteps: [
      { label: 'Placed', date: '2026-01-16 02:30 PM', completed: true },
      { label: 'Approved', date: '2026-01-16 04:00 PM', completed: true },
      { label: 'Packed', date: '2026-01-17 09:00 AM', completed: true },
      { label: 'Out for Delivery', date: '', completed: false },
      { label: 'Delivered', date: '', completed: false },
    ],
  },
  {
    id: 'ORD-1003',
    date: '2026-01-15',
    items: [
      { name: 'Metformin 850mg', quantity: 60 },
    ],
    total: 15.99,
    status: 'Approved',
    currentStep: 1,
    estimatedDelivery: '2026-01-19',
    trackingSteps: [
      { label: 'Placed', date: '2026-01-15 11:00 AM', completed: true },
      { label: 'Approved', date: '2026-01-15 03:00 PM', completed: true },
      { label: 'Packed', date: '', completed: false },
      { label: 'Out for Delivery', date: '', completed: false },
      { label: 'Delivered', date: '', completed: false },
    ],
  },
];

export function OrderTracking() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered': return 'bg-green-100 text-green-800';
      case 'Out for Delivery': return 'bg-blue-100 text-blue-800';
      case 'Packed': return 'bg-purple-100 text-purple-800';
      case 'Approved': return 'bg-cyan-100 text-cyan-800';
      case 'Placed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl mb-1">Order Tracking</h2>
        <p className="text-gray-600">Track your medication deliveries in real-time</p>
      </div>

      {orders.map((order) => (
        <Card key={order.id}>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Package className="w-5 h-5" />
                  {order.id}
                </CardTitle>
                <p className="text-sm text-gray-600 mt-1">Ordered on {order.date}</p>
              </div>
              <Badge className={getStatusColor(order.status)}>
                {order.status}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Order Items */}
            <div>
              <h4 className="font-medium mb-2">Items</h4>
              <div className="space-y-2">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between text-sm p-2 bg-gray-50 rounded">
                    <span>{item.name}</span>
                    <span className="text-gray-600">Qty: {item.quantity}</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-3 pt-3 border-t">
                <span className="font-medium">Total</span>
                <span className="font-medium">${order.total.toFixed(2)}</span>
              </div>
            </div>

            {/* Tracking Timeline */}
            <div>
              <h4 className="font-medium mb-4">Tracking Status</h4>
              <div className="relative">
                {order.trackingSteps.map((step, idx) => (
                  <div key={idx} className="flex gap-4 pb-6 last:pb-0">
                    {/* Icon */}
                    <div className="relative flex flex-col items-center">
                      <div 
                        className={`w-10 h-10 rounded-full flex items-center justify-center z-10 ${
                          step.completed 
                            ? 'bg-green-500 text-white' 
                            : 'bg-gray-200 text-gray-400'
                        }`}
                      >
                        {step.completed ? (
                          <CheckCircle2 className="w-5 h-5" />
                        ) : (
                          <Clock className="w-5 h-5" />
                        )}
                      </div>
                      {idx < order.trackingSteps.length - 1 && (
                        <div 
                          className={`w-0.5 h-full absolute top-10 ${
                            step.completed ? 'bg-green-500' : 'bg-gray-200'
                          }`}
                        />
                      )}
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 pt-1">
                      <p className={`font-medium ${step.completed ? 'text-gray-900' : 'text-gray-400'}`}>
                        {step.label}
                      </p>
                      {step.date && (
                        <p className="text-sm text-gray-600 mt-1">{step.date}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Estimated Delivery */}
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <Truck className="w-5 h-5 text-blue-600" />
                <span className="font-medium text-blue-900">Estimated Delivery</span>
              </div>
              <p className="text-blue-800">{order.estimatedDelivery}</p>
            </div>

            {/* Delivery Partner Info */}
            {order.deliveryPartner && (
              <div className="p-4 border rounded-lg">
                <h4 className="font-medium mb-3">Delivery Partner</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="w-4 h-4 text-gray-600" />
                    <span>{order.deliveryPartner.name}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="w-4 h-4 text-gray-600" />
                    <span>{order.deliveryPartner.phone}</span>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full mt-3">
                  <Phone className="w-4 h-4 mr-2" />
                  Contact Delivery Partner
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
