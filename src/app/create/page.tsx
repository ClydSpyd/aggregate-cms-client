"use client";
import TextEditor from "@src/components/text-editor";
import { useQueue } from "@src/contexts/queue-context";
import dynamic from "next/dynamic";
import TagSelector from "@src/components/tag-selector";
import { useIsFirstRender } from "@src/hooks/isFirstRender";
import ConfirmModal from "./_components/confirm-modal";
import useCreate from "./_hooks/useCreate";
import { cn } from "@src/lib/utilities";
import InputField from "@src/components/input-field";
import { useEffect, useState } from "react";
import ImagePicker from "./_components/image-picker";
import { CgAdd } from "react-icons/cg";
import spinner from "@root/loaders/spinner-indigo.svg";
import Image from "next/image";
import { v4 as uuidv4 } from 'uuid';

const Queue = dynamic(() => import("./_components/queue"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex flex-col gap-1 items-center justify-center pb-16">
      <Image src={spinner} alt="loading-spinner" height={30} width={30} />
      <p className="text-xs">Loading queue</p>
    </div>
  ),
});
export default function CreatePage() {
  const isFirstRender = useIsFirstRender()
  const { queuedItems, setQueuedItems } = useQueue();
  const [emptyQueue, setEmptyQueue] = useState(false); 

  const {
    submitData,
    confirmSaved,
    formFilled,
    localFields,
    selectedArticle,
    saveCallback,
    handleDismiss,
    handleInputChange,
    handleTags,
    setSelectedArticle,
    handleImage,
  } = useCreate();

  
  useEffect(() => {
    setEmptyQueue(queuedItems.length === 0);
  }, [queuedItems]);

  const handleNewArticle = () => {
    const instance = queuedItems.filter(
      (item: FeedItem) => item.name.slice(0, 11) === "NEW ARTICLE"
    ).length;
    const newArticle: FeedItem = {
      name: `NEW ARTICLE ${instance + 1}`,
      url: String(Math.ceil(Math.random() * 20000)),
      // url: "",
      imgUrl: "/favicon.ico",
      articleSrc: "custom",
      id: uuidv4(),
    };
    setQueuedItems((prev: FeedItem[]) => [...prev, newArticle]);
    setSelectedArticle(newArticle);
  }

  return (
    queuedItems && (
      <div className="w-screen h-full flex">
        <div className="min-w-[500px] max-w-[500px] h-full py-1 rounded-sm">
          <div className="w-full flex items-center justify-between mb-1 px-2 pr-4">
            <h4 className="font-semibold text-sm text-indigo-600 mb-1">
              Queued items:
            </h4>
            <div
              onClick={handleNewArticle}
              className="h-[30px] w-[110px] flex gap-1 items-center justify-center text-sm text-white bg-indigo-500 hover:bg-indigo-600 font-semibold rounded-[4px] cursor-pointer"
            >
              <CgAdd size={20} />
              add article
            </div>
          </div>
          <Queue
            items={queuedItems}
            onSelect={setSelectedArticle}
            selectedId={selectedArticle?.id ?? ""}
          />
        </div>
        <div
          className={cn(
            "overflow-y-auto grow pr-4 flex flex-col gap-1 relative",
            emptyQueue
              ? "opacity-50 cursor-not-allowed [&_*]:pointer-events-none"
              : ""
          )}
        >
          <div
            className={cn(
              "h-full w-full cursor-not-allowed",
              emptyQueue ? "absolute block z-50" : "hidden z-0"
            )}
          />
          <div className="w-full flex flex-col gap-2 mb-1">
            <InputField
              placeholder="Article Title"
              value={localFields.title}
              onChange={(val: string) => handleInputChange(val, "title")}
            />
            <InputField
              placeholder="Caption"
              value={localFields.caption}
              onChange={(val: string) => handleInputChange(val, "caption")}
            />
            <div className="grid grid-cols-3 gap-2">
              <div className="col-span-2">
                <TagSelector
                  tags={localFields.tags}
                  setTags={(tags: string[]) => handleTags(tags)}
                />
              </div>
              <ImagePicker
                moduleTitle="Hero Image"
                defaultImageSrc={selectedArticle?.imgUrl ?? null}
                altText="hero"
                onChange={handleImage}
              />
            </div>
          </div>
          {selectedArticle && !isFirstRender && (
            <TextEditor
              saveCallback={saveCallback}
              postSubmistMsg={submitData.msg}
              isError={submitData.error}
              canSubmit={formFilled}
            />
          )}
          {confirmSaved && <ConfirmModal handleDismiss={handleDismiss} />}
        </div>
      </div>
    )
  );
}
