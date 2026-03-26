import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { GlassCard } from './GlassCard';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      let errorMessage = 'An unexpected error occurred.';
      let isFirebaseError = false;

      try {
        if (this.state.error?.message) {
          const parsedError = JSON.parse(this.state.error.message);
          if (parsedError.error && parsedError.operationType) {
            errorMessage = `Firebase Error: ${parsedError.error} during ${parsedError.operationType} on ${parsedError.path || 'unknown path'}`;
            isFirebaseError = true;
          }
        }
      } catch (e) {
        errorMessage = this.state.error?.message || errorMessage;
      }

      return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50">
          <GlassCard className="max-w-md w-full p-8 text-center space-y-6 border-brand-red/20 shadow-xl shadow-brand-red/5">
            <div className="w-20 h-20 rounded-3xl bg-brand-red/10 flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="text-brand-red w-10 h-10" />
            </div>
            <h2 className="text-2xl font-display font-bold text-text-main">
              Something went wrong
            </h2>
            <div className="p-4 rounded-2xl bg-slate-100 border border-border-light text-left overflow-auto max-h-40">
              <p className="text-sm font-mono text-text-muted break-words">
                {errorMessage}
              </p>
            </div>
            <p className="text-text-muted">
              {isFirebaseError 
                ? "This might be due to a connection issue or insufficient permissions. Please try again or contact support."
                : "We've logged the error and are looking into it. Please try refreshing the page."}
            </p>
            <button
              onClick={this.handleReset}
              className="w-full py-4 rounded-2xl bg-brand-primary text-white font-bold flex items-center justify-center gap-3 hover:shadow-lg hover:shadow-brand-primary/20 transition-all"
            >
              <RefreshCw className="w-5 h-5" />
              Refresh Application
            </button>
          </GlassCard>
        </div>
      );
    }

    return this.props.children;
  }
}
