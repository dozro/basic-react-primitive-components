import React, { Component, ErrorInfo, ReactNode } from 'react'
import { ErrorMessage } from './ErrorMessage'

interface ErrorBoundaryProps {
	children: ReactNode
	enabled: boolean
	fallback?: ReactNode
	resetKeys?: Array<unknown>
}

interface ErrorBoundaryState {
	hasError: boolean
	error?: Error
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
	public override state: ErrorBoundaryState = {
		hasError: false,
		error: undefined,
	}

	public static getDerivedStateFromError(error: Error): ErrorBoundaryState {
		return { hasError: true, error }
	}

	public override componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
		console.error('Uncaught error:', error, errorInfo)
	}

	public override componentDidUpdate(prevProps: ErrorBoundaryProps): void {
		if (this.state.hasError && this.props.resetKeys) {
			const hasKeysChanged = this.props.resetKeys.some(
				(key, index) => key !== prevProps.resetKeys?.[index],
			)
			if (hasKeysChanged) {
				this.setState({ hasError: false, error: undefined })
			}
		}
	}

	public override render(): ReactNode {
		if (this.state.hasError && this.props.enabled) {
			if (this.props.fallback) {
				return this.props.fallback
			}
			return <ErrorMessage error={this.state.error ?? new Error('Unknown error')} />
		}

		return this.props.children
	}
}
