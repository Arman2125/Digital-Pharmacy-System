import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Input } from '@/app/components/ui/input';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { Search, ShoppingCart, Plus, Minus } from 'lucide-react';

interface MedicineSearchProps {
  onAddToCart: (medicine: any) => void;
}

const medicines = [
  { id: 1, name: 'Amoxicillin', dosage: '500mg', category: 'Antibiotic', price: 12.99, stock: 'In Stock', requiresPrescription: true },
  { id: 2, name: 'Lisinopril', dosage: '10mg', category: 'Blood Pressure', price: 8.99, stock: 'In Stock', requiresPrescription: true },
  { id: 3, name: 'Metformin', dosage: '850mg', category: 'Diabetes', price: 15.99, stock: 'In Stock', requiresPrescription: true },
  { id: 4, name: 'Atorvastatin', dosage: '20mg', category: 'Cholesterol', price: 18.99, stock: 'In Stock', requiresPrescription: true },
  { id: 5, name: 'Omeprazole', dosage: '40mg', category: 'Gastric', price: 11.99, stock: 'In Stock', requiresPrescription: false },
  { id: 6, name: 'Ibuprofen', dosage: '400mg', category: 'Pain Relief', price: 6.99, stock: 'In Stock', requiresPrescription: false },
  { id: 7, name: 'Paracetamol', dosage: '500mg', category: 'Pain Relief', price: 4.99, stock: 'In Stock', requiresPrescription: false },
  { id: 8, name: 'Cetirizine', dosage: '10mg', category: 'Allergy', price: 9.99, stock: 'Low Stock', requiresPrescription: false },
];

export function MedicineSearch({ onAddToCart }: MedicineSearchProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState<{ [key: number]: number }>({});

  const filteredMedicines = medicines.filter(
    (med) =>
      med.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      med.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const updateQuantity = (id: number, delta: number) => {
    setCart((prev) => {
      const newQuantity = (prev[id] || 0) + delta;
      if (newQuantity <= 0) {
        const { [id]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [id]: newQuantity };
    });
  };

  const handleAddToCart = (medicine: any) => {
    const quantity = cart[medicine.id] || 1;
    onAddToCart({ ...medicine, quantity });
    setCart((prev) => {
      const { [medicine.id]: _, ...rest } = prev;
      return rest;
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl mb-1">Search Medicines</h2>
        <p className="text-gray-600">Find and order your medications</p>
      </div>

      {/* Search Bar */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <Input
              placeholder="Search by medicine name or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Medicine Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredMedicines.map((medicine) => (
          <Card key={medicine.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{medicine.name}</CardTitle>
                  <p className="text-sm text-gray-600">{medicine.dosage}</p>
                </div>
                {medicine.requiresPrescription && (
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                    Rx
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Category:</span>
                <span>{medicine.category}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <Badge 
                  className={
                    medicine.stock === 'In Stock' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }
                >
                  {medicine.stock}
                </Badge>
                <span className="text-xl">${medicine.price}</span>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex items-center border rounded-lg">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => updateQuantity(medicine.id, -1)}
                    disabled={!cart[medicine.id]}
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="px-3 text-center w-12">{cart[medicine.id] || 1}</span>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => updateQuantity(medicine.id, 1)}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                
                <Button 
                  className="flex-1"
                  onClick={() => handleAddToCart(medicine)}
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Add to Cart
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredMedicines.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center text-gray-500">
            No medicines found matching your search.
          </CardContent>
        </Card>
      )}
    </div>
  );
}
