"use client";
import React, { FC, useRef } from "react";
interface UploadProps {
  onUpload: (e: any) => void;
  usedrag: boolean;
  children?: React.ReactNode;
}
const Upload: FC<UploadProps> = ({ onUpload, usedrag, children }) => {
  const ref = useRef<any>(null);

  const click = () => {
    if (ref.current) {
      ref.current.click();
    } else {
      return;
    }
  };

  const onDrop = (e: any) => {
    e.preventDefault();
    e.stopPropagation();


  }
  return (
    <>
      <input
        type="file"
        onChange={(e) => {
          onUpload(e);
        }}
        name="upload-image"
        className="hidden"
        ref={ref}
      />
      <div onClick={click}>{children}</div>
    </>
  );
};

export default Upload;
