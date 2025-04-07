import React, { FC, useRef, useState } from "react";
import PageView from "react-native-pager-view";
import tw from "twrnc";
import { land_onboarding } from "../../utils/constant";
import {
	Image,
	ImageSourcePropType,
	StatusBar,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../types";
import Animated, {
	interpolate,
	SharedValue,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from "react-native-reanimated";
import { useAppDispatch } from "../../redux/store";
import { setFirstTimeUser } from "../../redux/features/authSlice";
import AuthService from "../../services/authService";

const OnboardingSlide = () => {
	const [currentPage, setCurrentPage] = useState(0);
	const pageViewRef = useRef<PageView>(null);
	const offset = useSharedValue(0);
	const handlePageChange = (pageNumber: number) => {
		setCurrentPage(pageNumber);
		offset.value = withTiming(pageNumber);
	};
	const handlePageScroll = (event: any) => {
		offset.value = event.nativeEvent.position + event.nativeEvent.offset;
	};
	return (
		<View style={[tw`flex flex-1`]}>
			<PageView
				ref={pageViewRef}
				style={[tw`flex flex-1`]}
				initialPage={currentPage}
				onPageSelected={(e) => handlePageChange(e.nativeEvent.position)}
				onPageScroll={handlePageScroll}
			>
				{land_onboarding.map((items) => (
					<Page key={items.id} {...items} />
				))}
			</PageView>
			<View style={[tw`flex flex-row justify-center gap-2 py-4`]}>
				{land_onboarding.map((_, index) => (
					<PageIndicator key={index} index={index} offset={offset} />
				))}
			</View>
		</View>
	);
};

export default OnboardingSlide;

const Page: FC<{
	id: number;
	title: string;
	subTitle: string;
	img_name: ImageSourcePropType;
}> = (props) => {
	const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();
	const dispatch = useAppDispatch();
	return (
		<View
			style={[
				tw`flex flex-col h-full bg-white w-full flex-1 items-center gap-5 justify-center px-5`,
			]}
		>
			<StatusBar barStyle={"default"} translucent />
			<Image
				resizeMethod="scale"
				resizeMode="contain"
				source={props.img_name}
				style={[tw`w-full h-1/3`]}
			/>
			<Text style={[tw`text-2xl`, { fontFamily: "Poppins-Black" }]}>
				{props.title}
			</Text>
			<Text style={[tw`text-lg`, { fontFamily: "Poppins-Regular" }]}>
				{props.subTitle}
			</Text>
			{props.id === 3 ? (
				<TouchableOpacity
					onPress={async () => {
						await AuthService.setFirstTimeFlag();
						dispatch(setFirstTimeUser(false));
						navigate("MainStack");
					}}
					style={[tw`bg-[tomato] p-3 -bottom-20 rounded-full`]}
				>
					<Text
						style={[
							tw`text-white text-lg font-bold`,
							{ fontFamily: "Poppins-Regular" },
						]}
					>
						Get Started
					</Text>
				</TouchableOpacity>
			) : null}
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
