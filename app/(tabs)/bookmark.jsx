import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const Bookmark = () => {
  return (
    <SafeAreaView>
      <View className="px-4">
        <Text className="text-white">Bookmark</Text>
      </View>
    </SafeAreaView>
  );
};

export default Bookmark;
