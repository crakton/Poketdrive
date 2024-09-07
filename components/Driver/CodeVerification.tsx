import React, { useState } from "react";
import { Text, View, StyleSheet, LayoutChangeEvent } from "react-native";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";

const CELL_COUNT = 4;

interface RenderCellProps {
  index: number;
  symbol: string;
  isFocused: boolean;
}

const renderCell = ({
  index,
  symbol,
  isFocused,
  getCellOnLayoutHandler,
}: RenderCellProps & {
  getCellOnLayoutHandler: (index: number) => (event: LayoutChangeEvent) => void;
}) => {
  let textChild: string | JSX.Element | null = null;

  if (symbol) {
    textChild = symbol;
  } else if (isFocused) {
    textChild = <Cursor />;
  }

  return (
    <Text
      key={index}
      style={[styles.cell, isFocused && styles.focusCell]}
      onLayout={getCellOnLayoutHandler(index)}
    >
      {textChild}
    </Text>
  );
};

interface CodeVerificationProps {
  code: string;
  setCode: React.Dispatch<React.SetStateAction<string>>;
}

const CodeVerification: React.FC<CodeVerificationProps> = ({
  code,
  setCode,
}) => {
  const ref = useBlurOnFulfill({ value: code, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value: code,
    setValue: setCode,
  });

  return (
    <View style={styles.root}>
      <CodeField
        ref={ref}
        {...props}
        value={code}
        onChangeText={setCode}
        cellCount={CELL_COUNT}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={({ index, symbol, isFocused }) =>
          renderCell({ index, symbol, isFocused, getCellOnLayoutHandler })
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    padding: 5,
    minHeight: 5,
  },
  cell: {
    width: 70,
    height: 55,
    lineHeight: 55,
    fontSize: 30,
    fontWeight: "700",
    textAlign: "center",
    marginHorizontal: 4,
    backgroundColor: "#262626",
    color: "white",
    fontFamily: "Poppins-Bold",
    borderRadius: 50,
  },
  focusCell: {
    borderColor: "white",
    borderRadius: 80,
  },
});

export default CodeVerification;
