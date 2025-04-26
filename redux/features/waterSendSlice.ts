import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SenderInfo {
  sender_name: string;
  sender_phone: string;
  pickupAddress: string;
  pickupTime: string;
  description: string;
}

interface ParcelInfo {
  weight: number;
  dimensions: string;
  category: string;
}

interface ReceiversInfo {
  receiversName: string;
  receiversPhone: string;
  receiversAddress: string;
  // deliveryTime: string;
  deliveryInstruction: string;
}

interface Cost {
  type: string;
  amount: number;
}

export interface SendFormState {
  senderInfo: SenderInfo;
  parcelInfo: ParcelInfo;
  receiversInfo: ReceiversInfo;
  cost: Cost;
  coupon: boolean;
  estimatedDeliveryDays: number;
  estimatedDeliveryDate: string;
}

const initialState: SendFormState = {
  senderInfo: {
    sender_name: "",
    sender_phone: "",
    pickupAddress: "",
    pickupTime: "",
    description: "",
  },
  parcelInfo: {
    weight: 0,
    dimensions: "",
    category: "",
  },
  receiversInfo: {
    receiversName: "",
    receiversPhone: "",
    receiversAddress: "",
    // deliveryTime: "",
    deliveryInstruction: "",
  },
  cost: {
    type: "",
    amount: 0,
  },
  coupon: false,
  estimatedDeliveryDays: 0,
  estimatedDeliveryDate: "",
};

const sendSlice = createSlice({
  name: "sendForm",
  initialState,
  reducers: {
    updateSendForm: (state, action: PayloadAction<Partial<SendFormState>>) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    resetSendForm: () => initialState,
  },
});

export const { updateSendForm, resetSendForm } = sendSlice.actions;
export default sendSlice.reducer;
