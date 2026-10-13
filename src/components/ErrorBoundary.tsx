import { Component, type ErrorInfo, type ReactNode } from "react";

interface Props { children: ReactNode }
interface State { error: Error | null }

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Taskify render error", error, info);
  }

  render() {
    if (!this.state.error) return this.props.children;
    return (
      <main className="grid min-h-screen place-items-center bg-secondaryBackground px-6 text-center">
        <div className="max-w-md rounded-2xl bg-white p-8 shadow-xl">
          <h1 className="text-2xl font-bold text-primaryText">Something went wrong</h1>
          <p className="mt-3 text-secondaryText">Taskify couldn't display this page. Refresh it to try again.</p>
          <p className="mt-3 text-xs text-red-700">{this.state.error.message}</p>
          <button onClick={() => window.location.reload()} className="mt-6 rounded-lg bg-primary px-5 py-3 font-semibold text-white">Refresh page</button>
        </div>
      </main>
    );
  }
}
