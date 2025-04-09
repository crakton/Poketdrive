export interface IUser {
	water: {
		ordersTo: [];
		ordersFrom: [];
	};
	role: "driver" | "passenger";
	rides: [];
	ridesCreated: [];
	coupons: [];
	firstName: string;
	lastName: string;
	email: string;
	carName: string;
	carNumber: string;
	id: string;
}

export interface IWallet {
	balance: number;
	userId: string;
}
