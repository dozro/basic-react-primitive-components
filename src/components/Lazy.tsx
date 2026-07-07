import React, { Suspense, ComponentType } from 'react'
import { InfoRow } from '$components/InfoRow'
import { Text } from '$components/Text'
import { SpinnerBallIcon } from '@phosphor-icons/react'
import { RyLibConfig, useRyLibConfig } from './LibProvider'

interface LazyProps {
	component: ComponentType
	loadingText?: string
}

/**
 * Wraps a lazy component in Suspense with a customizable loading message.
 * @author Rye
 */
const Lazy = ({ component: Component, loadingText }: LazyProps) => {
	const config: RyLibConfig | null = useRyLibConfig()
	const { lazyLoadingText: configLazyLoadingText } = config?.customization || {}
	const lazyLoadingFallbackText =
		loadingText ?? configLazyLoadingText ?? 'loading component....... meow'
	return (
		<Suspense
			fallback={
				<InfoRow icon={<SpinnerBallIcon />}>
					<Text variant="title">{lazyLoadingFallbackText}</Text>
				</InfoRow>
			}
		>
			<Component />
		</Suspense>
	)
}

export { Lazy, LazyProps }
export default Lazy
