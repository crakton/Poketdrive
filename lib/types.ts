export interface TrackingOrder {
  id: string;
  cost: {
    amount: number;
    type: string;
  };
  coupon: boolean;
  couponCode: string | null;
  estimatedDeliveryDate: string;
  estimatedDeliveryDays: number;
  paid: boolean;
  parcelInfo: {
    category: string;
    dimensions: string;
    weight: string;
  };
  receiversInfo: {
    deliveryInstruction: string;
    deliveryTime: string;
    receiversAddress: string;
    receiversName: string;
    receiversPhone: string;
  };
  senderInfo: {
    description: string;
    pickupAddress: string;
    pickupTime: string;
    sender_name: string;
    sender_phone: string;
  };
  status: string;
  tracking: {
    distance: number;
    distanceText: string;
    receiverCordinates: {
      lat: number;
      lng: number;
    };
    senderCordinates: {
      lat: number;
      lng: number;
    };
    trackingNumber: string;
  };
  user: string;
}
