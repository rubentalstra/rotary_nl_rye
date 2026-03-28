import { type ReactNode } from "react";
import { View, Text, Pressable } from "react-native";
import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { ErrorBoundary as ReactErrorBoundary } from "./error-boundary";

interface Props {
  children: ReactNode;
}

/**
 * Error boundary that integrates with TanStack Query.
 * When the user taps retry, failed queries are reset and re-fetched.
 */
export function QueryErrorBoundary({ children }: Props) {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <QueryErrorBoundaryInner onReset={reset}>
          {children}
        </QueryErrorBoundaryInner>
      )}
    </QueryErrorResetBoundary>
  );
}

interface InnerProps {
  children: ReactNode;
  onReset: () => void;
}

class QueryErrorBoundaryInner extends ReactErrorBoundary {
  declare props: InnerProps & { children: ReactNode };

  handleReset = () => {
    (this.props as InnerProps).onReset();
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <View className="flex-1 items-center justify-center bg-background p-6">
          <Text className="mb-2 text-2xl font-bold text-foreground">
            Oeps!
          </Text>
          <Text className="mb-6 text-center text-base text-foreground-secondary">
            Er is iets misgegaan bij het laden van de gegevens.
          </Text>
          <Pressable
            onPress={this.handleReset}
            className="rounded-lg bg-primary px-6 py-3"
          >
            <Text className="text-base font-semibold text-primary-foreground">
              Opnieuw proberen
            </Text>
          </Pressable>
        </View>
      );
    }

    return this.props.children;
  }
}
