import { QueryClient, onlineManager, focusManager } from "react-query";
import NetInfo from "@react-native-community/netinfo";
// import useAppState from "react-native-appstate-hook";
import { AppStateStatus } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useRef } from "react";

const queryClient = new QueryClient();

function onAppStateChange(status: AppStateStatus) {
  focusManager.setFocused(status === "active");
}

export function useSetupQueryClient() {
  // Refresh queries on app focus
  // Source: https://react-query.tanstack.com/react-native#refetch-on-app-focus
  // TODO: add back without annoying error
  // useAppState({ onChange: onAppStateChange });

  return queryClient;
}

/**
 * Refresh query on screen focus
 * Source: https://react-query.tanstack.com/react-native#refresh-on-screen-focus
 * */
export function useRefreshOnFocus<T>(refetch: () => Promise<T>) {
  const enabledRef = useRef(false);

  useFocusEffect(
    useCallback(() => {
      if (enabledRef.current) refetch();
      else enabledRef.current = true;
    }, [refetch])
  );
}

// Autofetch queries on reconnect
// Source: https://react-query.tanstack.com/react-native#refetch-on-app-focus
onlineManager.setEventListener((setOnline) =>
  NetInfo.addEventListener(({ isConnected }) =>
    setOnline(isConnected === null ? undefined : isConnected)
  )
);
