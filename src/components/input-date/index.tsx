import { cn } from "@src/lib/utilities";
import { InputDateProps } from "./types";
import { useRef, useState } from "react";
import DatePicker from "react-datepicker";
import './date-picker.css'
import useOutsideClick from "@src/hooks/useOutsideClick";
import { TiDelete } from "react-icons/ti";

export default function InputDate({
  value,
  placeholder,
  onChange,
  additionalClass,
  withDeleteBtn,
  minValue,
  maxValue,
}: InputDateProps) {
  const [isFocused, setIsFocused] = useState(false);

  const pickerRef = useRef<DatePicker>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleContainerClick = () => !isFocused && setIsFocused(true);

  const handleChange = (date: Date | null) => {
    onChange(date);
    setIsFocused(false);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(null);
  };

  const getDayClass = (date:Date) => {
    let dayClass = date > new Date() ? "disabled" : "";
    if(minValue){
      dayClass =  date > new Date() || date < new Date(minValue) ? "disabled" : ""
    }
    if(maxValue){
      dayClass = date >= new Date(maxValue) ? "disabled" : "";
    }
    return dayClass;
  }

  useOutsideClick(containerRef, () => setIsFocused(false));

  return (
    <div
      ref={containerRef}
      onClick={handleContainerClick}
      className={cn(
        "cursor-text h-[60px] w-full flex items-center justify-center bg-white border rounded-sm relative",
        additionalClass ? `${additionalClass}` : ""
      )}
    >
      <p
        className={cn(
          "absolute left-[10px] transition-all duration-300 m-0 text-[#a0a0a0] z-50",
          !!value || isFocused ? "top-[8px] text-xs" : "top-[15px] text-lg"
        )}
      >
        {placeholder}
      </p>
      {isFocused && (
        <div className="absolute rounded-sm inset-0 z-5 shadow-[inset_0_0_0_2px_black]" />
      )}
      <div className="relative top-[8px]">
        <DatePicker
          disabled
          ref={pickerRef}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          selected={value}
          onChange={handleChange}
          open={isFocused}
          disabledKeyboardNavigation
          dateFormat="dd/MM/yyyy"
          dayClassName={getDayClass}
        />
      </div>
      {!!value && withDeleteBtn && (
        <TiDelete
          onClick={handleClear}
          size={23}
          className="absolute z-20 text-slate-400 hover:text-slate-600 cursor-pointer right-[2px]"
        />
      )}
    </div>
  );
}
