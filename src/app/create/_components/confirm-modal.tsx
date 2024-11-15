import Link from "next/link";

export default function ConfirmModal({
  handleDismiss,
}: {
  handleDismiss: () => void;
}) {
  return (
    <div className="absolute h-full w-full bg-gray-400/10 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="w-[350px] py-4 px-6 bg-white rounded-md flex items-center justify-center flex-col gap-3 shadow-lg text-center">
        <h4 className="font-regular">Article saved to database</h4>
        <p className="text-sm text-gray-400">
          In order to preview or edit the article, head over to the{" "}
          <Link onClick={handleDismiss} className="text-indigo-600 font-semibold" href={"/browse"}>
            browse
          </Link>{" "}
          tab
        </p>
        <div
          onClick={handleDismiss}
          className="cursor-pointer h-[40px] w-[170px] flex items-center justify-center text-white bg-indigo-600 hover:bg-indigo-700 rounded-md"
        >
          DISMISS
        </div>
      </div>
    </div>
  );
}
