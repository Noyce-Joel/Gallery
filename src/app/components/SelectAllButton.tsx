import { SearchResult } from "../page";

export default function SelectAllButton({
  handleSelectAll,
  images,
  selected,
}: {
  handleSelectAll: () => void;
  images: SearchResult[];
  selected: SearchResult[];
}) {
  return (
    <>
      <button
        onClick={handleSelectAll}
        type="button"
        className="rounded-xl flex group-hover gap-3 p-2 px-3 text-md bg-gray-800 text-white hover:bg-[#dddbcb] hover:text-gray-800 shadow-sm "
      >
        {selected.length > 0 ? <span>Unselect</span> : <span className="whitespace-nowrap">Select all</span>}
      </button>
    </>
  );
}
