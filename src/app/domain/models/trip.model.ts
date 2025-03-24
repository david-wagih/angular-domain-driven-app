export interface Trip {
  id: string;
  name: string;
  description: string;
  imageUrl?: string;
  startDate: Date;
  endDate: Date;
  duration: number;
  location: {
    name: string;
    coordinates?: {
      latitude: number;
      longitude: number;
    };
  };
  price: {
    amount: number;
    currency: string;
  };
  capacity: {
    total: number;
    booked: number;
  };
  status: 'draft' | 'published' | 'cancelled' | 'completed';
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
} 