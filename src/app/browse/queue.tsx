"use client";
import ListItem from "./list-item";
import { Dispatch, SetStateAction, Suspense } from "react";

export default function BrowseQueue({
  articles,
  onSelect,
  selectedId,
}: {
  articles: Article[];
  onSelect: Dispatch<SetStateAction<Article | null>>;
  selectedId: string;
}) {
  return (
    <Suspense fallback={<div>Loading queued items...</div>}>
      <div className="flex flex-col gap-1 pr-4">
        {articles.map((item: Article) => (
          <div
            onClick={() => {
              onSelect(item);
            }}
            key={item.title}
          >
            <ListItem item={item} selected={selectedId === item._id} />
          </div>
        ))}
      </div>
    </Suspense>
  );
}
