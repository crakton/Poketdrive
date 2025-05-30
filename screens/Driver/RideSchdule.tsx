import React, { useRef, useState } from "react";
import {
	SafeAreaView,
	StyleSheet,
	View,
	StatusBar,
	Dimensions,
} from "react-native";
import PagerView from "react-native-pager-view";
import tw from "twrnc";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../../nav";
import HeaderBackButton from "../../components/common/HeaderBackButton";
import RideScheduleForm from "../../components/Driver/RideScheduleForm";
import VehicleDetails from "../../components/Driver/VehicleDetails";
import RidePreference from "../../components/Driver/RidePreference";
import BackRowSeating from "../../components/Driver/BackRowSeating";
import PriceSetting from "../../components/Driver/PriceSetting";
import { useAppSelector } from "@redux/store";
import { Schedule } from "@services/scheduleService";
import { fetchUserDetails, TUserDetails } from "@utils/fetchUser";
import { useSchedule } from "@hooks/reactQuery/useSchedule";
import { useLandService } from "@hooks/land/useLandService";

const RideSchedule = () => {
	const rideSchedule = useAppSelector((state) => state.rideSchedule);
	const pagerRef = useRef<PagerView>(null);
	const [currentPage, setCurrentPage] = useState(0);
	const [userData, setUserData] = useState<TUserDetails>();
	const navigation =
		useNavigation<
			NativeStackNavigationProp<AuthStackParamList, "RidePreference">
		>();
	const [isSubmitting, setIsSubmitting] = useState(false);
	const { usePostTrip } = useLandService();
	const { mutate, data, isError, isSuccess } = usePostTrip();

	React.useEffect(() => {
		(async () => setUserData(await fetchUserDetails()))();
	}, []);

	const steps = [
		{
			component: <RideScheduleForm onNext={() => goToNextPage()} />,
			title: "Ride Schedule",
		},
		{
			component: <VehicleDetails onNext={() => goToNextPage()} />,
			title: "Vehicle Details",
		},
		{
			component: <RidePreference onNext={() => goToNextPage()} />,
			title: "Ride Preferences",
		},
		{
			component: <BackRowSeating onNext={() => goToNextPage()} />,
			title: "Back Row Seating",
		},
		{
			component: (
				<PriceSetting
					isSubmitting={isSubmitting}
					onNext={() => handlePosting()}
				/>
			),
			title: "Price Setting",
		},
	];
	const handlePosting = React.useCallback(() => {
		// Handle the final submission logic
		const payload = {
			brs: getBRS(),
			carColor: rideSchedule.vehicleDetails.carColor,
			carName: rideSchedule.vehicleDetails.carName,
			carNumber: rideSchedule.vehicleDetails.carNumber,
			creator: userData?.id,
			departure_time: rideSchedule.vehicleDetails.dateTime,
			destination: rideSchedule.locationData.to,
			origin: rideSchedule.locationData.from,
			luggage_type: rideSchedule.ridePreferences.luggageSize,
			other: rideSchedule.backRowSeating.otherPreferences?.other,
			price: rideSchedule.price,
			remaining_capacity:
				rideSchedule.backRowSeating.otherPreferences?.counts?.toString(),
			stops: rideSchedule.locationData.stops || [],
			total_capacity: rideSchedule.backRowSeating.maxPersons.toString(),
			riders: [],
			type: rideSchedule.vehicleDetails.rideType,
		} as Schedule;
		console.log("Posting ride schedule with payload:", payload);

		setIsSubmitting(true);
		try {
			mutate(payload, {
				onSuccess: (data) => {
					setIsSubmitting(false);
					console.log("Ride schedule posted successfully:", data);
				},
				onError: (error) => {
					setIsSubmitting(false);
					console.error("Error posting ride schedule:", error);
				},
			});
		} catch (error) {
			setIsSubmitting(false);
			console.error("Error posting ride schedule:", error);
		} finally {
			setIsSubmitting(false);
		}
	}, [navigation, rideSchedule]);

	const getBRS = React.useCallback(() => {
		const { seatingType } = rideSchedule.ridePreferences;
		switch (seatingType) {
			case "2-max":
				return 2;
			case "3-max":
				return 3;
			default:
				return 0; // No back row seating
		}
	}, []);

	const goToNextPage = React.useCallback(() => {
		if (currentPage < steps.length - 1) {
			setCurrentPage((prev) => prev + 1); // Update state first
			setTimeout(() => {
				pagerRef.current?.setPage(currentPage + 1); // Then update pager
			}, 0);
		}
	}, [currentPage, steps.length]);

	const handleBackPress = React.useCallback(() => {
		if (currentPage > 0) {
			setCurrentPage((prev) => prev - 1); // Update state first
			setTimeout(() => {
				pagerRef.current?.setPage(currentPage - 1); // Then update pager
			}, 0);
		} else {
			navigation.goBack();
		}
	}, [currentPage, navigation]);

	console.log("isError:", isError);
	console.log("isSuccess:", isSuccess);
	console.log("data:", data);

	return (
		<SafeAreaView
			style={[tw`bg-[#FFFFFF] flex-1`, { paddingTop: StatusBar.currentHeight }]}
		>
			<HeaderBackButton
				onBack={handleBackPress}
				title={steps[currentPage].title}
			/>
			<PagerView
				ref={pagerRef}
				style={styles.pager}
				initialPage={0}
				orientation={"vertical"}
				scrollEnabled={false}
				onPageSelected={(e) => setCurrentPage(e.nativeEvent.position)}
			>
				{steps.map((step, index) => (
					<View key={index} style={tw`px-5 mt-5 flex-1 h-full`}>
						{step.component}
					</View>
				))}
			</PagerView>
		</SafeAreaView>
	);
};

export default RideSchedule;

const styles = StyleSheet.create({
	pager: {
		flex: 1,
		width: Dimensions.get("window").width,
		height: Dimensions.get("window").height - StatusBar.currentHeight! - 56, // Adjust height to fit below the status bar and header
	},
});
