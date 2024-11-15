import { cn } from "@src/lib/utilities";
import Image from "next/image";

export default function ListItem({
  item,
  selected
}: {
  item: Article;
  selected: boolean;
}) {

  return (
    <div
      className={cn(
        "w-full border p-2 flex items-center gap-4 cursor-pointer",
        selected ? "bg-lime-400" : ""
      )}
    >
      <div className="min-h-[80px] min-w-[80px] border relative">
        <Image
          layout="fill"
          objectFit="cover"
          src={item.imgUrl}
          alt={`${item.title}_logo`}
        />
      </div>
      <div className="grow">
        <h2 className="font-semibold">{item.title}</h2>
      </div>
    </div>
  );
}
