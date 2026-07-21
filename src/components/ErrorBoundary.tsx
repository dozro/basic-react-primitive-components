import React, { Component, ErrorInfo, ReactNode } from 'react'
import { ErrorMessage } from './ErrorMessage'

interface CProps {
	children: ReactNode
	fallback?: ReactNode
}

interface CState {
	hasError: boolean
	error?: Error
}

export class ErrorBoundary extends Component<CProps, CState> {
	public state: CState = {
		hasError: false,
	}

	public static getDerivedStateFromError(error: Error): CState {
		return { hasError: true, error }
	}

	public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
		console.error('Uncaught error:', error, errorInfo)
	}

	public render() {
		if (this.state.hasError) {
			return (
				this.props.fallback || (
					<ErrorMessage error={this.state.error ?? new Error('unknown error')} />
				)
			)
		}

		return this.props.children
	}
}
