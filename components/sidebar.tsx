import { useBookmarkStore } from "@/state/bookmarkStore";

const Sidebar = () => {
  const { filterByType, currentFilter } = useBookmarkStore();

  const handleFilterChange = (type: string) => {
    // Toggle filter off if the same type is clicked again
    if (currentFilter === type) {
      filterByType("");
    } else {
      filterByType(type);
    }
  };

  return (
    <div className="w-64 bg-gray-800 text-white h-full p-5 flex flex-col">
      <h2 className="text-2xl font-semibold mb-8 text-center">
        Filter by Type
      </h2>

      <div className="flex flex-col gap-4">
        <div
          onClick={() => handleFilterChange("youtube")}
          className={`cursor-pointer py-2 px-4 rounded-lg hover:bg-primary/20 ${
            currentFilter === "youtube" ? "bg-primary/30" : ""
          }`}
        >
          YouTube
        </div>

        <div
          onClick={() => handleFilterChange("instagram")}
          className={`cursor-pointer py-2 px-4 rounded-lg hover:bg-primary/20 ${
            currentFilter === "instagram" ? "bg-primary/30" : ""
          }`}
        >
          Instagram
        </div>

        <div
          onClick={() => handleFilterChange("twitter")}
          className={`cursor-pointer py-2 px-4 rounded-lg hover:bg-primary/20 ${
            currentFilter === "twitter" ? "bg-primary/30" : ""
          }`}
        >
          Twitter
        </div>

        <div
          onClick={() => handleFilterChange("telegram")}
          className={`cursor-pointer py-2 px-4 rounded-lg hover:bg-primary/20 ${
            currentFilter === "telegram" ? "bg-primary/30" : ""
          }`}
        >
          Telegram
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
