import React from "react";
import { Modal as RNModal, ModalProps, View } from "react-native";
import tailwind from "twrnc";

type PROPS = ModalProps & {
  isOpen: boolean;
};

export const Modal = ({ isOpen, children, ...props }: PROPS) => {
  const Content = (
    <View
      style={tailwind`flex-1 items-center justify-center px-3 bg-zinc-900/40`}
    >
      {children}
    </View>
  );
  return (
    <RNModal
      visible={isOpen}
      transparent
      animationType="fade"
      statusBarTranslucent
      {...props}
    >
      {Content}
    </RNModal>
  );
};
