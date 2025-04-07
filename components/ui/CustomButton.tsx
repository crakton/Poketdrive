import React from "react";
import {
	Text,
	TouchableOpacity,
	StyleSheet,
	ViewStyle,
	TextStyle,
	View,
} from "react-native";
import { CircleSnail } from "react-native-progress";
import tw from "twrnc";

// Define button variants
type ButtonVariant = "filled" | "outlined" | "text";

// Define color contexts
type ColorContext =
	| "primary"
	| "secondary"
	| "success"
	| "danger"
	| "warning"
	| "info";

// Define props interface with additional customization options
interface CustomButtonProps {
	text: string;
	onPress: () => void;
	disabled?: boolean;
	loading?: boolean;
	variant?: ButtonVariant;
	colorContext?: ColorContext;
	size?: "small" | "medium" | "large";
	fullWidth?: boolean;
	rounded?: boolean;
	style?: ViewStyle;
	textStyle?: TextStyle;
	loadingSize?: number;
	loadingColor?: string;
	// Icon props
	prefixIcon?: React.ReactNode;
	suffixIcon?: React.ReactNode;
	iconSpacing?: number;
	// Layout props
	alignItems?: "center" | "flex-start" | "flex-end";
}

const CustomButton: React.FC<CustomButtonProps> = ({
	text,
	onPress,
	disabled = false,
	loading = false,
	variant = "filled",
	colorContext = "primary",
	size = "medium",
	fullWidth = false,
	rounded = false,
	style = {},
	textStyle = {},
	loadingSize,
	loadingColor,
	prefixIcon,
	suffixIcon,
	iconSpacing,
	alignItems = "center",
}) => {
	// Define color palette with primary color and others
	const colors = {
		primary: {
			main: "#FF6633",
			light: "#FF8C66",
			dark: "#CC5229",
			contrast: "#FFFFFF",
		},
		secondary: {
			main: "#6C757D",
			light: "#8D959D",
			dark: "#565D64",
			contrast: "#FFFFFF",
		},
		success: {
			main: "#28A745",
			light: "#48C664",
			dark: "#208537",
			contrast: "#FFFFFF",
		},
		danger: {
			main: "#DC3545",
			light: "#E45C6A",
			dark: "#B02A37",
			contrast: "#FFFFFF",
		},
		warning: {
			main: "#FFC107",
			light: "#FFCD39",
			dark: "#CC9A06",
			contrast: "#000000",
		},
		info: {
			main: "#17A2B8",
			light: "#3BB7C9",
			dark: "#128293",
			contrast: "#FFFFFF",
		},
	};

	// Get the selected color scheme
	const colorScheme = colors[colorContext];

	// Determine button sizing
	const sizeStyles = {
		small: tw`py-1 px-3`,
		medium: tw`py-3 px-4`,
		large: tw`py-4 px-6`,
	};

	// Determine text sizing
	const textSizing = {
		small: tw`text-sm`,
		medium: tw`text-base`,
		large: tw`text-lg`,
	};

	// Default icon spacing based on size
	const getDefaultIconSpacing = () => {
		if (iconSpacing !== undefined) return iconSpacing;

		switch (size) {
			case "small":
				return 4;
			case "medium":
				return 6;
			case "large":
				return 8;
			default:
				return 6;
		}
	};

	// Determine button styles based on variant
	const getButtonStyles = () => {
		// Base styles
		let buttonStyles: any = [
			sizeStyles[size],
			tw`items-${alignItems} justify-center rounded-lg flex-row`,
			fullWidth ? tw`w-full` : {},
			rounded ? tw`rounded-full` : {},
		];

		// Add variant-specific styles
		switch (variant) {
			case "filled":
				buttonStyles.push({
					backgroundColor: disabled || loading ? "#D3D3D3" : colorScheme.main,
				});
				break;
			case "outlined":
				buttonStyles.push(tw`border-2`, {
					borderColor: disabled || loading ? "#D3D3D3" : colorScheme.main,
					backgroundColor: "transparent",
				});
				break;
			case "text":
				buttonStyles.push({
					backgroundColor: "transparent",
				});
				break;
		}

		return buttonStyles;
	};

	// Determine text styles based on variant
	const getTextStyles = () => {
		let textStyles: any = [
			tw`text-center`,
			textSizing[size],
			{ fontFamily: "Poppins-Regular" },
		];

		switch (variant) {
			case "filled":
				textStyles.push({
					color: disabled || loading ? "#888888" : colorScheme.contrast,
				});
				break;
			case "outlined":
			case "text":
				textStyles.push({
					color: disabled || loading ? "#888888" : colorScheme.main,
				});
				break;
		}

		return textStyles;
	};

	// Calculate loading indicator size based on button size
	const getLoadingSize = () => {
		if (loadingSize) return loadingSize;

		switch (size) {
			case "small":
				return 18;
			case "medium":
				return 24;
			case "large":
				return 30;
			default:
				return 24;
		}
	};

	// Calculate loading indicator color
	const getLoadingColor = () => {
		if (loadingColor) return loadingColor;

		if (variant === "filled") {
			return colorScheme.contrast;
		} else {
			return colorScheme.main;
		}
	};

	// Get icon color based on variant
	const getIconColor = () => {
		if (disabled || loading) return "#888888";

		if (variant === "filled") {
			return colorScheme.contrast;
		} else {
			return colorScheme.main;
		}
	};

	// Render content based on loading state and icon presence
	const renderContent = () => {
		const spacing = getDefaultIconSpacing();

		if (loading) {
			return (
				<CircleSnail
					size={getLoadingSize()}
					color={getLoadingColor()}
					indeterminate={true}
				/>
			);
		} else {
			return (
				<View style={tw`flex-row items-center justify-center`}>
					{prefixIcon && (
						<View style={{ marginRight: spacing }}>
							{React.isValidElement(prefixIcon)
								? React.cloneElement(prefixIcon as React.ReactElement, {
										color:
											(prefixIcon as React.ReactElement).props.color ||
											getIconColor(),
								  })
								: prefixIcon}
						</View>
					)}

					<Text style={[...getTextStyles(), textStyle]}>{text}</Text>

					{suffixIcon && (
						<View style={{ marginLeft: spacing }}>
							{React.isValidElement(suffixIcon)
								? React.cloneElement(suffixIcon as React.ReactElement, {
										color:
											(suffixIcon as React.ReactElement).props.color ||
											getIconColor(),
								  })
								: suffixIcon}
						</View>
					)}
				</View>
			);
		}
	};

	return (
		<TouchableOpacity
			style={[...getButtonStyles(), style]}
			onPress={onPress}
			disabled={disabled || loading}
			activeOpacity={0.7}
		>
			{renderContent()}
		</TouchableOpacity>
	);
};

export default CustomButton;
