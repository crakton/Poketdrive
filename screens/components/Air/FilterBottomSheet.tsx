import React, {
	useRef,
	useImperativeHandle,
	forwardRef,
	useState,
	useMemo,
	useEffect,
} from "react";
import { View, Text, TouchableOpacity } from "react-native";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import tw from "twrnc";
import { Ionicons } from "@expo/vector-icons";
import { Modal, Pressable } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { set } from "date-fns";

const FilterBottomSheet = forwardRef((props, ref) => {
	// Reference to the actual bottom sheet
	const bottomSheetRef = useRef<BottomSheet>(null);

	// State for filters
	const [dateRange, setDateRange] = useState({
		from: "",
		to: "",
	});
	const [showFromDatePicker, setShowFromDatePicker] = useState(false);
	const [showToDatePicker, setShowToDatePicker] = useState(false);
	const [tourType, setTourType] = useState<string | null>(null);
	const [rideStatus, setRideStatus] = useState<string | null>(null);
	const [paymentStatus, setPaymentStatus] = useState<string | null>(null);
	const [amountSort, setAmountSort] = useState<string | null>(null);

	// Modal visibility states
	const [isTourTypeModalVisible, setIsTourTypeModalVisible] = useState(false);
	const [isRideStatusModalVisible, setIsRideStatusModalVisible] =
		useState(false);
	const [isPaymentStatusModalVisible, setIsPaymentStatusModalVisible] =
		useState(false);
	const [isAmountSortModalVisible, setIsAmountSortModalVisible] =
		useState(false);

	// Snap points for the bottom sheet (from bottom of the screen)
	const snapPoints = ["90%"];

	const methods = useMemo(
		() => ({
			expand: () => {
				bottomSheetRef.current?.expand();
			},
			collapse: () => {
				bottomSheetRef.current?.collapse();
			},
			close: () => {
				bottomSheetRef.current?.close();
			},
		}),
		[bottomSheetRef.current]
	);
	// Expose methods to parent component
	useImperativeHandle(ref, () => methods);

	// Reset individual filters
	const resetDateRange = () => {
		setDateRange({ from: "", to: "" });
	};

	const resetTourType = () => {
		setTourType(null);
	};

	const resetRideStatus = () => {
		setRideStatus(null);
	};

	const resetPaymentStatus = () => {
		setPaymentStatus(null);
	};

	const resetAmountSort = () => {
		setAmountSort("");
	};

	// Reset all filters
	const resetAllFilters = () => {
		resetDateRange();
		resetTourType();
		resetRideStatus();
		resetPaymentStatus();
		resetAmountSort();
	};

	// Count active filters
	const countActiveFilters = () => {
		let count = 0;
		if (dateRange.from && dateRange.to) count++;
		if (tourType) count++;
		if (rideStatus) count++;
		if (paymentStatus) count++;
		if (amountSort) count++;
		return count;
	};

	// Apply filters
	const applyFilters = () => {
		// Here you would apply the filters and close the bottom sheet
		bottomSheetRef.current?.close();
	};

	const handleApplyFilters = () => {
		console.log("Applying filters:");
		console.log("Date Range:", dateRange);
		console.log("Tour Type:", tourType);
		console.log("Ride Status:", rideStatus);
		console.log("Payment Status:", paymentStatus);
		console.log("Amount Sort:", amountSort);
		applyFilters();
	};

	const handleDateRangeSelection = (type: "from" | "to", date: string) => {
		setDateRange((prev) => ({ ...prev, [type]: date }));
	};

	const handleTourTypeSelection = (type: string) => {
		setTourType(type);
	};

	const handleRideStatusSelection = (status: string) => {
		setRideStatus(status);
	};

	const handlePaymentStatusSelection = (status: string) => {
		setPaymentStatus(status);
	};

	const handleAmountSortSelection = (sort: string) => {
		setAmountSort(sort);
	};

	const handleQuickDateSelection = (
		type: "today" | "thisWeek" | "thisMonth"
	) => {
		const today = new Date().toLocaleDateString();
		if (type === "today") {
			handleDateRangeSelection("from", today);
			handleDateRangeSelection("to", today);
		} else if (type === "thisWeek") {
			const startOfWeek = new Date();
			startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
			const endOfWeek = new Date();
			endOfWeek.setDate(endOfWeek.getDate() + (6 - endOfWeek.getDay()));
			handleDateRangeSelection("from", startOfWeek.toLocaleDateString());
			handleDateRangeSelection("to", endOfWeek.toLocaleDateString());
		} else if (type === "thisMonth") {
			handleDateRangeSelection(
				"from",
				new Date(
					new Date().getFullYear(),
					new Date().getMonth(),
					1
				).toLocaleDateString()
			);
			handleDateRangeSelection(
				"to",
				new Date(
					new Date().getFullYear(),
					new Date().getMonth() + 1,
					0
				).toLocaleDateString()
			);
		}
	};

	const tourTypes = ["One Way", "Round Trip", "Multi-City"];
	const rideStatuses = ["Pending", "Confirmed", "Cancelled", "Completed"];
	const paymentStatuses = ["Paid", "Unpaid", "Refunded"];
	return (
		<BottomSheet
			ref={bottomSheetRef}
			index={-1}
			snapPoints={snapPoints}
			enablePanDownToClose={true}
			handleIndicatorStyle={tw`bg-gray-400 w-16`}
		>
			<BottomSheetView style={tw`flex-1 p-4`}>
				<View style={tw`flex-row justify-between items-center mb-4`}>
					<Text style={tw`text-lg font-medium`}>Filter by:</Text>
				</View>

				{/* Date Range Filter */}
				<View style={tw`mb-6`}>
					<View style={tw`flex-row justify-between items-center mb-2`}>
						<Text style={tw`font-medium`}>Date Range</Text>
						<TouchableOpacity onPress={resetDateRange}>
							<Text style={tw`text-orange-500`}>Reset</Text>
						</TouchableOpacity>
					</View>

					<View style={tw`flex-row mb-2`}>
						<View style={tw`flex-1 mr-2`}>
							<Text style={tw`mb-1 text-gray-500`}>From</Text>
							<View
								style={tw`flex-row items-center border border-gray-200 rounded-lg p-2`}
							>
								<TouchableOpacity
									onPress={() =>
										handleDateRangeSelection(
											"from",
											new Date().toLocaleDateString()
										)
									}
									style={tw`flex-1`}
								>
									<Text>{dateRange.from || "Select date"}</Text>
								</TouchableOpacity>
								<TouchableOpacity
									onPress={() => setShowFromDatePicker(true)}
									style={tw`ml-auto`}
								>
									<Ionicons name="calendar-outline" size={20} color="#999" />
								</TouchableOpacity>
							</View>
						</View>

						<View style={tw`flex-1 ml-2`}>
							<Text style={tw`mb-1 text-gray-500`}>To</Text>
							<View
								style={tw`flex-row items-center border border-gray-200 rounded-lg p-2`}
							>
								<TouchableOpacity
									onPress={() =>
										handleDateRangeSelection(
											"to",
											new Date().toLocaleDateString()
										)
									}
									style={tw`flex-1`}
								>
									<Text>{dateRange.to || "Select date"}</Text>
								</TouchableOpacity>
								<TouchableOpacity
									onPress={() => setShowToDatePicker(true)}
									style={tw`ml-auto`}
								>
									<Ionicons name="calendar-outline" size={20} color="#999" />
								</TouchableOpacity>
							</View>
						</View>
					</View>

					<View style={tw`flex-row`}>
						<TouchableOpacity
							style={tw`flex-1 bg-gray-100 rounded-lg py-2 items-center mr-1`}
							onPress={() => handleQuickDateSelection("today")}
						>
							<Text>Today</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={tw`flex-1 bg-gray-100 rounded-lg py-2 items-center mx-1`}
							onPress={() => handleQuickDateSelection("thisWeek")}
						>
							<Text>This Week</Text>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={() => handleQuickDateSelection("thisMonth")}
							style={tw`flex-1 bg-gray-100 rounded-lg py-2 items-center ml-1`}
						>
							<Text>This Month</Text>
						</TouchableOpacity>
					</View>
				</View>

				{/* Tour Type Filter */}
				<View style={tw`mb-6`}>
					<View style={tw`flex-row justify-between items-center mb-2`}>
						<Text style={tw`font-medium`}>Tour type</Text>
						<TouchableOpacity onPress={resetTourType}>
							<Text style={tw`text-orange-500`}>Reset</Text>
						</TouchableOpacity>
					</View>

					<Pressable
						style={tw`flex-row items-center justify-between border border-gray-200 rounded-lg p-3`}
						onPress={() => setIsTourTypeModalVisible(true)}
					>
						<Text>{tourType || "Select tour type"}</Text>
						<Ionicons name="chevron-down" size={20} color="#999" />
					</Pressable>
					<Modal
						animationType="slide"
						transparent={true}
						visible={isTourTypeModalVisible}
						onRequestClose={() => setIsTourTypeModalVisible(false)}
					>
						<Pressable
							style={tw`flex-1 justify-center items-center bg-gray-500/50`}
							onPress={() => setIsTourTypeModalVisible(false)}
						>
							<View style={tw`bg-white p-4 rounded-lg w-80`}>
								{tourTypes.map((type) => (
									<Pressable
										key={type}
										onPress={() => {
											handleTourTypeSelection(type);
											setIsTourTypeModalVisible(false);
										}}
										style={tw`py-2 border-b border-gray-200`}
									>
										<Text
											style={tw`text-base ${
												tourType === type ? "font-bold" : ""
											}`}
										>
											{type}
										</Text>
									</Pressable>
								))}
							</View>
						</Pressable>
					</Modal>
				</View>

				{/* Ride Status Filter */}
				<View style={tw`mb-6`}>
					<View style={tw`flex-row justify-between items-center mb-2`}>
						<Text style={tw`font-medium`}>Ride Status</Text>
						<TouchableOpacity onPress={resetRideStatus}>
							<Text style={tw`text-orange-500`}>Reset</Text>
						</TouchableOpacity>
					</View>
					<Pressable
						style={tw`flex-row items-center justify-between border border-gray-200 rounded-lg p-3`}
						onPress={() => setIsRideStatusModalVisible(true)}
					>
						<Text>{rideStatus || "Select ride status"}</Text>
						<Ionicons name="chevron-down" size={20} color="#999" />
					</Pressable>
					<Modal
						animationType="slide"
						transparent={true}
						visible={isRideStatusModalVisible}
						onRequestClose={() => setIsRideStatusModalVisible(false)}
					>
						<Pressable
							style={tw`flex-1 justify-center items-center bg-gray-500/50`}
							onPress={() => setIsRideStatusModalVisible(false)}
						>
							<View style={tw`bg-white p-4 rounded-lg w-80`}>
								{rideStatuses.map((status) => (
									<Pressable
										key={status}
										onPress={() => {
											handleRideStatusSelection(status);
											setIsRideStatusModalVisible(false);
										}}
										style={tw`py-2 border-b border-gray-200`}
									>
										<Text
											style={tw`text-base ${
												rideStatus === status ? "font-bold" : ""
											}`}
										>
											{status}
										</Text>
									</Pressable>
								))}
							</View>
						</Pressable>
					</Modal>
				</View>

				{/* Payment Status Filter */}
				<View style={tw`mb-6`}>
					<View style={tw`flex-row justify-between items-center mb-2`}>
						<Text style={tw`font-medium`}>Payment Status</Text>
						<TouchableOpacity onPress={resetPaymentStatus}>
							<Text style={tw`text-orange-500`}>Reset</Text>
						</TouchableOpacity>
					</View>
					<Pressable
						style={tw`flex-row items-center justify-between border border-gray-200 rounded-lg p-3`}
						onPress={() => setIsPaymentStatusModalVisible(true)}
					>
						<Text>{paymentStatus || "Select payment status"}</Text>
						<Ionicons name="chevron-down" size={20} color="#999" />
					</Pressable>
					<Modal
						animationType="slide"
						transparent={true}
						visible={isPaymentStatusModalVisible}
						onRequestClose={() => setIsPaymentStatusModalVisible(false)}
					>
						<Pressable
							style={tw`flex-1 justify-center items-center bg-gray-500/50`}
							onPress={() => setIsPaymentStatusModalVisible(false)}
						>
							<View style={tw`bg-white p-4 rounded-lg w-80`}>
								{paymentStatuses.map((status) => (
									<Pressable
										key={status}
										onPress={() => {
											handlePaymentStatusSelection(status);
											setIsPaymentStatusModalVisible(false);
										}}
										style={tw`py-2 border-b border-gray-200`}
									>
										<Text
											style={tw`text-base ${
												paymentStatus === status ? "font-bold" : ""
											}`}
										>
											{status}
										</Text>
									</Pressable>
								))}
							</View>
						</Pressable>
					</Modal>
				</View>

				{/* Amount Filter */}
				<View style={tw`mb-6`}>
					<View style={tw`flex-row justify-between items-center mb-2`}>
						<Text style={tw`font-medium`}>Amount</Text>
						<TouchableOpacity onPress={resetAmountSort}>
							<Text style={tw`text-orange-500`}>Reset</Text>
						</TouchableOpacity>
					</View>

					<Pressable
						style={tw`flex-row items-center justify-between border border-gray-200 rounded-lg p-3`}
						onPress={() => setIsAmountSortModalVisible(true)}
					>
						<Text>{amountSort || "Select sorting order"}</Text>
						<Ionicons name="chevron-down" size={20} color="#999" />
					</Pressable>
					<Modal
						animationType="slide"
						transparent={true}
						visible={isAmountSortModalVisible}
						onRequestClose={() => setIsAmountSortModalVisible(false)}
					>
						<Pressable
							style={tw`flex-1 justify-center items-center bg-gray-500/50`}
							onPress={() => setIsAmountSortModalVisible(false)}
						>
							<View style={tw`bg-white p-4 rounded-lg w-80`}>
								{[
									"Low to High (Lowest First)",
									"High to Low (Highest First)",
								].map((sort) => (
									<Pressable
										key={sort}
										onPress={() => {
											handleAmountSortSelection(sort);
											setIsAmountSortModalVisible(false);
										}}
										style={tw`py-2 border-b border-gray-200`}
									>
										<Text
											style={tw`text-base ${
												amountSort === sort ? "font-bold" : ""
											}`}
										>
											{sort}
										</Text>
									</Pressable>
								))}
							</View>
						</Pressable>
					</Modal>
				</View>

				{/* Amount Filter */}
				<View style={tw`mb-6`}>
					<View style={tw`flex-row justify-between items-center mb-2`}>
						<Text style={tw`font-medium`}>Amount</Text>
						<TouchableOpacity onPress={resetAmountSort}>
							<Text style={tw`text-orange-500`}>Reset</Text>
						</TouchableOpacity>
					</View>

					<TouchableOpacity
						style={tw`flex-row items-center justify-between border border-gray-200 rounded-lg p-3`}
						onPress={() => handleAmountSortSelection("Selected Amount Sort")}
					>
						<Text>{amountSort || "Select sorting order"}</Text>
						<Ionicons name="chevron-down" size={20} color="#999" />
					</TouchableOpacity>
				</View>

				{/* Bottom buttons */}
				<View style={tw`flex-row mt-auto`}>
					<TouchableOpacity
						style={tw`flex-1 bg-gray-100 py-3 rounded-lg items-center mr-2`}
						onPress={resetAllFilters}
					>
						<Text style={tw`text-gray-700`}>Reset All</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={tw`flex-1 bg-orange-500 py-3 rounded-lg items-center ml-2`}
						onPress={handleApplyFilters}
					>
						<Text style={tw`text-white`}>Apply ({countActiveFilters()})</Text>
					</TouchableOpacity>
				</View>
			</BottomSheetView>
			{showFromDatePicker && (
				<DateTimePicker
					value={new Date(dateRange.from)}
					mode="date"
					display="default"
					onChange={(date) => {
						setDateRange((prev) => ({
							...prev,
							from: date.nativeEvent.timestamp.toString(),
						}));
						setShowFromDatePicker(false);
					}}
				/>
			)}
			{showToDatePicker && (
				<DateTimePicker
					value={new Date(dateRange.to)}
					mode="date"
					display="default"
					onChange={(date) => {
						setDateRange((prev) => ({
							...prev,
							to: date.nativeEvent.timestamp.toString(),
						}));
						setShowToDatePicker(false);
					}}
				/>
			)}
		</BottomSheet>
	);
});

export default FilterBottomSheet;
