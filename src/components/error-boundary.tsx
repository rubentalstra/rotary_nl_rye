import { Component, type ErrorInfo, type ReactNode } from "react";
import { View, Text, Pressable } from "react-native";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught:", error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <View className="flex-1 items-center justify-center bg-background p-6">
          <Text className="mb-2 text-2xl font-bold text-foreground">Oeps!</Text>
          <Text className="mb-6 text-center text-base text-foreground-secondary">
            Er is iets misgegaan. Probeer het opnieuw.
          </Text>
          <Pressable onPress={this.handleReset} className="rounded-lg bg-primary px-6 py-3">
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
