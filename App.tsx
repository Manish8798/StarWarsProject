import React from "react";
import { GluestackUIProvider, Text } from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";
import LaunchScreen from "./src/screens/LaunchScreen";

export default function App() {
  return (
    <GluestackUIProvider config={config}>
      <LaunchScreen/>
    </GluestackUIProvider>
  );
}