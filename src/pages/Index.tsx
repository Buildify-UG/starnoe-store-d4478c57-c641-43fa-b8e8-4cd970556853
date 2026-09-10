import { useState } from 'react';
import { ShoppingCart, Send, Zap, Package, Smartphone, FileText, Leaf } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  icon: React.ReactNode;
  category: string;
  popular?: boolean;
}

interface CartItem extends Product {
  quantity: number;
}

const products: Product[] = [
  {
    id: 'data-1gb',
    name: 'Data Bundle - 1GB',
    description: 'High-speed internet data',
    price: 0.50,
    category: 'Data',
    icon: <Smartphone className="w-8 h-8" />,
  },
  {
    id: 'data-5gb',
    name: 'Data Bundle - 5GB',
    description: 'More data for streaming',
    price: 2.00,
    category: 'Data',
    icon: <Smartphone className="w-8 h-8" />,
    popular: true,
  },
  {
    id: 'airtime-5',
    name: 'Airtime - $5',
    description: 'Instant airtime credit',
    price: 5.00,
    category: 'Airtime',
    icon: <Zap className="w-8 h-8" />,
  },
  {
    id: 'airtime-10',
    name: 'Airtime - $10',
    description: 'More talk time & SMS',
    price: 10.00,
    category: 'Airtime',
    icon: <Zap className="w-8 h-8" />,
    popular: true,
  },
  {
    id: 'cv-templates',
    name: 'Professional CV Templates',
    description: '10+ editable templates + guide',
    price: 1.50,
    category: 'Templates',
    icon: <FileText className="w-8 h-8" />,
  },
  {
    id: 'flyer-templates',
    name: 'Flyer Design Templates',
    description: '20+ business flyer templates',
    price: 2.50,
    category: 'Templates',
    icon: <Leaf className="w-8 h-8" />,
  },
];

export default function Index() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredProducts = selectedCategory
    ? products.filter((p) => p.category === selectedCategory)
    : products;

  const addToCart = (product: Product) => {
    const existing = cart.find((item) => item.id === product.id);
    if (existing) {
      setCart(cart.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId: string) => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      setCart(cart.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      ));
    }
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleCheckout = () => {
    if (cart.length === 0) return;
    const message = `I'd like to purchase:\n${cart
      .map((item) => `• ${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`)
      .join('\n')}\n\nTotal: $${total.toFixed(2)}\n\nPlease send payment details.`;
    window.open(
      `https://wa.me/263XXXXXXXXX?text=${encodeURIComponent(message)}`,
      '_blank'
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <Package className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">StarNoe</h1>
              <p className="text-xs text-muted-foreground">Automated Store</p>
            </div>
          </div>

          <button
            onClick={() => setShowCart(!showCart)}
            className="relative p-2 text-foreground hover:bg-muted rounded-lg transition-colors"
          >
            <ShoppingCart className="w-6 h-6" />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 bg-destructive text-destructive-foreground text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        {!showCart && (
          <>
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Shop Anytime, Anywhere
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Get instant data, airtime, CV templates, and flyers delivered automatically via WhatsApp. We're open 24/7!
              </p>

              {/* Category Filter */}
              <div className="flex flex-wrap gap-3 justify-center mb-8">
                <Button
                  variant={selectedCategory === null ? 'default' : 'outline'}
                  onClick={() => setSelectedCategory(null)}
                  size="sm"
                >
                  All Products
                </Button>
                {['Data', 'Airtime', 'Templates'].map((cat) => (
                  <Button
                    key={cat}
                    variant={selectedCategory === cat ? 'default' : 'outline'}
                    onClick={() => setSelectedCategory(cat)}
                    size="sm"
                  >
                    {cat}
                  </Button>
                ))}
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {filteredProducts.map((product) => (
                <Card
                  key={product.id}
                  className={`p-6 hover:shadow-lg transition-all duration-300 cursor-pointer border-2 ${
                    product.popular
                      ? 'border-primary bg-gradient-to-br from-white to-primary/5 ring-2 ring-primary/20'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  {product.popular && (
                    <div className="mb-3 inline-block px-3 py-1 bg-primary text-primary-foreground text-xs font-bold rounded-full">
                      Popular
                    </div>
                  )}
                  <div className="text-primary mb-4">{product.icon}</div>
                  <h3 className="text-lg font-bold text-foreground mb-2">{product.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-primary">${product.price.toFixed(2)}</span>
                    <Button
                      onClick={() => addToCart(product)}
                      size="sm"
                      className="bg-primary hover:bg-primary/90 text-primary-foreground"
                    >
                      Add
                    </Button>
                  </div>
                </Card>
              ))}
            </div>

            {/* Features Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white rounded-lg p-8 border border-border">
              <div className="text-center">
                <Zap className="w-8 h-8 text-secondary mx-auto mb-3" />
                <h3 className="font-bold text-foreground mb-2">Instant Delivery</h3>
                <p className="text-sm text-muted-foreground">Products delivered automatically via WhatsApp</p>
              </div>
              <div className="text-center">
                <Send className="w-8 h-8 text-primary mx-auto mb-3" />
                <h3 className="font-bold text-foreground mb-2">24/7 Available</h3>
                <p className="text-sm text-muted-foreground">Shop anytime, payments processed instantly</p>
              </div>
              <div className="text-center">
                <Package className="w-8 h-8 text-secondary mx-auto mb-3" />
                <h3 className="font-bold text-foreground mb-2">Easy Checkout</h3>
                <p className="text-sm text-muted-foreground">Simple WhatsApp ordering process</p>
              </div>
            </div>
          </>
        )}

        {/* Shopping Cart */}
        {showCart && (
          <div className="bg-white rounded-lg border border-border p-8 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-foreground mb-6">Your Cart</h2>

            {cart.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">Your cart is empty</p>
            ) : (
              <>
                <div className="space-y-4 mb-6">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-4 bg-muted rounded-lg border border-border"
                    >
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground">{item.name}</h3>
                        <p className="text-sm text-muted-foreground">${item.price.toFixed(2)} each</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-2 py-1 border border-border rounded hover:bg-border transition-colors"
                        >
                          −
                        </button>
                        <span className="w-8 text-center font-semibold text-foreground">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-2 py-1 border border-border rounded hover:bg-border transition-colors"
                        >
                          +
                        </button>
                        <span className="w-20 text-right font-bold text-primary">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-destructive hover:text-destructive/80 font-bold ml-2"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-border pt-4 mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-muted-foreground">Subtotal:</span>
                    <span className="text-foreground font-semibold">${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center text-lg font-bold">
                    <span className="text-foreground">Total:</span>
                    <span className="text-primary">${total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button
                    onClick={handleCheckout}
                    className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-primary-foreground font-bold py-6 text-lg"
                  >
                    <Send className="w-5 h-5 mr-2" />
                    Pay via WhatsApp
                  </Button>
                  <Button
                    onClick={() => setShowCart(false)}
                    variant="outline"
                    className="w-full"
                  >
                    Continue Shopping
                  </Button>
                </div>
              </>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-border mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-muted-foreground text-sm">
          <p>StarNoe © 2024 • Automated 24/7 Store</p>
          <p className="mt-2">Payment via EcoCash • Instant delivery via WhatsApp</p>
        </div>
      </footer>
    </div>
  );
}
