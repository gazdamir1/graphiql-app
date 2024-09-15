"use client";
import React from "react";
import { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public handleRetry = () => {
    location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            backgroundColor: "#1f1f1f",
            display: "flex",
            height: "100vh",
            width: "100vw",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <h1 style={{ color: "#9cdcf0" }}>
            Error, check console for more info
          </h1>
          <button onClick={this.handleRetry}>Retry Search</button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
