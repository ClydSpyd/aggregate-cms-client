"use client";
import InputField from "@src/components/input-field";
import TagSelector from "@src/components/tag-selector";
import InputDate from "@src/components/input-date";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { InputData } from "../types";
import { cn } from "@/src/lib/utilities";
import API from "@/api";

interface BrowseFiltersProps {
  setFilteredArticles: Dispatch<SetStateAction<Article[] | null>>;
  setError: Dispatch<SetStateAction<string | null>>;    
}

export default function BrowseFilters({
  setFilteredArticles,
  setError,
}: BrowseFiltersProps) {
  const [searchValues, setSearchValues] = useState<InputData>({
    text: "",
    tags: [],
  });
  const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(null);
  const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(null);
  const noFilters = searchValues.text === "" &&
  searchValues.tags.length === 0 &&
  !selectedStartDate &&
  !selectedEndDate
  
  useEffect(() => {
    if (noFilters) {
      setFilteredArticles(null);
    }
  }, [noFilters, setFilteredArticles]);

  const getFilteredArticles = async () => {
    const { data, error } = await API.article.getFilteredArticles(searchValues);
    if (data) setFilteredArticles(data);
    else if (error) setError(error);
  };

  const handleInputChange = (value: string, key: keyof typeof searchValues) => {
    setSearchValues((prev: InputData) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleTags = (tags: string[]) => {
    setSearchValues((prev: InputData) => ({
      ...prev,
      tags,
    }));
  };

  return (
    <div className="min-w-[450px] max-w-[450px] h-full p-2 border rounded-md flex flex-col gap-3 bg-slate-50">
      <p className="text-sm text-indigo-500 font-semibold text-slate-5000 mt-2">
        Browse database items
      </p>
      <div className="bg-white shadow-sm">
        <div className="border p-2 flex flex-col gap-2 pb-4">
          <p className="text-xs text-[#a0a0a0]">Title/caption text:</p>
          <InputField
            withDeleteBtn
            placeholder="enter text"
            value={searchValues.text}
            onChange={(val: string) => handleInputChange(val, "text")}
            additionalClass="border-gray-300"
          />
        </div>
      </div>
      <div className="shadow-sm">
        <TagSelector
          tags={searchValues.tags}
          setTags={(tags: string[]) => handleTags(tags)}
          additionalClass="border-gray-300"
        />
      </div>
      <div className="grid grid-cols-2 border p-2 pb-4 gap-2 bg-white shadow-sm pointer-events-none opacity-40">
        <p className="text-xs text-[#a0a0a0] col-span-2">Date created:</p>
        <InputDate
          maxValue={selectedEndDate}
          withDeleteBtn
          placeholder="From"
          value={selectedStartDate}
          onChange={(e: Date | null) => setSelectedStartDate(e)}
        />
        <InputDate
          minValue={selectedStartDate}
          withDeleteBtn
          placeholder="To"
          value={selectedEndDate}
          onChange={(e: Date | null) => setSelectedEndDate(e)}
        />
      </div>
      <div className="grow" />
      <div
        onClick={getFilteredArticles}
        className={cn("h-[60px] flex items-center justify-center text-white font-semibold transition-all duration-300 ease-in-out bg-indigo-500 hover:bg-indigo-600 cursor-pointer rounded-md", noFilters ? "opacity-40 pointer-events-none" : " opacity-100")}
      >
        APPLY FILTERS
      </div>
    </div>
  );
}
