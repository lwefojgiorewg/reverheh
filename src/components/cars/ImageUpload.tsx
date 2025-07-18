'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';
import { useDropzone } from 'react-dropzone';
import { XMarkIcon, ArrowUpTrayIcon } from '@heroicons/react/24/outline';

interface ImageUploadProps {
  images: { url: string; alt?: string }[];
  onChange: (images: { url: string; alt?: string }[]) => void;
}

export default function ImageUpload({ images, onChange }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      try {
        setUploading(true);
        setError(null);

        // In a real application, you would upload these files to your storage service
        // For now, we'll create object URLs for preview
        const newImages = acceptedFiles.map((file) => ({
          url: URL.createObjectURL(file),
          alt: file.name,
        }));

        onChange([...images, ...newImages]);
      } catch (err) {
        setError('Failed to upload images. Please try again.');
      } finally {
        setUploading(false);
      }
    },
    [images, onChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp'],
    },
    maxSize: 5 * 1024 * 1024, // 5MB
  });

  const removeImage = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    onChange(newImages);
  };

  const reorderImages = (dragIndex: number, dropIndex: number) => {
    const newImages = [...images];
    const [draggedImage] = newImages.splice(dragIndex, 1);
    newImages.splice(dropIndex, 0, draggedImage);
    onChange(newImages);
  };

  return (
    <div className="space-y-4">
      {error && (
        <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          {error}
        </div>
      )}

      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
          ${
            isDragActive
              ? 'border-[#ff4c0c] bg-[#ff4c0c]/5'
              : 'border-gray-300 hover:border-[#ff4c0c] hover:bg-gray-50'
          }`}
      >
        <input {...getInputProps()} />
        <ArrowUpTrayIcon className="mx-auto h-12 w-12 text-gray-400" />
        <p className="mt-2 text-sm text-gray-600">
          {isDragActive
            ? 'Drop the files here...'
            : 'Drag and drop images here, or click to select files'}
        </p>
        <p className="mt-1 text-xs text-gray-500">
          Maximum file size: 5MB. Supported formats: JPEG, PNG, WebP
        </p>
      </div>

      {uploading && (
        <div className="text-center text-sm text-gray-600">Uploading images...</div>
      )}

      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <div
              key={index}
              className="relative group aspect-video bg-gray-100 rounded-lg overflow-hidden"
            >
              <Image
                src={image.url}
                alt={image.alt || 'Car image'}
                fill
                className="object-cover"
              />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-2 right-2 p-1 bg-black/50 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <XMarkIcon className="h-4 w-4" />
              </button>
              {index === 0 && (
                <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs py-1 px-2">
                  Primary Image
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 