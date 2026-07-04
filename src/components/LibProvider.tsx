import React, { createContext, useContext, ReactNode, FC, useRef, useEffect } from 'react'

/**
 * A color value
 */
export interface RyColorConfig {
	/**
	 * the color value for the light theme
	 * @example "red"
	 * @example "#FF00FF"
	 */
	lightColor?: string
	/**
	 * the color value for the dark theme
	 * @example "white"
	 * @example "#00FF00"
	 */
	darkColor?: string
}

export interface RyThemeConfig {
	/**
	 * The primary color of the library.
	 * This will be used for Text components, Input components, and other components that use the primary color.
	 * @example { lightColor: "#FF0000", darkColor: "#00FF00" }
	 */
	primaryColor?: RyColorConfig
	secondaryColor?: RyColorConfig
	/**
	 * The accent color of the library.
	 * This will be used for highlighted text, buttons, and other components that use the accent color.
	 * @example { lightColor: "#FF00FF", darkColor: "#00FFFF" }
	 */
	accentColor?: RyColorConfig
	secondaryAccentColor?: RyColorConfig
	successColor?: RyColorConfig
	warningColor?: RyColorConfig
	errorColor?: RyColorConfig
	infoColor?: RyColorConfig
	neutralColor?: RyColorConfig
	surfaceColor?: RyColorConfig
	backgroundColor?: RyColorConfig
}

/**
 * Config for the component library
 */
export interface RyLibConfig {
	theme: RyThemeConfig
	lazyLoadingText?: string
}

const defaultThemeDefaults: Record<keyof RyThemeConfig, { light: string; dark: string }> = {
	primaryColor: { light: '#000000', dark: '#ffffff' },
	secondaryColor: { light: '#6c757d', dark: '#adb5bd' },
	accentColor: { light: '#ff8c00', dark: '#375a7f' },
	successColor: { light: '#28a745', dark: '#00bc8c' },
	warningColor: { light: '#ffc107', dark: '#f39c12' },
	errorColor: { light: '#dc3545', dark: '#e74c3c' },
	infoColor: { light: '#17a2b8', dark: '#3498db' },
	neutralColor: { light: '#f8f9fa', dark: '#303030' },
	surfaceColor: { light: '#ffffff', dark: '#222222' },
	backgroundColor: { light: '#ffffff', dark: '#111111' },
	secondaryAccentColor: { light: '#ff8c00', dark: '#375a7f' },
}

const RyLibConfigContext = createContext<RyLibConfig | undefined>(undefined)

export interface RyLibProviderProps {
	config: RyLibConfig
	children: ReactNode
}

export const RyLibProvider: FC<RyLibProviderProps> = ({ config, children }: RyLibProviderProps) => {
	const containerRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const container = containerRef.current
		if (!container) return

		const themeKeys = Object.keys(defaultThemeDefaults) as Array<keyof RyThemeConfig>

		themeKeys.forEach((key) => {
			const colorConfig = config.theme[key]
			const defaults = defaultThemeDefaults[key]

			const cssBaseName = key.replace('Color', '').toLowerCase()

			const lightValue = colorConfig?.lightColor ?? defaults.light
			const darkValue = colorConfig?.darkColor ?? defaults.dark

			container.style.setProperty(`--rylib-color-${cssBaseName}-light`, lightValue)
			container.style.setProperty(`--rylib-color-${cssBaseName}-dark`, darkValue)
		})
	}, [config.theme])

	return (
		<RyLibConfigContext.Provider value={config}>
			<div ref={containerRef} className="rylib-theme-root">
				{children}
			</div>
		</RyLibConfigContext.Provider>
	)
}

export const useRyLibConfig = (): RyLibConfig => {
	const context = useContext(RyLibConfigContext)
	if (!context) throw new Error('useRyLibConfig must be used within a RyLibProvider')
	return context
}
