import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Profile = () => {
  return (
    <SafeAreaView className="flex-1">
      <View className="px-4">
        <Text className="text-white">Profile</Text>
      </View>
    </SafeAreaView>
  );
}

export default Profile;
