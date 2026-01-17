import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { RefreshCw, Clock, CheckCircle2, Calendar } from 'lucide-react';

const refillableOrders = [
  {
    id: 'ORD-0987',
    medicine: 'Atorvastatin 20mg',
    lastRefilled: '2025-12-20',
    quantity: 30,
    price: 18.99,
    prescriptionValid: true,
    refillsRemaining: 3,
  },
  {
    id: 'ORD-0956',
    medicine: 'Omeprazole 40mg',
    lastRefilled: '2025-12-15',
    quantity: 30,
    price: 11.99,
    prescriptionValid: true,
    refillsRemaining: 5,
  },
  {
    id: 'ORD-0923',
    medicine: 'Metformin 850mg',
    lastRefilled: '2025-11-30',
    quantity: 60,
    price: 15.99,
    prescriptionValid: true,
    refillsRemaining: 2,
  },
];

export function RefillOrders() {
  const [refilling, setRefilling] = useState<{ [key: string]: boolean }>({});
  const [customQuantity, setCustomQuantity] = useState<{ [key: string]: number }>({});

  const handleRefill = (orderId: string) => {
    setRefilling((prev) => ({ ...prev, [orderId]: true }));
    setTimeout(() => {
      setRefilling((prev) => ({ ...prev, [orderId]: false }));
    }, 2000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h2 className="text-2xl mb-1">Refill Orders</h2>
        <p className="text-gray-600">Quickly reorder your regular medications</p>
      </div>

      {/* Quick Refill Info */}
      <Card className="bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <RefreshCw className="w-6 h-6 text-blue-600 mt-1" />
            <div>
              <h3 className="font-medium text-blue-900 mb-1">Easy Refills</h3>
              <p className="text-sm text-blue-800">
                Refill your prescriptions with one click. We'll verify your prescription 
                and deliver your medication to your doorstep.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Refillable Medications */}
      <div className="space-y-4">
        {refillableOrders.map((order) => (
          <Card key={order.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle>{order.medicine}</CardTitle>
                  <p className="text-sm text-gray-600 mt-1">Order ID: {order.id}</p>
                </div>
                <Badge className="bg-green-100 text-green-800">
                  {order.refillsRemaining} Refills Left
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Order Details */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Last Refilled</p>
                  <p className="font-medium flex items-center gap-1 mt-1">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    {order.lastRefilled}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">Previous Quantity</p>
                  <p className="font-medium mt-1">{order.quantity} tablets</p>
                </div>
              </div>

              {/* Prescription Status */}
              <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                <span className="text-sm text-green-800 font-medium">
                  Prescription Valid
                </span>
              </div>

              {/* Quantity Selection */}
              <div className="space-y-2">
                <Label>Select Quantity</Label>
                <div className="flex gap-2">
                  <Button
                    variant={!customQuantity[order.id] || customQuantity[order.id] === order.quantity ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setCustomQuantity((prev) => ({ ...prev, [order.id]: order.quantity }))}
                  >
                    {order.quantity} tablets
                  </Button>
                  <Button
                    variant={customQuantity[order.id] === order.quantity * 2 ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setCustomQuantity((prev) => ({ ...prev, [order.id]: order.quantity * 2 }))}
                  >
                    {order.quantity * 2} tablets
                  </Button>
                  <Button
                    variant={customQuantity[order.id] === order.quantity * 3 ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setCustomQuantity((prev) => ({ ...prev, [order.id]: order.quantity * 3 }))}
                  >
                    {order.quantity * 3} tablets
                  </Button>
                </div>
              </div>

              {/* Price and Action */}
              <div className="flex items-center justify-between pt-2 border-t">
                <div>
                  <p className="text-sm text-gray-600">Total Price</p>
                  <p className="text-2xl font-medium">${order.price}</p>
                </div>
                <Button 
                  onClick={() => handleRefill(order.id)}
                  disabled={refilling[order.id]}
                  className="min-w-[140px]"
                >
                  {refilling[order.id] ? (
                    <>
                      <Clock className="w-4 h-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Refill Now
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Additional Info */}
      <Card>
        <CardContent className="pt-6">
          <h4 className="font-medium mb-3">Refill Policy</h4>
          <ul className="text-sm text-gray-600 space-y-2">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
              <span>Refills are processed within 24 hours</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
              <span>Your prescription must be valid and have refills remaining</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
              <span>Contact us if you need a new prescription from your doctor</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
