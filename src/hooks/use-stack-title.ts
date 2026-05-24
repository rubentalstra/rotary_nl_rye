import { useNavigation } from "expo-router";
import { useLayoutEffect } from "react";

/**
 * Set the parent Stack screen's title. Equivalent to writing
 * `<Stack.Screen options={{ title }} />` inline but works with any component
 * shape — including screens whose body returns different JSX for loading /
 * error / loaded states.
 */
export function useStackTitle(title: string): void {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({ title });
  }, [navigation, title]);
}
