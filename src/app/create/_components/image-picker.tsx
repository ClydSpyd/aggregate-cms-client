import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { BsQuestionCircle } from "react-icons/bs";
import { MdOutlineFileUpload } from "react-icons/md";
import API from "@/api";
import spinner from '@root/loaders/spinner-grey.svg';

interface PickerProps {
  moduleTitle: string;
  defaultImageSrc: string | null;
  onChange: (imgSrc: string) => void;
  altText?: string;
}
function ImagePicker({
  moduleTitle,
  defaultImageSrc,
  altText,
  onChange
}: PickerProps) {
    const [imgSrc, setImgSrc] = useState<string>(defaultImageSrc ?? "");
    const [loading, setLoading] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() =>{
      setImgSrc("");
        if(defaultImageSrc){
          setImgSrc(defaultImageSrc);
        }
    },[defaultImageSrc])

    const handleImgChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
      setLoading(true);
        const file = e.target.files?.[0];
        if (file) {
          const { data, error } = await API.upload.image(file);
          if(data){
            setImgSrc(data.url);
            onChange(data.url);
          } else {
            console.log(error);
          }
        }
      setLoading(false);
    }

    const handleInputClick = () => {
        inputRef.current?.click();
    }


  return (
    <div className="w-full h-full border p-1 flex flex-col relative group">
      <input
        className="relative z-50"
        ref={inputRef}
        onChange={handleImgChange}
        type="file"
        name="img_input"
        accept="image/png, image/jpeg, image/jpg"
        hidden
      />
      <p className="text-xs text-[#a0a0a0] mb-1">{moduleTitle}:</p>
      <div
        onClick={handleInputClick}
        className="grow w-full border relative cursor-pointer z-1"
      >
        <div className="absolute h-full w-full bg-indigo-400/90 flex flex-col items-center opacity-0 group-hover:opacity-100 group-active:bg-indigo-600/90 justify-center z-20 transition-all duration-300 ease-out">
          <MdOutlineFileUpload size={40} color="#ffffff" />
          <p className="text-sm text-[#ffffff] font-bold">Upload Image</p>
        </div>
        {loading ? (
          <div className="h-full w-full border flex items-center justify-center">
            <Image src={spinner} alt="loading-spinner" height={35} width={35} />
          </div>
        ) : imgSrc ? (
          <Image
            style={{ zIndex: 1 }}
            layout="fill"
            objectFit="contain"
            src={imgSrc}
            alt={altText ?? `${moduleTitle}_image`}
          />
        ) : (
          <div className="h-full w-full border flex items-center justify-center">
            <BsQuestionCircle className="text-slate-400" />
          </div>
        )}
      </div>
    </div>
  );
}
 export default dynamic(() => Promise.resolve(ImagePicker), {
   ssr: false,
   loading: () => <div className="h-full w-full border"></div>,
 });