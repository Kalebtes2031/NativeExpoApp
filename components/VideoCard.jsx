import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import React, { useState } from "react";
import { icons } from "@/constants";
import { ResizeMode, Video } from "expo-av";

const VideoCard = ({
  video: {
    title,
    thumbnail,
    video, // This is the video URL
    creator: { username, avatar },
  },
}) => {
  const [play, setPlay] = useState(false);
  const [status, setStatus] = useState({});
  // Function to handle playback status updates
  const handlePlaybackStatusUpdate = (status) => {
    // console.log("Playback status update:", status);
    if (status.didJustFinish) {
      setPlay(false);
    }
    if (status.error) {
      console.error("Video error:", status.error);
      Alert.alert("Playback Error", "An error occurred during video playback.");
    }
  };

  // Function to handle play button press
  const handlePress = () => {
    console.log("This is the URL:", video); // Log URL when play button is pressed
    setPlay(true);
  };

  return (
    <View className="flex flex-col items-center px-4 mb-14">
      <View className="flex flex-row gap-3 items-start">
        <View className="flex justify-center items-center flex-row flex-1">
          <View className="w-[46px] h-[46px] rounded-lg border border-secondary flex justify-center items-center p-0.5">
            <Image
              source={{ uri: avatar }}
              className="w-full h-full rounded-lg"
              resizeMode="cover"
            />
          </View>
          <View className="flex justify-center flex-1 ml-3 gap-y-1">
            <Text
              className="font-psemibold text-sm text-white"
              numberOfLines={1}
            >
              {title}
            </Text>
            <Text
              className="text-xs text-gray-100 font-pregular"
              numberOfLines={1}
            >
              {username}
            </Text>
          </View>
        </View>
        <View className="pt-2">
          <Image source={icons.menu} className="w-5 h-5" resizeMode="contain" />
        </View>
      </View>
      {play ? (
        <Video
          source={{ uri: video }}
          className="w-full h-60 rounded-xl mt-3"
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
          shouldPlay
          onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
          // onPlaybackStatusUpdate={status => setStatus(() => status)}
        />
      ) : (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={handlePress} // Use the handlePress function here
          className="w-full h-60 rounded-xl mt-3 relative flex justify-center items-center"
        >
          <Image
            source={{ uri: thumbnail }}
            className="w-full h-full rounded-xl mt-3"
            resizeMode="cover"
          />
          <Image
            source={icons.play}
            className="w-12 h-12 absolute"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default VideoCard;
