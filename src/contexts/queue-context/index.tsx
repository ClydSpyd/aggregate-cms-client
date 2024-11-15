"use client";
import { createContext, use } from "react";
import { QueueContextState, defaultQueueContextState } from "./types";
import { useLocalStorage } from "usehooks-ts";

const QueueContext = createContext<QueueContextState>(defaultQueueContextState);

export default function QueueProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queuedItems, setQueuedItems] = useLocalStorage<FeedItem[]>(
    "queuedItems",
    []
  );

  const retreiveQueueItem = (id: string) =>
    queuedItems.find((item) => item.id === id);

  const updateQueueItem = (id: string, payload: Partial<FeedItem>) => {
    console.log("updateQueueItem", id, payload);
    setQueuedItems((prev: FeedItem[]) =>
      prev.map((item) => (item.id === id ? { ...item, ...payload } : item))
    );
  };

  const addItemToQueue = (item: FeedItem) => {
    setQueuedItems((prev) => [...prev, item]);
  };
  
  const removeItemFromQueue = async (id: string) => {
    setQueuedItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <QueueContext.Provider
      value={{
        queuedItems,
        setQueuedItems,
        retreiveQueueItem,
        addItemToQueue,
        updateQueueItem,
        removeItemFromQueue,
      }}
    >
      {children}
    </QueueContext.Provider>
  );
}

export const useQueue = () => use(QueueContext);
