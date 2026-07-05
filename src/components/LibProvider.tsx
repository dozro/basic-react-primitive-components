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
	/**
	 * The secondary color of the library.
	 * @example { lightColor: "#0000FF", darkColor: "#FFFF00" }
	 */
	secondaryColor?: RyColorConfig
	/**
	 * The accent color of the library.
	 * This will be used for highlighted text, buttons, and other components that use the accent color.
	 * @example { lightColor: "#FF00FF", darkColor: "#00FFFF" }
	 */
	accentColor?: RyColorConfig
	secondaryAccentColor?: RyColorConfig
	/**
	 * The success color of the library.
	 * This will be used for success messages, success icons, and other components that use the success color.
	 * @example { lightColor: "#00FF00", darkColor: "#FF0000" }
	 */
	successColor?: RyColorConfig
	/**
	 * The warning color of the library.
	 * This will be used for warning messages, warning icons, and other components that use the warning color.
	 * @example { lightColor: "#FFFF00", darkColor: "#FF8C00" }
	 */
	warningColor?: RyColorConfig
	/**
	 * The error color of the library.
	 * This will be used for error messages, error icons, and other components that use the error color.
	 * @example { lightColor: "#FF0000", darkColor: "#DC3545" }
	 */
	errorColor?: RyColorConfig
	/**
	 * The info color of the library.
	 * This will be used for info messages, info icons, and other components that use the info color.
	 * @example { lightColor: "#17A2B8", darkColor: "#138496" }
	 */
	infoColor?: RyColorConfig
	neutralColor?: RyColorConfig
	surfaceColor?: RyColorConfig
	backgroundColor?: RyColorConfig
}

export interface RyLibBrandingCustomization {
	lazyLoadingText?: string
}

/**
 * Config for the component library
 */
export interface RyLibConfig {
	theme: RyThemeConfig
	customization?: RyLibBrandingCustomization
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

/**
 * Context provider component that initializes and manages the `RyLib` configuration
 * and dynamically injects theme colors as CSS custom properties (variables).
 *
 * ### Behavior
 * - Wraps the children with `RyLibConfigContext.Provider` to expose the configuration globally.
 * - Injects theme styles onto a root `div` element via a React `useRef`.
 * - Automatically updates the CSS custom properties whenever the `config.theme` reference changes.
 *
 * ### Generated CSS Variables
 * For each theme key (e.g., `primaryColor`), it strips the 'Color' suffix, converts it to lowercase,
 * and sets the following CSS variables on the root container:
 * - `--rylib-color-[name]-light`
 * - `--rylib-color-[name]-dark`
 *
 * @example
 * ```tsx
 * const myConfig: RyLibProviderProps['config'] = {
 *   theme: {
 *     primaryColor: { lightColor: '#3490dc', darkColor: '#1d68a7' }
 *   }
 * };
 *
 * const App = () => (
 *   <RyLibProvider config="{myConfig}">
 *     <MyComponent/>
 *   </RyLibProvider>
 * );
 * ```
 *
 * @param props - The component properties.
 * @param props.config - The global configuration object containing the theme settings.
 * @param props.children - The child components that will have access to the context and themed styles.
 *
 * @returns A context provider wrapped around a themed root `div` element.
 *
 * @author Rye
 */
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

/**
 * Returns the current library configuration from the context.
 * If the context is not available, it returns `null`.
 * @returns the config is existent
 * @see {@link RyLibProvider}
 */
export const useRyLibConfig = (): RyLibConfig | null => {
	const context = useContext(RyLibConfigContext)
	if (!context) return null
	return context
}
