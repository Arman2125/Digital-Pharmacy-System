import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Badge } from '@/app/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/app/components/ui/table';
import { 
  Search, 
  Plus, 
  Edit, 
  AlertTriangle,
  Package,
  TrendingDown
} from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/app/components/ui/dialog';
import { Label } from '@/app/components/ui/label';

const inventoryData = [
  { id: 1, name: 'Amoxicillin', dosage: '500mg', category: 'Antibiotic', stock: 15, minStock: 50, price: 12.99, status: 'critical' },
  { id: 2, name: 'Lisinopril', dosage: '10mg', category: 'Blood Pressure', stock: 120, minStock: 75, price: 8.99, status: 'good' },
  { id: 3, name: 'Metformin', dosage: '850mg', category: 'Diabetes', stock: 95, minStock: 80, price: 15.99, status: 'good' },
  { id: 4, name: 'Atorvastatin', dosage: '20mg', category: 'Cholesterol', stock: 78, minStock: 60, price: 18.99, status: 'good' },
  { id: 5, name: 'Omeprazole', dosage: '40mg', category: 'Gastric', stock: 42, minStock: 75, price: 11.99, status: 'low' },
  { id: 6, name: 'Ibuprofen', dosage: '400mg', category: 'Pain Relief', stock: 28, minStock: 100, price: 6.99, status: 'critical' },
  { id: 7, name: 'Paracetamol', dosage: '500mg', category: 'Pain Relief', stock: 150, minStock: 120, price: 4.99, status: 'good' },
  { id: 8, name: 'Cetirizine', dosage: '10mg', category: 'Allergy', stock: 65, minStock: 50, price: 9.99, status: 'good' },
  { id: 9, name: 'Levothyroxine', dosage: '50mcg', category: 'Thyroid', stock: 88, minStock: 60, price: 13.99, status: 'good' },
  { id: 10, name: 'Amlodipine', dosage: '5mg', category: 'Blood Pressure', stock: 35, minStock: 70, price: 10.99, status: 'low' },
];

export function InventoryManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [inventory, setInventory] = useState(inventoryData);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const filteredInventory = inventory.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'critical':
        return <Badge className="bg-red-100 text-red-800">Critical</Badge>;
      case 'low':
        return <Badge className="bg-yellow-100 text-yellow-800">Low Stock</Badge>;
      case 'good':
        return <Badge className="bg-green-100 text-green-800">In Stock</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">Unknown</Badge>;
    }
  };

  const handleEdit = (item: any) => {
    setEditingItem({ ...item });
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (editingItem) {
      setInventory(
        inventory.map((item) =>
          item.id === editingItem.id ? editingItem : item
        )
      );
      setIsDialogOpen(false);
      setEditingItem(null);
    }
  };

  const updateEditingItem = (field: string, value: any) => {
    setEditingItem((prev: any) => {
      const updated = { ...prev, [field]: value };
      // Recalculate status
      if (field === 'stock' || field === 'minStock') {
        const stock = field === 'stock' ? value : updated.stock;
        const minStock = field === 'minStock' ? value : updated.minStock;
        if (stock < minStock * 0.3) {
          updated.status = 'critical';
        } else if (stock < minStock) {
          updated.status = 'low';
        } else {
          updated.status = 'good';
        }
      }
      return updated;
    });
  };

  const summaryStats = {
    total: inventory.length,
    critical: inventory.filter((i) => i.status === 'critical').length,
    low: inventory.filter((i) => i.status === 'low').length,
    good: inventory.filter((i) => i.status === 'good').length,
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl mb-1">Inventory Management</h2>
        <p className="text-gray-600">Manage medicine stock and availability</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Items</p>
                <p className="text-3xl mt-1">{summaryStats.total}</p>
              </div>
              <Package className="w-10 h-10 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Critical Stock</p>
                <p className="text-3xl mt-1">{summaryStats.critical}</p>
              </div>
              <AlertTriangle className="w-10 h-10 text-red-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Low Stock</p>
                <p className="text-3xl mt-1">{summaryStats.low}</p>
              </div>
              <TrendingDown className="w-10 h-10 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">In Stock</p>
                <p className="text-3xl mt-1">{summaryStats.good}</p>
              </div>
              <Package className="w-10 h-10 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Actions */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <Input
                placeholder="Search by medicine name or category..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Medicine
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Inventory Table */}
      <Card>
        <CardHeader>
          <CardTitle>Medicine Inventory</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Medicine Name</TableHead>
                  <TableHead>Dosage</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Current Stock</TableHead>
                  <TableHead>Min. Stock</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInventory.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell>{item.dosage}</TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell>
                      <span className={item.status === 'critical' ? 'text-red-600 font-medium' : ''}>
                        {item.stock}
                      </span>
                    </TableCell>
                    <TableCell>{item.minStock}</TableCell>
                    <TableCell>${item.price}</TableCell>
                    <TableCell>{getStatusBadge(item.status)}</TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(item)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Inventory Item</DialogTitle>
          </DialogHeader>
          {editingItem && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Medicine Name</Label>
                <Input value={editingItem.name} disabled />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Current Stock</Label>
                  <Input
                    type="number"
                    value={editingItem.stock}
                    onChange={(e) => updateEditingItem('stock', parseInt(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Minimum Stock</Label>
                  <Input
                    type="number"
                    value={editingItem.minStock}
                    onChange={(e) => updateEditingItem('minStock', parseInt(e.target.value))}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Price ($)</Label>
                <Input
                  type="number"
                  step="0.01"
                  value={editingItem.price}
                  onChange={(e) => updateEditingItem('price', parseFloat(e.target.value))}
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSave}>Save Changes</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
