export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  oldPrice: number | null;
  rating: number;
  image: string;
  badge: string | null;
  description: string;
  isAdmin?: boolean;
}

export interface CartItem {
  id: number;
  qty: number;
}

export interface Review {
  name: string;
  rating: number;
  text: string;
  date: string;
}

export interface Order {
  orderNo: string;
  customer: {
    name: string;
    phone: string;
    email: string;
    payment: string;
  };
  items: { name: string; qty: number; price: number }[];
  total: number;
  subtotal: number;
  shipping: number;
  date: string;
}
