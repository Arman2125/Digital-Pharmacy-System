import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/app/components/ui/table';
import { Package, CheckCircle2, X, Clock } from 'lucide-react';

const ordersData = [
  {
    id: 'ORD-1001',
    customer: 'John Doe',
    date: '2026-01-17 09:00 AM',
    items: [
      { name: 'Amoxicillin 500mg', quantity: 30 },
      { name: 'Vitamin D3', quantity: 60 },
    ],
    total: 45.98,
    status: 'Pending',
    requiresPrescription: true,
    prescriptionVerified: false,
  },
  {
    id: 'ORD-1002',
    customer: 'Jane Smith',
    date: '2026-01-17 08:30 AM',
    items: [
      { name: 'Lisinopril 10mg', quantity: 30 },
    ],
    total: 8.99,
    status: 'Processing',
    requiresPrescription: true,
    prescriptionVerified: true,
  },
  {
    id: 'ORD-1003',
    customer: 'Bob Johnson',
    date: '2026-01-17 07:15 AM',
    items: [
      { name: 'Ibuprofen 400mg', quantity: 60 },
      { name: 'Paracetamol 500mg', quantity: 30 },
    ],
    total: 22.95,
    status: 'Pending',
    requiresPrescription: false,
    prescriptionVerified: true,
  },
  {
    id: 'ORD-1004',
    customer: 'Alice Williams',
    date: '2026-01-16 05:45 PM',
    items: [
      { name: 'Metformin 850mg', quantity: 60 },
    ],
    total: 15.99,
    status: 'Packed',
    requiresPrescription: true,
    prescriptionVerified: true,
  },
];

export function OrderProcessing() {
  const [orders, setOrders] = useState(ordersData);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Processing': return 'bg-blue-100 text-blue-800';
      case 'Packed': return 'bg-purple-100 text-purple-800';
      case 'Completed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleUpdateStatus = (orderId: string, newStatus: string) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
    setSelectedOrder(null);
  };

  const pendingCount = orders.filter(o => o.status === 'Pending').length;
  const processingCount = orders.filter(o => o.status === 'Processing').length;
  const packedCount = orders.filter(o => o.status === 'Packed').length;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl mb-1">Order Processing</h2>
        <p className="text-gray-600">Process and manage customer orders</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending Orders</p>
                <p className="text-3xl mt-1">{pendingCount}</p>
              </div>
              <Clock className="w-10 h-10 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Processing</p>
                <p className="text-3xl mt-1">{processingCount}</p>
              </div>
              <Package className="w-10 h-10 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Ready to Ship</p>
                <p className="text-3xl mt-1">{packedCount}</p>
              </div>
              <CheckCircle2 className="w-10 h-10 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Prescription</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>{order.customer}</TableCell>
                    <TableCell className="text-sm">{order.date}</TableCell>
                    <TableCell>{order.items.length} item(s)</TableCell>
                    <TableCell>${order.total.toFixed(2)}</TableCell>
                    <TableCell>
                      {order.requiresPrescription ? (
                        order.prescriptionVerified ? (
                          <Badge className="bg-green-100 text-green-800">
                            <CheckCircle2 className="w-3 h-3 mr-1" />
                            Verified
                          </Badge>
                        ) : (
                          <Badge className="bg-red-100 text-red-800">
                            <X className="w-3 h-3 mr-1" />
                            Pending
                          </Badge>
                        )
                      ) : (
                        <Badge variant="outline">Not Required</Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(order.status)}>
                        {order.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedOrder(order)}
                      >
                        Process
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle>Order Details - {selectedOrder.id}</CardTitle>
                  <p className="text-sm text-gray-600 mt-1">{selectedOrder.date}</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedOrder(null)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Customer Info */}
              <div>
                <h4 className="font-medium mb-2">Customer Information</h4>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="font-medium">{selectedOrder.customer}</p>
                </div>
              </div>

              {/* Order Items */}
              <div>
                <h4 className="font-medium mb-2">Order Items</h4>
                <div className="space-y-2">
                  {selectedOrder.items.map((item: any, idx: number) => (
                    <div key={idx} className="flex justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between mt-3 pt-3 border-t">
                  <span className="font-medium">Total Amount</span>
                  <span className="font-medium text-lg">${selectedOrder.total.toFixed(2)}</span>
                </div>
              </div>

              {/* Prescription Status */}
              {selectedOrder.requiresPrescription && (
                <div className={`p-4 border rounded-lg ${
                  selectedOrder.prescriptionVerified 
                    ? 'bg-green-50 border-green-200' 
                    : 'bg-red-50 border-red-200'
                }`}>
                  <div className="flex items-center gap-2 mb-2">
                    {selectedOrder.prescriptionVerified ? (
                      <>
                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                        <span className="font-medium text-green-900">Prescription Verified</span>
                      </>
                    ) : (
                      <>
                        <X className="w-5 h-5 text-red-600" />
                        <span className="font-medium text-red-900">Prescription Verification Pending</span>
                      </>
                    )}
                  </div>
                  {!selectedOrder.prescriptionVerified && (
                    <p className="text-sm text-red-800">
                      Please verify the prescription before processing this order.
                    </p>
                  )}
                </div>
              )}

              {/* Current Status */}
              <div>
                <h4 className="font-medium mb-2">Current Status</h4>
                <Badge className={getStatusColor(selectedOrder.status)}>
                  {selectedOrder.status}
                </Badge>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                {selectedOrder.status === 'Pending' && (
                  <Button 
                    className="flex-1"
                    onClick={() => handleUpdateStatus(selectedOrder.id, 'Processing')}
                    disabled={selectedOrder.requiresPrescription && !selectedOrder.prescriptionVerified}
                  >
                    Start Processing
                  </Button>
                )}
                {selectedOrder.status === 'Processing' && (
                  <Button 
                    className="flex-1"
                    onClick={() => handleUpdateStatus(selectedOrder.id, 'Packed')}
                  >
                    Mark as Packed
                  </Button>
                )}
                {selectedOrder.status === 'Packed' && (
                  <Button 
                    className="flex-1"
                    onClick={() => handleUpdateStatus(selectedOrder.id, 'Completed')}
                  >
                    Ship Order
                  </Button>
                )}
                <Button 
                  variant="outline"
                  onClick={() => setSelectedOrder(null)}
                >
                  Close
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
