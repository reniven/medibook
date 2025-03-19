"use client";

import { convertFileToUrl } from '@/lib/utils';
import Image from 'next/image';
import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'

type FileUploaderProps = {
    files: File[] | undefined;
    onChange: (files: File[]) => void;
}

export default function FileUploader({ files, onChange}: FileUploaderProps) {
  const onDrop = useCallback((acceptedFiles : File[]) => {
    // Do something with the files
    onChange(acceptedFiles); 
  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    <div {...getRootProps()} className="text-12-regular flex cursor-pointer  flex-col items-center justify-center gap-3 rounded-md border border-dashed border-dark-500 bg-dark-400 p-5">
      <input {...getInputProps()} />
      {files && files?.length > 0 ? (
        <Image 
            src={convertFileToUrl(files[0])} 
            width={1000} 
            height={1000} 
            alt="uploaded image"
            className="max-h-[400px] overflow-hidden object-cover"
        />
        ) : (
            <>
            <Image 
                src="/assets/icons/upload.svg" 
                width={24} 
                height={24} 
                alt="upload icon"
            />
            <div className=''>
                <p className="text-14-regular">
                    <span
                        className="text-green-500">
                            Click to upload
                        </span> or drag and drop
                </p>
                <p>
                    SVG, PNG, JPG, or GIF (max 800x400)
                </p>
            </div>
            </>
        )}
    </div>
  );
};