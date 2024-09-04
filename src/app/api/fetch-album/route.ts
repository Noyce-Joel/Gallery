import { NextApiRequest, NextApiResponse } from 'next';
import cloudinary from 'cloudinary';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Check the request method
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { albumName } = req.query;

  if (typeof albumName !== 'string') {
    return res.status(400).json({ error: 'Invalid album name' });
  }

  try {
    const results = await cloudinary.v2.search
      .expression(`resource_type:image AND tags:${albumName}`)
      .sort_by("uploaded_at", "desc")
      .with_field("tags")
      .max_results(40)
      .execute();

    res.status(200).json(results);
  } catch (error) {
    console.error('Error fetching album images:', error);
    res.status(500).json({ error: 'Failed to fetch album images' });
  }
}
