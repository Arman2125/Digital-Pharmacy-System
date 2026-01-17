import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { AlertTriangle, TrendingDown, Package } from 'lucide-react';
import { Button } from '@/app/components/ui/button';

const criticalAlerts = [
  { 
    id: 1, 
    name: 'Amoxicillin 500mg', 
    current: 15, 
    minimum: 50, 
    category: 'Antibiotic',
    lastRestocked: '2025-12-20',
    dailyUsage: 8,
    daysUntilEmpty: 2
  },
  { 
    id: 2, 
    name: 'Ibuprofen 400mg', 
    current: 28, 
    minimum: 100, 
    category: 'Pain Relief',
    lastRestocked: '2025-12-15',
    dailyUsage: 12,
    daysUntilEmpty: 2
  },
];

const lowStockAlerts = [
  { 
    id: 3, 
    name: 'Omeprazole 40mg', 
    current: 42, 
    minimum: 75, 
    category: 'Gastric',
    lastRestocked: '2026-01-05',
    dailyUsage: 5,
    daysUntilEmpty: 8
  },
  { 
    id: 4, 
    name: 'Amlodipine 5mg', 
    current: 35, 
    minimum: 70, 
    category: 'Blood Pressure',
    lastRestocked: '2026-01-08',
    dailyUsage: 4,
    daysUntilEmpty: 9
  },
  { 
    id: 5, 
    name: 'Cetirizine 10mg', 
    current: 52, 
    minimum: 80, 
    category: 'Allergy',
    lastRestocked: '2026-01-10',
    dailyUsage: 6,
    daysUntilEmpty: 9
  },
];

export function StockAlerts() {
  const getStockPercentage = (current: number, minimum: number) => {
    return (current / minimum) * 100;
  };

  const handleReorder = (itemName: string) => {
    alert(`Reorder initiated for ${itemName}`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl mb-1">Stock Alerts</h2>
        <p className="text-gray-600">Monitor critical and low stock items</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-red-50 border-red-200">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-red-800">Critical Stock</p>
                <p className="text-3xl mt-1 text-red-900">{criticalAlerts.length}</p>
              </div>
              <AlertTriangle className="w-10 h-10 text-red-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-yellow-50 border-yellow-200">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-yellow-800">Low Stock</p>
                <p className="text-3xl mt-1 text-yellow-900">{lowStockAlerts.length}</p>
              </div>
              <TrendingDown className="w-10 h-10 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-800">Total Alerts</p>
                <p className="text-3xl mt-1 text-blue-900">
                  {criticalAlerts.length + lowStockAlerts.length}
                </p>
              </div>
              <Package className="w-10 h-10 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Critical Stock Alerts */}
      <Card className="border-red-200">
        <CardHeader className="bg-red-50">
          <CardTitle className="flex items-center gap-2 text-red-900">
            <AlertTriangle className="w-5 h-5" />
            Critical Stock - Immediate Action Required
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-4">
            {criticalAlerts.map((item) => {
              const percentage = getStockPercentage(item.current, item.minimum);
              return (
                <Card key={item.id} className="border-red-200">
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium text-lg">{item.name}</h4>
                          <p className="text-sm text-gray-600">{item.category}</p>
                        </div>
                        <Badge className="bg-red-100 text-red-800">
                          Critical
                        </Badge>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">Current Stock</p>
                          <p className="text-xl font-medium text-red-600">{item.current}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Minimum Required</p>
                          <p className="text-xl font-medium">{item.minimum}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Daily Usage</p>
                          <p className="font-medium">{item.dailyUsage} units</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Days Until Empty</p>
                          <p className="font-medium text-red-600">{item.daysUntilEmpty} days</p>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Stock Level</span>
                          <span className="text-red-600 font-medium">{percentage.toFixed(0)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div
                            className="bg-red-500 h-3 rounded-full"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>

                      <div className="flex gap-2 pt-2">
                        <Button 
                          className="flex-1"
                          onClick={() => handleReorder(item.name)}
                        >
                          Reorder Now
                        </Button>
                        <Button variant="outline">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Low Stock Alerts */}
      <Card className="border-yellow-200">
        <CardHeader className="bg-yellow-50">
          <CardTitle className="flex items-center gap-2 text-yellow-900">
            <TrendingDown className="w-5 h-5" />
            Low Stock - Action Recommended
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-4">
            {lowStockAlerts.map((item) => {
              const percentage = getStockPercentage(item.current, item.minimum);
              return (
                <Card key={item.id} className="border-yellow-200">
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium text-lg">{item.name}</h4>
                          <p className="text-sm text-gray-600">{item.category}</p>
                        </div>
                        <Badge className="bg-yellow-100 text-yellow-800">
                          Low Stock
                        </Badge>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">Current Stock</p>
                          <p className="text-xl font-medium text-yellow-600">{item.current}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Minimum Required</p>
                          <p className="text-xl font-medium">{item.minimum}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Daily Usage</p>
                          <p className="font-medium">{item.dailyUsage} units</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Days Until Empty</p>
                          <p className="font-medium text-yellow-600">{item.daysUntilEmpty} days</p>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Stock Level</span>
                          <span className="text-yellow-600 font-medium">{percentage.toFixed(0)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div
                            className="bg-yellow-500 h-3 rounded-full"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>

                      <div className="flex gap-2 pt-2">
                        <Button 
                          variant="outline"
                          className="flex-1"
                          onClick={() => handleReorder(item.name)}
                        >
                          Reorder
                        </Button>
                        <Button variant="outline">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
