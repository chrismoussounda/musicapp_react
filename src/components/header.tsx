import { CirclePlay, Search } from "lucide-react";
import { useSearchStore } from "@/hooks/use-search-store";
import { Input } from "./ui/input";
import { useLocation } from "react-router-dom";

const Header = () => {
  const { searchTerm, setSearchTerm } = useSearchStore();
  const location = useLocation();
  const isPlaylistItem = location.pathname.match("/playlist/");

  return (
    <header className="flex items-center justify-between border-b px-6 py-4">
      <div className="flex items-center justify-center p-3">
        <CirclePlay className="h-10 w-10" />
        <span className="ml-2 text-2xl font-bold">MusicApp</span>
      </div>
      {isPlaylistItem && (
        <div className="flex items-center">
          <Search className="mr-2 h-4 w-4 text-gray-500" />
          <Input
            className="w-[300px]"
            placeholder="Search for songs, artists, or albums..."
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      )}
    </header>
  );
};

export default Header;
