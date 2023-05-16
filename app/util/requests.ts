import { coinType, coinView, globalType, coinHistoryType } from './types'
import { cache } from 'react'

// COINS

export const getGlobal = cache(async (): Promise<globalType> => {
	const response = await fetch('https://api.coingecko.com/api/v3/global')
	return response.json()
})

export const getCoins = cache(async (): Promise<coinType[]> => {
	const response = await fetch(
		'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&price_change_percentage=1h,24h,7d,30d'
	)
	return response.json()
})

export const getCoin = async (coinId: string): Promise<coinView> => {
	const response = await fetch(
		`https://api.coingecko.com/api/v3/coins/${coinId}`
	)
	return response.json()
}

export const getCoinHistory = async (
	coinId: string
): Promise<coinHistoryType[]> => {
	const reponse = await fetch(
		`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=360&interval=daily`
	)
	return reponse.json()
}

export const getUserLikes = async () => {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_HOST_URL}/api/likes`,
		{
			method: 'GET',
		}
	)
	return response.json()
}

export const getUserLike = async (coinId: string) => {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_HOST_URL}/api/like?coinId=${coinId}`,
		{
			method: 'GET',
		}
	)
	return response.json()
}

export const addUserLike = async (coinId: string) => {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_HOST_URL}/api/like?coinId=${coinId}`,
		{
			method: 'POST',
		}
	)

	return response.json()
}

export const removeUserLike = async (coinId: string) => {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_HOST_URL}/api/like?coinId=${coinId}`,
		{
			method: 'DELETE',
		}
	)

	return response.json()
}

// NEWS

export const getNews = async (coinId: string) => {
	const response = await fetch(
		`https://newsapi.org/v2/everything?q=${coinId}&sortBy=publishedAt&apiKey=${process.env.NEWS_API_KEY}`,
		{
			method: 'GET',
		}
	)

	return response.json()
}

export const getNewsHeadlines = async (coinId: string) => {
	const response = await fetch(
		`https://newsapi.org/v2/top-headlines?q=${coinId}&sources=techcrunch&apiKey=${process.env.NEWS_API_KEY}`,
		{
			method: 'GET',
		}
	)

	return response.json()
}

// POSTS

export const getPosts = async (coinId: string) => {
	try {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_HOST_URL}/api/posts?coinId=${coinId}`,
			{
				method: 'GET',
			}
		)

		return response.json()
	} catch (error) {
		return []
	}
}

export const addPost = async (
	content: string,
	coinId: string,
	bullish: boolean
) => {
	const response = await fetch(`${process.env.NEXT_PUBLIC_HOST_URL}/api/post`, {
		method: 'POST',
		body: JSON.stringify({ content, coinId, bullish }),
	})

	return response.json()
}

export const deletePost = async (postId: string) => {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_HOST_URL}/api/post?postId=${postId}`,
		{
			method: 'DELETE',
		}
	)

	return response.json()
}
