"use client";
import { Dispatch, SetStateAction, useState } from "react";
import BrowseItem from "./_components/browse-item";
import BrowseFilters from "./_components/browse-filters";
import { ImWarning } from "react-icons/im";

interface BrowseProps {
  recentArticles: Article[];
  error: string | null;
  setError: Dispatch<SetStateAction<string | null>>;
}

export default function BrowseContent({
  recentArticles,
  error,
  setError,
}: BrowseProps) {
  const [filteredArticles, setFilteredArticles] = useState<Article[] | null>(
    null
  );
  console.log({ filteredArticles });

  return (
    <div className="w-full h-full flex gap-2 overflow-y-auto overflow-x-hidden box-border">
      <BrowseFilters
        setFilteredArticles={setFilteredArticles}
        setError={setError}
      />
      {error ? (
        <div className="grow h-full flex flex-col gap-2 items-center justify-center">
          <ImWarning className="text-indigo-500" size={40} />
          <p className="text-sm text-indigo-500">{error}</p>
        </div>
      ) : (
        <div className="overflow-y-auto grow grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 auto-rows-min gap-1">
          <div className="col-span-full">
            {filteredArticles ? (
              <p className="text-lg text-indigo-500 font-semibold text-slate-5000 mt-2">
                Filtered items:
              </p>
            ) : (
              <p className="text-lg text-indigo-500 font-semibold text-slate-5000 mt-2">
                Recent items:
              </p>
            )}
          </div>
          {filteredArticles?.length === 0 ? (
            <p>No items matching filters</p>
          ) : (
            (filteredArticles ?? recentArticles).map((article: Article) => (
              <BrowseItem key={article._id} article={article} />
            ))
          )}
        </div>
      )}
    </div>
  );
}
