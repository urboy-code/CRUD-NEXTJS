import Image from 'next/image';
import Link from 'next/link';
import Card from '@/components/card';
import { getImages } from '@/libs/data';

export default async function Home() {
  const images = await getImages();
  return (
    <div className="max-w-screen-2xl mx-auto py-14">
      <div className="flex items-end justify-between">
        <h1 className="text-4xl font-bold text-white">Latest Image</h1>
        <Link href={'/create'} className="py-3 px-6 bg-blue-500 hover:bg-blue-600 text-white">
          Upload New Image
        </Link>
      </div>
      <div className="grid md:grid-cols-3 gap-5 mt-10">
        {images.map((item) => (
          <Card key={item.id} data={item} />
        ))}
      </div>
    </div>
  );
}
