'use server';

import z from 'zod';
import { del, put } from '@vercel/blob';
import { prisma } from '@/libs/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { getImagesById } from './data';

const UploadSchema = z.object({
  title: z.string().min(1),
  image: z
    .instanceof(File)
    .refine((file) => file.size > 0, { message: 'Image is required' })
    .refine((file) => file.size === 0 || file.type.startsWith('image/'), { message: 'File must be an image' })
    .refine((file) => file.size < 4000000, { message: 'Image size must be less than 4MB' }),
});

const EditSchema = z.object({
  title: z.string().min(1),
  image: z
    .instanceof(File)
    .refine((file) => file.size === 0 || file.type.startsWith('image/'), { message: 'File must be an image' })
    .refine((file) => file.size < 4000000, { message: 'Image size must be less than 4MB' })
    .optional(),
});

export const uploadImage = async (prevState: unknown, formData: FormData) => {
  const validateFields = UploadSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!validateFields.success) {
    return {
      error: validateFields.error.flatten().fieldErrors,
    };
  }

  const { title, image } = validateFields.data;
  const { url } = await put(image.name, image, {
    access: 'public',
    multipart: true,
  });

  try {
    await prisma.upload.create({
      data: {
        title,
        image: url,
      },
    });
  } catch (error) {
    return { message: 'Failed to upload image' };
  }

  revalidatePath('/');
  redirect('/');
};

// update Image
export const updateImage = async (id: string, prevState: unknown, formData: FormData) => {
  const validateFields = EditSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!validateFields.success) {
    return {
      error: validateFields.error.flatten().fieldErrors,
    };
  }

  const data = await getImagesById(id);

  if (!data) {
    return { message: 'Image not found' };
  }

  const { title, image } = validateFields.data;
  let imagePath;
  if (!image || image.size <= 0) {
    imagePath = data.image;
  } else {
    await del(data.image);
    const { url } = await put(image.name, image, {
      access: 'public',
      multipart: true,
    });

    imagePath = url;
  }

  try {
    await prisma.upload.update({
      data: {
        title,
        image: imagePath,
      },
      where: { id },
    });
  } catch (error) {
    return { message: 'Failed to Update data' };
  }

  revalidatePath('/');
  redirect('/');
};

// delete Image
export const deleteImage = async (id: string) => {
  const data = await getImagesById(id);

  if (!data) {
    return { message: 'Image not found' };
  }

  await del(data.image);
  try {
    await prisma.upload.delete({
      where: { id },
    });
  } catch (error) {
    return { message: 'fail to delete data' };
  }

  revalidatePath('/');
};
