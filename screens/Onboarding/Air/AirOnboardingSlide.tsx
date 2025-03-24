import React, { FC, useRef, useState, useEffect } from "react";
import PageView from "react-native-pager-view";
import tw from "twrnc";
import { air_onboarding } from "../../../utils/constant";
import {
	Image,
	ImageSourcePropType,
	StatusBar,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../../types";
import Animated, {
	interpolate,
	SharedValue,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from "react-native-reanimated";
import NameScreen from "./NameScreen";
import PhoneNumberScreen from "./PhoneNumberScreen";
import DateOfBirthScreen from "./DateOfBirthScreen";
import ConfirmationCodeScreen from "./ConfirmationCodeScreen";

// Auto-swipe interval in milliseconds
const AUTO_SWIPE_INTERVAL = 3000;

const AirOnboardingSlide = () => {
	const [currentPage, setCurrentPage] = useState(0);
	const pageViewRef = useRef<PageView>(null);
	const offset = useSharedValue(0);
	const timerRef = useRef<NodeJS.Timeout | null>(null);

	// Auto swipe functionality
	// useEffect(() => {
	//   startAutoSwipe();
	//   return () => {
	//     stopAutoSwipe();
	//   };
	// }, [currentPage]);

	// const startAutoSwipe = () => {
	//   stopAutoSwipe();
	//   timerRef.current = setTimeout(() => {
	//     if (currentPage < land_onboarding.length - 1) {
	//       goToPage(currentPage + 1);
	//     } else {
	//       goToPage(0); // Loop back to first slide
	//     }
	//   }, AUTO_SWIPE_INTERVAL);
	// };

	// const stopAutoSwipe = () => {
	//   if (timerRef.current) {
	//     clearTimeout(timerRef.current);
	//     timerRef.current = null;
	//   }
	// };

	const goToPage = (pageNumber: number) => {
		pageViewRef.current?.setPage(pageNumber);
	};

	const handlePageChange = (pageNumber: number) => {
		setCurrentPage(pageNumber);
		offset.value = withTiming(pageNumber);
		// startAutoSwipe(); // Restart the timer when page changes
	};

	const handlePageScroll = (event: any) => {
		offset.value = event.nativeEvent.position + event.nativeEvent.offset;
		// Stop auto swipe while user is manually scrolling
		// stopAutoSwipe();
	};

	return (
		<View style={[tw`flex flex-1`]}>
			<PageView
				scrollEnabled={false}
				ref={pageViewRef}
				style={[tw`flex flex-1`]}
				initialPage={currentPage}
				onPageSelected={(e) => handlePageChange(e.nativeEvent.position)}
				onPageScroll={handlePageScroll}
			>
				{air_onboarding.map((items) => (
					<Page key={items.id} {...items} />
				))}
			</PageView>
			<View style={[tw`flex flex-row justify-center gap-2 py-4 mb-4`]}>
				{air_onboarding.map((_, index) => (
					<PageIndicator key={index} index={index} offset={offset} />
				))}
			</View>
		</View>
	);
};

export default AirOnboardingSlide;

const Page: FC<{
	id: number;
	name: string;
}> = (props) => {
	const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();
	const renderScreen = (name: string) => {
		switch (name) {
			case "NameScreen":
				return <NameScreen />;
			case "PhoneNumberScreen":
				return <PhoneNumberScreen />;
			case "DateOfBirthScreen":
				return <DateOfBirthScreen />;
			case "ConfirmationCodeScreen":
				return <ConfirmationCodeScreen />;
			default:
				return null;
		}
	};
	return (
		<View
			style={[
				tw`flex flex-col h-full bg-white w-full flex-1 items-center gap-5 justify-center px-5`,
			]}
		>
			<StatusBar barStyle={"default"} translucent />
			{renderScreen(props.name)}
		</View>
	);
};

const PageIndicator: FC<{
	index: number;
	offset: SharedValue<number>;
}> = ({ index, offset }) => {
	const inputRange = [index - 1, index, index + 1];
	const width = useAnimatedStyle(() => {
		const width = interpolate(offset.value, inputRange, [10, 20, 10], "clamp");
		return {
			width,
		};
	});
	const opacity = useAnimatedStyle(() => {
		const opacity = interpolate(
			offset.value,
			inputRange,
			[0.5, 1, 0.5],
			"clamp"
		);
		return { opacity };
	});
	return (
		<Animated.View style={[tw`h-2 rounded-full bg-gray-400`, width, opacity]} />
	);
};
