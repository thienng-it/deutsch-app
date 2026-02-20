import React from 'react';

interface State { hasError: boolean; error: string }

export default class ErrorBoundary extends React.Component<
    { children: React.ReactNode },
    State
> {
    state: State = { hasError: false, error: '' };

    static getDerivedStateFromError(err: Error): State {
        return { hasError: true, error: err.message };
    }

    render() {
        if (!this.state.hasError) return this.props.children;
        return (
            <div className="flex items-center justify-center min-h-[60vh] px-4">
                <div className="text-center max-w-md">
                    <div className="text-5xl mb-4">⚠️</div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Something went wrong</h2>
                    <p className="text-sm text-gray-500 mb-6">{this.state.error}</p>
                    <button
                        onClick={() => this.setState({ hasError: false, error: '' })}
                        className="btn-primary"
                    >
                        Try again
                    </button>
                </div>
            </div>
        );
    }
}
