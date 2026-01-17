import { useState } from 'react';
import { Login } from '@/app/components/login';
import { CustomerDashboard } from '@/app/components/customer-dashboard';
import { MedicineSearch } from '@/app/components/medicine-search';
import { PrescriptionUpload } from '@/app/components/prescription-upload';
import { OrderTracking } from '@/app/components/order-tracking';
import { RefillOrders } from '@/app/components/refill-orders';
import { PharmacistDashboard } from '@/app/components/pharmacist-dashboard';
import { InventoryManagement } from '@/app/components/inventory-management';
import { StockAlerts } from '@/app/components/stock-alerts';
import { OrderProcessing } from '@/app/components/order-processing';
import { PrescriptionReview } from '@/app/components/prescription-review';
import { Button } from '@/app/components/ui/button';
import { 
  Pill, 
  Home, 
  Search, 
  Upload, 
  Package, 
  RefreshCw, 
  LogOut,
  ShoppingCart,
  FileText,
  AlertTriangle,
  Menu,
  X
} from 'lucide-react';

type UserRole = 'customer' | 'pharmacist' | null;
type Screen = 
  | 'dashboard' 
  | 'search' 
  | 'upload' 
  | 'tracking' 
  | 'refill'
  | 'inventory'
  | 'alerts'
  | 'orders'
  | 'prescriptions';

export default function App() {
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [currentScreen, setCurrentScreen] = useState<Screen>('dashboard');
  const [cart, setCart] = useState<any[]>([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogin = (role: UserRole) => {
    setUserRole(role);
    setCurrentScreen('dashboard');
  };

  const handleLogout = () => {
    setUserRole(null);
    setCurrentScreen('dashboard');
    setCart([]);
  };

  const handleNavigate = (screen: Screen) => {
    setCurrentScreen(screen);
    setIsMobileMenuOpen(false);
  };

  const handleAddToCart = (medicine: any) => {
    setCart([...cart, medicine]);
  };

  // If not logged in, show login screen
  if (!userRole) {
    return <Login onLogin={handleLogin} />;
  }

  // Navigation items based on role
  const customerNavItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'search', label: 'Search Medicines', icon: Search },
    { id: 'upload', label: 'Upload Prescription', icon: Upload },
    { id: 'tracking', label: 'Track Orders', icon: Package },
    { id: 'refill', label: 'Refill Orders', icon: RefreshCw },
  ];

  const pharmacistNavItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'inventory', label: 'Inventory', icon: Package },
    { id: 'alerts', label: 'Stock Alerts', icon: AlertTriangle },
    { id: 'orders', label: 'Process Orders', icon: ShoppingCart },
    { id: 'prescriptions', label: 'Review Prescriptions', icon: FileText },
  ];

  const navItems = userRole === 'customer' ? customerNavItems : pharmacistNavItems;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-40">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <Pill className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold">Digital Pharmacy</h1>
                <p className="text-xs text-gray-600">
                  {userRole === 'customer' ? 'Customer Portal' : 'Pharmacist Portal'}
                </p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-2">
              {navItems.map((item) => (
                <Button
                  key={item.id}
                  variant={currentScreen === item.id ? 'default' : 'ghost'}
                  onClick={() => handleNavigate(item.id as Screen)}
                  className="gap-2"
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </Button>
              ))}
              <Button variant="ghost" onClick={handleLogout} className="gap-2 ml-2">
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            </nav>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <nav className="lg:hidden mt-4 pb-2 border-t pt-4">
              <div className="flex flex-col gap-2">
                {navItems.map((item) => (
                  <Button
                    key={item.id}
                    variant={currentScreen === item.id ? 'default' : 'ghost'}
                    onClick={() => handleNavigate(item.id as Screen)}
                    className="justify-start gap-2"
                  >
                    <item.icon className="w-4 h-4" />
                    {item.label}
                  </Button>
                ))}
                <Button
                  variant="ghost"
                  onClick={handleLogout}
                  className="justify-start gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </Button>
              </div>
            </nav>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {userRole === 'customer' && (
          <>
            {currentScreen === 'dashboard' && (
              <CustomerDashboard onNavigate={handleNavigate} />
            )}
            {currentScreen === 'search' && (
              <MedicineSearch onAddToCart={handleAddToCart} />
            )}
            {currentScreen === 'upload' && <PrescriptionUpload />}
            {currentScreen === 'tracking' && <OrderTracking />}
            {currentScreen === 'refill' && <RefillOrders />}
          </>
        )}

        {userRole === 'pharmacist' && (
          <>
            {currentScreen === 'dashboard' && (
              <PharmacistDashboard onNavigate={handleNavigate} />
            )}
            {currentScreen === 'inventory' && <InventoryManagement />}
            {currentScreen === 'alerts' && <StockAlerts />}
            {currentScreen === 'orders' && <OrderProcessing />}
            {currentScreen === 'prescriptions' && <PrescriptionReview />}
          </>
        )}
      </main>
    </div>
  );
}
