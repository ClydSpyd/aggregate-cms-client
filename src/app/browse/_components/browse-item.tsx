import StaggerContainer from "@/src/components/stagger-container";

export default function BrowseItem({article}: {article: Article}) {
  return (
    <StaggerContainer>
      <div
        key={article._id}
        className="bg-white shadow-sm p-2 border flex flex-col gap-2 rounded-sm h-full"
      >
        <p className="clamp-2-lines text-md text-indigo-500 font-semibold">
          {article.title}
        </p>
        <p className="clamp-1-line text-sm text-slate-500 font-light">
          {article.caption}
        </p>
        <div className="flex gap-1 flex-wrap">
          {article.tags.map((tag: string, idx: number) => (
            <div
              key={idx}
              className="h-fit bg-indigo-500 text-white px-2 text-xs rounded-2xl flex items-center gap-1"
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    </StaggerContainer>
  );
}
