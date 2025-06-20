'use client';

import { useFormStatus } from 'react-dom';
import clsx from 'clsx';
import Link from 'next/link';
import { deleteImage } from '@/libs/action';

const DellButton = () => {
  const { pending } = useFormStatus();
  return (
    <button disabled={pending} type="submit">
      {pending ? 'Deleting...' : 'Delete'}
    </button>
  );
};

export const SubmitButton = ({ label }: { label: string }) => {
  const { pending } = useFormStatus();
  return (
    <div className="flex gap-4">
      <button
        className={clsx('bg-blue-500 text-white w-full font-medium py-2.5 px-6 text-base rounded-sm', {
          'opacity-50 cursor-not-allowed': pending,
        })}
        disabled={pending}
        type="submit"
      >
        {label == 'upload' ? <>{pending ? 'Uploading...' : 'Upload'}</> : <>{pending ? 'Updateing...' : 'Update'}</>}
      </button>
      <Link
        href={'/'}
        className="bg-red-500 text-white text-center w-full font-medium py-2.5 px-6 text-base rounded-sm"
      >
        cancel
      </Link>
    </div>
  );
};

export const EditButton = ({ id }: { id: string }) => {
  return (
    <Link href={`edit/${id}`} className="py-3 px-8 bg-blue-500 rounded-md text-center">
      Edit
    </Link>
  );
};
export const DeleteButton = ({ id }: { id: string }) => {
  const deleteImageId = deleteImage.bind(null, id);
  return (
    <form action={deleteImageId} className="py-3 px-8 bg-blue-500 rounded-md text-center">
      <DellButton />
    </form>
  );
};
