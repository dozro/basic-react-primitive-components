import React, { createContext, useContext, ReactNode, FC, useMemo, useId } from 'react'
import '../styles/rylib.module.scss'
import styles from '../styles/rylib.module.scss'

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

/**
 * A size configuration for the library, allowing customization of sizing units.
 */
export interface RySizeConfig {
	/**
	 * The base size in pixels for the library.
	 */
	rem?: number
}

export interface RyThemeConfig {
	/**
	 * The primary color of the library.
	 * This will be used for Text components, Input components, and other components that use the primary color.
	 * @example { lightColor: "#FF0000", darkColor: "#00FF00" }
	 * @default { light: '#000000', dark: '#ffffff' }
	 */
	primaryColor?: RyColorConfig
	/**
	 * The secondary color of the library.
	 * @example { lightColor: "#0000FF", darkColor: "#FFFF00" }
	 * @default { light: '#6c757d', dark: '#adb5bd' }
	 */
	secondaryColor?: RyColorConfig
	/**
	 * The accent color of the library.
	 * This will be used for highlighted text, buttons, and other components that use the accent color.
	 * @example { lightColor: "#FF00FF", darkColor: "#00FFFF" }
	 * @default { light: '#ff8c00', dark: '#375a7f' }
	 */
	accentColor?: RyColorConfig
	/**
	 * The secondary accent color for the library.
	 * @example { lightColor: "#FF00FF", darkColor: "#00FFFF" }
	 * @default { light: '#ff8c00', dark: '#375a7f' }
	 */
	secondaryAccentColor?: RyColorConfig
	/**
	 * The success color of the library.
	 * This will be used for success messages, success icons, and other components that use the success color.
	 * @example { lightColor: "#00FF00", darkColor: "#FF0000" }
	 * @default { light: '#28a745', dark: '#00bc8c' }
	 */
	successColor?: RyColorConfig
	/**
	 * The warning color of the library.
	 * This will be used for warning messages, warning icons, and other components that use the warning color.
	 * @example { lightColor: "#FFFF00", darkColor: "#FF8C00" }
	 * @default { light: '#ffc107', dark: '#f39c12' }
	 */
	warningColor?: RyColorConfig
	/**
	 * The error color of the library.
	 * This will be used for error messages, error icons, and other components that use the error color.
	 * @example { lightColor: "#FF0000", darkColor: "#DC3545" }
	 * @default { light: '#dc3545', dark: '#e74c3c' }
	 */
	errorColor?: RyColorConfig
	/**
	 * The info color of the library.
	 * This will be used for info messages, info icons, and other components that use the info color.
	 * @example { lightColor: "#17A2B8", darkColor: "#138496" }
	 * @default { light: '#17a2b8', dark: '#3498db' }
	 */
	infoColor?: RyColorConfig
	neutralColor?: RyColorConfig
	surfaceColor?: RyColorConfig
	/**
	 * The default background color
	 * @example { lightColor: "#17A2B8", darkColor: "#138496" }
	 * @default { light: '#ffffff', dark: '#111111' }
	 */
	backgroundColor?: RyColorConfig
}

/**
 * The sizing configuration for the library, allowing customization of sizing units.
 * This configuration can be used to set the base size for components, such as buttons, inputs, and other elements.
 */
export interface RySizingConfig {
	/**
	 * The border radius of the library.
	 * This will be used for buttons, inputs, and other components that use the border radius.
	 * @example { rem: 0.25 }
	 */
	borderRadius?: RySizeConfig
}

/**
 * The branding customization options for the library.
 */
export interface RyLibBrandingCustomization {
	/**
	 * The text to display as fallback when lazy loading components.
	 * @example "Loading..."
	 * @default "loading component....... meow"
	 */
	lazyLoadingText?: string
}

/**
 * Config for the component library
 */
export interface RyLibConfig {
	theme: RyThemeConfig
	isolateErrors?: boolean
	sizing?: RySizingConfig
	customization?: RyLibBrandingCustomization
}

/**
 * Default theme values for the library, used when no custom configuration is provided.
 * Each key corresponds to a color configuration in the `RyThemeConfig`.
 * The default values are provided for both light and dark themes.
 * @see {@link RyThemeConfig}
 */
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

const defaultSizingDefaults: RySizingConfig = {
	borderRadius: { rem: 0.25 },
}

const RyLibConfigContext = createContext<RyLibConfig | undefined>(undefined)

/**
 * Properties for the `RyLibProvider` component, which initializes and manages the library configuration.
 */
export interface RyLibProviderProps {
	/**
	 * The global configuration object containing the theme settings, sizing options, and branding customization.
	 * This configuration will be provided to all child components via context.
	 * @see {@link RyLibConfig}
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
	 * @default
	 * ```ts
	 *{
	 *   theme: {
	 *     primaryColor: { lightColor: '#000000', darkColor: '#ffffff' },
	 *     secondaryColor: { lightColor: '#6c757d', darkColor: '#adb5bd' },
	 *     accentColor: { lightColor: '#ff8c00', darkColor: '#375a7f' },
	 *     successColor: { lightColor: '#28a745', darkColor: '#00bc8c' },
	 *     warningColor: { lightColor: '#ffc107', darkColor: '#f39c12' },
	 *     errorColor: { lightColor: '#dc3545', darkColor: '#e74c3c' },
	 *     infoColor: { lightColor: '#17a2b8', darkColor: '#3498db' },
	 *     neutralColor: { lightColor: '#f8f9fa', darkColor: '#303030' },
	 *     surfaceColor: { lightColor: '#ffffff', darkColor: '#222222' },
	 *     backgroundColor: { lightColor: '#ffffff', darkColor: '#111111' },
	 *     secondaryAccentColor: { lightColor: '#ff8c00', darkColor: '#375a7f' },
	 *   },
	 *   sizing: {
	 *     borderRadius: { rem: 0.25 }
	 *   },
	 *   customization: {
	 *     lazyLoadingText: "loading component....... meow"
	 *   }
	 * }
	 * ```
	 */
	config: RyLibConfig
	/**
	 * The child components. In most cases this is the rest of your application.
	 */
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
	const scopeId = useId().replace(/:/g, '')
	const scopeClass = `rylib-scope-${scopeId}`

	const toSnakeCase = (str: string) => str.replace(/([a-z0-9])([A-Z])/g, '$1_$2').toLowerCase()

	const dynamicCss = useMemo(() => {
		const styles: string[] = []

		if (config.theme) {
			Object.entries(config.theme).forEach(([key, colorConfig]) => {
				if (!colorConfig) return
				const cssBaseName = toSnakeCase(key.replace('Color', ''))

				if (colorConfig.lightColor) {
					styles.push(
						`.${scopeClass} { --rylib-color-${cssBaseName}-light: ${colorConfig.lightColor}; }`,
					)
				}
				if (colorConfig.darkColor) {
					styles.push(
						`.${scopeClass} { --rylib-color-${cssBaseName}-dark: ${colorConfig.darkColor}; }`,
					)
				}
			})
		}

		if (config.sizing) {
			const sizingStyles: string[] = []
			Object.entries(config.sizing).forEach(([key, sizeConfig]) => {
				if (sizeConfig?.rem !== undefined) {
					const cssBaseName = toSnakeCase(key.replace('Size', ''))
					sizingStyles.push(`--rylib-size-${cssBaseName}-rem: ${sizeConfig.rem}rem;`)
				}
			})
			if (sizingStyles.length > 0) {
				styles.push(`.${scopeClass} { ${sizingStyles.join(' ')} }`)
			}
		}

		return styles.join('\n')
	}, [config.theme, config.sizing, scopeClass])

	return (
		<RyLibConfigContext.Provider value={config}>
			{dynamicCss && <style dangerouslySetInnerHTML={{ __html: dynamicCss }} />}

			<div className={`${styles['rylib-theme-root']} ${scopeClass}`} data-ry-theme="light">
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
