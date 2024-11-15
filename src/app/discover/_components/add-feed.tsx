/* eslint-disable react-hooks/exhaustive-deps */
import ImagePicker from "@src/app/create/_components/image-picker";
import InputField from "@src/components/input-field";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { CgAdd } from "react-icons/cg";
import { GrClose } from "react-icons/gr";

const defaultData: RssSource = {
  name: "",
  url: "",
  imgUrl: "",
  jsonResponse: false,
};

export default function AddFeed() {
    const [feedData, setFeedData] = useState<RssSource>(defaultData);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const handleBtn = () => setModalOpen((prev: boolean) => !prev);

  //   useEffect(() => {
  //     const callback = (e: React.KeyboardEvent) => {
  //       console.log(e);
  //       if (e.key === "Escape") {
  //         setModalOpen(false);
  //       }
  //     }
  //     window.addEventListener("keydown", callback);

  //     return () => window.removeEventListener("keydown", callback);
  //   },[])

  useEffect(() => {
    console.log(feedData.url.slice(feedData.url.length - 5));
    setFeedData((prev: RssSource) => ({
      ...prev,
      jsonResponse:
        feedData.url.slice(feedData.imgUrl.length - 5) === ".json",
    }));
  },[feedData.url])

  useEffect(() => {
    if (!modalOpen) setFeedData(defaultData);
  },[modalOpen])

  const handleInputChange = (value: string, key: keyof typeof feedData) => {
    setFeedData((prev: RssSource) => ({
      ...prev,
      [key]: value,
    }));
  };
  return (
    <>
      <div
        onClick={handleBtn}
        className="h-[30px] w-[110px] flex gap-1 items-center justify-center text-sm text-white bg-indigo-500 hover:bg-indigo-600 font-semibold rounded-[4px] cursor-pointer"
      >
        <CgAdd size={20} />
        add feed
      </div>
      {modalOpen &&
        createPortal(
          <div
            onClick={handleBtn}
            className="fixed h-screen w-screen flex items-center justify-center bg-slate-200/40 backdrop-blur-sm"
          >
            <div
              onClick={(e: React.MouseEvent) => {
                e.stopPropagation();
                console.log("öïo");
              }}
              className="h-[500px] w-[500px] bg-white shadow-md rounded-md relative p-3"
            >
              <div
                onClick={handleBtn}
                className="absolute top-[8px] right-[8px] border border-transparent rounded-sm p-[2px] group cursor-pointer hover:border-slate-300"
              >
                <GrClose size={14} className="text-slate-400" />
              </div>
              <h1 className="font-semibold text-indigo-500">Add New Feed</h1>
              <div className="w-full flex flex-col gap-2 mt-2">
                <InputField
                  placeholder={"Title"}
                  value={feedData.name}
                  onChange={(val: string) => handleInputChange(val, "name")}
                />
                <InputField
                  placeholder={"Feed URL"}
                  value={feedData.url}
                  onChange={(val: string) => handleInputChange(val, "url")}
                />
                <div className="h-[250px]">
                  <ImagePicker
                    moduleTitle="Feed Image"
                    defaultImageSrc={null}
                    altText="feed image"
                    onChange={(url: string) =>console.log(url, "imgUrl")}
                  />
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
