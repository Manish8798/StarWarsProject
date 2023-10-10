import React from "react";
import { GluestackUIProvider, Text } from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";

export default function App() {
  return (
    <GluestackUIProvider config={config}>
      <Text>Hello World!</Text>
    </GluestackUIProvider>
  );
}