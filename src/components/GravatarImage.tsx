import React from 'react'
import { type ImageProps, Image } from './Image'

type gravatarImageProps = ImageProps & {
	hashedEmail: string
	options?: {
		size?: number
		default?: string
		rating?: 'g' | 'pg' | 'r' | 'x'
	}
}

export const GravatarImage = ({ hashedEmail, options, ...props }: gravatarImageProps) => {
	const params = new URLSearchParams()

	if (options?.size) {
		params.set('s', options.size.toString())
	}

	if (options?.default) {
		params.set('d', options.default)
	}

	if (options?.rating) {
		params.set('r', options.rating)
	}

	const query = params.toString()
	const gravatarLink = `https://www.gravatar.com/avatar/${hashedEmail}${query ? `?${query}` : ''}`
	return (
		<Image
			src={gravatarLink}
			loading={props.loading ?? 'lazy'}
			alt={props.alt ?? `Gravatar Image for ${hashedEmail}`}
			{...props}
		/>
	)
}
