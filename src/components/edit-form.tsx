'use client';

import React, { useActionState } from 'react';
import { updateImage } from '@/libs/action';
import { SubmitButton } from './SubmitButton';
import { upload } from '@prisma/client';

const EditForm = ({ data }: { data: upload }) => {
  const [state, formAction] = useActionState(updateImage.bind(null, data.id), null);
  return (
    <form action={formAction}>
      <div className="mb-4 pt-2">
        <input
          type="text"
          name="title"
          placeholder="Title"
          className="py-2 px-4 rounded-sm border border-gray-400 w-full"
          defaultValue={data.title}
        />
        {/* pesan error dari state */}
        <div aria-live="polite" aria-atomic="true">
          <p className="text-sm text-red-500 mt-2">{state?.error?.title}</p>
        </div>
      </div>
      <div className="mb-4 pt-2">
        <input
          type="file"
          name="image"
          className="file:py-2 file:px-4 file:rounded-sm border-0 file:bg-gray-100 border-gray-400 file:mr-4 hover:file:bg-gray-300 w-full"
        />
        <div aria-live="polite" aria-atomic="true">
          <p className="text-sm text-red-500 mt-2">{state?.error?.image}</p>
        </div>
      </div>
      <div className="mb-4 pt-4">
        <SubmitButton label="update" />
      </div>
    </form>
  );
};

export default EditForm;
