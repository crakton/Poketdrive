import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { CircleSnail } from "react-native-progress";
import tw from "twrnc";

interface ContinueButtonProps {
  text: string;
  onPress: () => void;
  disabled: boolean;
  loading?: boolean;
}

const ContinueButton: React.FC<ContinueButtonProps> = ({
  text,
  onPress,
  disabled,
  loading,
}) => {
  return (
    <TouchableOpacity
      style={[
        tw`p-3 items-center justify-center rounded-lg my-8`,
        { backgroundColor: disabled || loading ? "#D3D3D3" : "#F25B3E" },
      ]}
      onPress={onPress}
      disabled={disabled || loading}
    >
      {loading ? (
        <CircleSnail size={24} color="#F25B3E" indeterminate={true} />
      ) : (
        <Text
          style={[
            tw`text-center text-[14px] text-white`,
            { fontFamily: "Poppins-semiBold" },
          ]}
        >
          {text}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default ContinueButton;
