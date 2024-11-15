/* eslint-disable @next/next/no-img-element */
"use client";
import { rssSources } from "@/api/rss-sources";
import API from "@/api";
import { useEffect, useState } from "react";
import ListItem from "./list-item";
import { cn } from "@src/lib/utilities";
import spinner from '@root/loaders/spinner-indigo.svg';
import Image from "next/image";
import { ImWarning } from "react-icons/im";
import AddFeed from "./_components/add-feed";

export default function DiscoverPage() {
  const [mapItems, setMapItems] = useState<FeedItem[]>([]);
  const [selectedSource, setSelectedSource] = useState<RssSource | null>(rssSources[0]);
  const [loading, setLoading] = useState<boolean>(false);
  const [fetchError, setFetchError] = useState<null|string>(null)

  useEffect(() => {
    if(selectedSource) fetchRssData(selectedSource.url, !!selectedSource.jsonResponse);
  }, [selectedSource]);

  const fetchRssData = async (url: string, isJSON: boolean) => {
    setLoading(true);
    setFetchError(null);
    if (!isJSON) {
      const { data: rssData, error } = await API.feed.rss(url);
      if (rssData) setMapItems(rssData);
      else if (error) {setFetchError(error)};
    } else {
      const { data: jsonData, error } = await API.feed.json(url);
      if (jsonData) setMapItems(jsonData);
      else if (error) {
        setFetchError(error);
      }
    }
    setLoading(false);
  };

  return (
    <div className="w-screen h-full flex">
      <div className="flex flex-col min-w-[500px] max-w-[500px] h-full py-1 rounded-sm">
        <div className="flex items-center justify-between mb-1 pl-2 pr-4">
          <h4 className="font-semibold text-sm text-indigo-600">
            Article Feeds:
          </h4>
          <AddFeed />
        </div>
        <div className="w-full grow flex flex-col gap-1 overflow-x-auto pl-2 pr-4">
          {rssSources.map((source: RssSource) => {
            const isSelected = selectedSource?.name === source.name;
            return (
              <div
                onClick={() => setSelectedSource(source)}
                key={source.name}
                className={cn(
                  "w-full border p-2 flex items-center gap-4 cursor-pointer transition-all duration-300 ease-out scale-100 hover:scale-[1.02]",
                  isSelected ? "bg-indigo-500 text-white" : ""
                )}
              >
                <img
                  className="h-[80px] w-[80px] border bg-white"
                  src={source.imgUrl}
                  alt={`${source.name}_logo`}
                />
                <h2 className="font-semibold">{source.name}</h2>
              </div>
            );
          })}
        </div>
      </div>
      {fetchError ? (
        <div className="grow flex flex-col items-center justify-center gap-2">
          <ImWarning className="text-indigo-500" size={40} />
          <p className="text-sm text-indigo-500">{fetchError}</p>
        </div>
      ) : (
        <div className="grow h-full p-4 py-0 flex flex-col gap-1 overflow-y-scroll">
          {loading ? (
            <div className="h-full w-full flex flex-col items-center justify-center gap-1">
              <Image
                src={spinner}
                alt="loading-spinner"
                height={40}
                width={40}
              />
              <p className="text-sm text-slate-600">loading feed</p>
            </div>
          ) : (
            mapItems?.map((item: FeedItem) => (
              <ListItem
                key={item.name}
                item={item}
                buttons={{ open: true, add: true }}
                selected={false}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
}
