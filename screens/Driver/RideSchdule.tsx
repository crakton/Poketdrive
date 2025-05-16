import React, { useCallback, useState } from "react";
import {
	SafeAreaView,
	ScrollView,
	StyleSheet,
	View,
	StatusBar,
	Alert,
	TouchableOpacity,
	Text,
} from "react-native";
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

interface Schedule {
	origin: string;
	destination: string;
	stops: string[];
	type: string;
	other: string;
	price: number;
	brs: number;
	departure_time: string;
	total_capacity: string;
	remaining_capacity: string;
	creator: string;
	riders: string[];
	luggage_type: string;
	carName: string;
	carColor: string;
	carNumber: string;
}

const RideSchedule = () => {
	const navigation =
		useNavigation<
			NativeStackNavigationProp<AuthStackParamList, "RidePreference">
		>();

	const [currentStep, setCurrentStep] = useState(0);
	const [formData, setFormData] = useState<Schedule>({
		origin: "",
		destination: "",
		stops: [],
		type: "",
		other: "",
		price: 0,
		brs: 0,
		departure_time: "",
		total_capacity: "",
		remaining_capacity: "",
		creator: "",
		riders: [],
		luggage_type: "",
		carName: "",
		carColor: "",
		carNumber: "",
	});

	const handleNext = useCallback(() => {
		if (currentStep < steps.length - 1) {
			setCurrentStep(currentStep + 1);
		}
	}, [currentStep]);

	const handleBack = useCallback(() => {
		if (currentStep > 0) {
			setCurrentStep(currentStep - 1);
		} else {
			navigation.goBack();
		}
	}, [currentStep, navigation]);

	const steps = [
		{
			component: (
				<RideScheduleForm
					formData={formData}
					setFormData={setFormData}
					handleNext={handleNext}
				/>
			),
			title: "Ride Schedule",
		},
		{
			component: (
				<VehicleDetails
					formData={formData}
					setFormData={setFormData}
					handleNext={handleNext}
				/>
			),
			title: "Vehicle Details",
		},
		{
			component: (
				<RidePreference
					formData={formData}
					setFormData={setFormData}
					handleNext={handleNext}
				/>
			),
			title: "Ride Preferences",
		},
		{
			component: (
				<BackRowSeating
					formData={formData}
					setFormData={setFormData}
					handleNext={handleNext}
				/>
			),
			title: "Back Row Seating",
		},
		{
			component: (
				<PriceSetting
					formData={formData}
					setFormData={setFormData}
					handleNext={handleNext}
				/>
			),
			title: "Price Setting",
		},
	];

	return (
		<SafeAreaView
			style={[tw`bg-[#FFFFFF] h-full`, { paddingTop: StatusBar.currentHeight }]}
		>
			<ScrollView>
				<View style={tw`flex gap-[1]`}>
					<HeaderBackButton
						title={steps[currentStep].title}
						onBack={handleBack}
					/>
					<View style={tw`px-5 mt-5`}>{steps[currentStep].component}</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default RideSchedule;

const styles = StyleSheet.create({});
