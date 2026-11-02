import { Component, type ErrorInfo, type ReactNode } from 'react'

interface AppErrorBoundaryProps {
  children: ReactNode
}

interface AppErrorBoundaryState {
  hasError: boolean
}

export class AppErrorBoundary extends Component<
  AppErrorBoundaryProps,
  AppErrorBoundaryState
> {
  public state: AppErrorBoundaryState = { hasError: false }

  public static getDerivedStateFromError(): AppErrorBoundaryState {
    return { hasError: true }
  }

  public componentDidCatch(error: Error, info: ErrorInfo) {
    if (import.meta.env.DEV) {
      console.error('BUILD.OS render failure', error, info)
    }
  }

  public render() {
    if (this.state.hasError) {
      return (
        <main className="error-state">
          <p className="eyebrow">System recovery</p>
          <h1>BUILD.OS could not start.</h1>
          <p>Reload the page. If the problem continues, please try again later.</p>
          <button type="button" onClick={() => window.location.reload()}>
            Reload system
          </button>
        </main>
      )
    }

    return this.props.children
  }
}
