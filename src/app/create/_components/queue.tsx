"use client";
import { Dispatch, SetStateAction } from "react";
import QueueItem from "./queue-item";
import Link from "next/link";

export default function Queue({
  onSelect,
  selectedId,
  items,
}: {
  onSelect: Dispatch<SetStateAction<FeedItem | null>>;
  selectedId: string;
  items: FeedItem[];
}) {
  return items.length === 0 ? (
    <div className="h-full flex flex-col justify-center items-center pb-32">
      <p className="text-lg font-semibold text-gray-500">No items in queue</p>
      <Link href="/discover">
        <div className="mt-2 h-[45px] w-[180px] rounded-sm flex items-center justify-center cursor-pointer bg-indigo-500 hover:bg-indigo-600 text-white font-semibold">
          ADD ITEMS
        </div>
      </Link>
    </div>
  ) : (
    <div className="w-full grow flex flex-col gap-1 overflow-x-auto pl-2 pr-4">
      {items?.map((item: FeedItem) => (
        <div
          onClick={() => {
            onSelect(item);
          }}
          key={item.name}
        >
          <QueueItem item={item} selected={selectedId === item.id} />
        </div>
      ))
      }
    </div>
  );
}
