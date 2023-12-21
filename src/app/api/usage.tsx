import cloudinary from 'cloudinary';

export default async function handler(req: any, res: any) {
  const usage = await cloudinary.v2.api.usage().then(result => console.log(result));
  res.status(200).json(usage);
}