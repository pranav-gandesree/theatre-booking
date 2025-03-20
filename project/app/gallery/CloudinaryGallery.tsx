import { FC } from 'react';

const GalleryPage: FC = async () => {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    throw new Error("Cloudinary environment variables are missing");
  }

  let data = { resources: [] };

  try {
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/resources/search?expression=folder=shreyas&max_results=35`,
      {
        headers: {
          Authorization: `Basic ${Buffer.from(`${apiKey}:${apiSecret}`).toString('base64')}`
        }
      }
    );

    if (!res.ok) throw new Error(`Failed to fetch: ${res.statusText}`);

    data = await res.json();
    // console.log("Fetched data:", data);
  } catch (error) {
    console.error('Error fetching images:', error);
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:gap-6">
      {data?.resources?.map((image: any) => (
        <div key={image.public_id} className="group relative overflow-hidden rounded-xl">
          <div className="aspect-square sm:aspect-[4/3]">
            <img
              src={image.secure_url || "/placeholder.svg"}
              alt={image.public_id}
              className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </div>
      ))}
    </div>
  );
};

export default GalleryPage;
