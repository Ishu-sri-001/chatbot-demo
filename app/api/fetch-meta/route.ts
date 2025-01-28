
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const url = req.query.url as string
  
  if (!url) {
    return res.status(400).json({ error: 'URL parameter is required' })
  }

  try {
    const response = await fetch(url)
    const html = await response.text()
    
    // Simple regex to extract meta description
    const metaMatch = html.match(/<meta[^>]*name="description"[^>]*content="([^"]*)"[^>]*>/i)
    const metaDescription = metaMatch ? metaMatch[1] : ''

    return res.status(200).json({ metaDescription })
  } catch (error) {
    console.error('Error fetching meta description:', error)
    return res.status(500).json({ error: 'Failed to fetch meta description' })
  }
}