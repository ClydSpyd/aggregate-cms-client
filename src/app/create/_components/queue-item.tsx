import { MdOutlineOpenInNew } from "react-icons/md";
import Image from "next/image";
import { cn } from "@src/lib/utilities";
import { RxCross2 } from "react-icons/rx";
import { useQueue } from "@src/contexts/queue-context";
import StaggerContainer from "@/src/components/stagger-container";

export default function QueueItem({
  item,
  selected,
}: {
  item: FeedItem;
  selected: boolean;
}) {
  const { removeItemFromQueue } = useQueue();
  const handleDelete = () => removeItemFromQueue(item.id);
  const isCustom = item.articleSrc === "custom";

  return (
    <StaggerContainer>
      <div
        className={cn(
          "w-full border p-2 flex items-center gap-4 cursor-pointer rounded-sm transition-all duration-300 ease-out scale-100 hover:scale-[1.02] group relative",
          selected ? "bg-indigo-500 text-white" : ""
        )}
      >
        {/* <CiSquareRemove
        className={cn(
          "bg-white text-slate-500 absolute z-50 top-1 left-1 transition-all duration-300 ease-in-out opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto rounded-sm shadow-sm hover:scale-110 border border-slate-100"
        )}
        size={25}
      /> */}
        <div
          onClick={handleDelete}
          className={cn(
            "bg-white text-slate-500 absolute z-50 top-1 left-1 transition-all duration-300 ease-in-out opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto rounded-md shadow-lg hover:scale-110 border border-slate-200 p-[2px]"
          )}
        >
          <RxCross2 size={18} />
        </div>
        <div className="min-h-[80px] min-w-[80px] border relative bg-white">
          <Image
            layout="fill"
            objectFit="cover"
            src={item.imgUrl}
            alt={`${item.name}_logo`}
            onError={(e) => {console.log(e)}}
          />
        </div>
        <div className="grow">
          <h2 className="font-semibold clamp-3-lines">{item.name}</h2>
        </div>

        {!isCustom && (
          <a
            className={cn(
              selected ? "pointer-events-auto" : "pointer-events-none"
            )}
            href={item.url}
            target="_blank"
            rel="noreferrer"
          >
            <div
              className={cn(
                "h-[35px] w-[35px] flex items-center justify-center bg-white border border-white rounded-md cursor-pointer hover:bg-indigo-400 hover:border-white transition-all duration-300 group/open",
                selected
                  ? "pointer-events-all opacity-100"
                  : "opacity-0 pointer-events-none"
              )}
            >
              <MdOutlineOpenInNew
                size={20}
                className="text-indigo-600 group-hover/open:text-white"
              />
            </div>
          </a>
        )}
      </div>
    </StaggerContainer>
  );
}
