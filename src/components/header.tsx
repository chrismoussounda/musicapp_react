import { Search } from "lucide-react";
import { useSearchStore } from "@/hooks/use-search-store";
import { Input } from "./ui/input";

const Header = () => {
  const { searchTerm, setSearchTerm } = useSearchStore();

  return (
    <header className="flex items-center border-b px-6 py-4">
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
    </header>
  );
};

export default Header;
