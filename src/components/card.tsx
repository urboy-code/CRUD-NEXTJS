import Image from 'next/image';
import React from 'react';
import { DeleteButton, EditButton } from './SubmitButton';
import type { upload } from '@prisma/client';

const Card = ({ data }: { data: upload }) => {
  return (
    <div className="max-w-lg border border-gray-200 rounded-md shadow-lg bg-white">
      <div className="relative aspect-video">
        <Image src={data.image} alt={data.title} fill priority className="object-cover rounded-t-md" />
      </div>
      <div className="p-5">
        <h1 className="text-2xl font-bold text-slate-700 truncate">{data.title}</h1>
      </div>
      <div className="flex items-center justify-between p-5 text-white">
        <EditButton id={data.id} />
        <DeleteButton id={data.id} />
      </div>
    </div>
  );
};

export default Card;
