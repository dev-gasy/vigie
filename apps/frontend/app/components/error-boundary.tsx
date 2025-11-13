import React from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{ error: Error; retry: () => void }>;
}

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  retry = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      const FallbackComponent = this.props.fallback;
      
      if (FallbackComponent && this.state.error) {
        return <FallbackComponent error={this.state.error} retry={this.retry} />;
      }

      return (
        <div className="min-h-[400px] flex items-center justify-center p-4">
          <Card className="w-full max-w-md">
            <CardContent className="pt-6 text-center">
              <AlertTriangle className="h-12 w-12 text-destructive mx-auto mb-4" />
              <h2 className="text-lg font-semibold mb-2">Something went wrong</h2>
              <p className="text-muted-foreground mb-4">
                An unexpected error occurred. Please try refreshing the page.
              </p>
              <div className="flex gap-2 justify-center">
                <Button onClick={this.retry} variant="outline" className="gap-2">
                  <RefreshCw className="h-4 w-4" />
                  Try Again
                </Button>
                <Button onClick={() => window.location.reload()}>
                  Reload Page
                </Button>
              </div>
              {process.env.NODE_ENV === "development" && this.state.error && (
                <details className="mt-4 text-left">
                  <summary className="cursor-pointer text-sm text-muted-foreground">
                    Error details
                  </summary>
                  <pre className="mt-2 p-2 bg-muted rounded text-xs overflow-auto">
                    {this.state.error.stack}
                  </pre>
                </details>
              )}
            </CardContent>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}