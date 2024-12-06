import { usePlaylistsQuery } from "../api/hooks/usePlaylist";
import { useMusicPlayerStore } from "@/hooks/use-music-player-store";
import { cn } from "@/lib/utils";
import { CirclePlay, Home, Library, Plus } from "lucide-react";

const Sidebar = () => {
  const { data: playlists, isLoading, error } = usePlaylistsQuery();
  const { setPlaylistId, playlistId } = useMusicPlayerStore();

  return (
    <aside className="flex h-full w-64 flex-col border-r">
      <div className="flex items-center justify-center p-6">
        <CirclePlay className="h-10 w-10" />
        <span className="ml-2 text-2xl font-bold">MusicApp</span>
      </div>
      <nav className="flex-1">
        <ul>
          <li>
            <button
              className={cn(
                "whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-10 flex w-full items-center justify-start gap-2 px-4 py-2",
                !playlistId && "bg-accent text-accent-foreground"
              )}
              onClick={() => setPlaylistId(0)}
            >
              <Home className="h-5 w-5" />
              Home
            </button>
          </li>
          <li>
            <button className="whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-10 flex w-full items-center justify-start gap-2 px-4 py-2 pointer-events-none">
              <Library className="h-5 w-5" />
              Your Library
            </button>
            {isLoading && (
              <div className="rounded-md text-sm font-medium pl-12 py-2">
                Loading playlists...
              </div>
            )}
            {error && <div>Error loading playlists</div>}
            {playlists?.map((playlist) => (
              <button
                key={playlist.id}
                onClick={() => setPlaylistId(playlist.id)}
                className={cn(
                  "whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-10 flex w-full items-center justify-start gap-2 px-4 py-2 pl-12",
                  playlistId === playlist.id &&
                    "bg-accent text-accent-foreground pointer-events-none"
                )}
              >
                {playlist.title}
              </button>
            ))}
          </li>
        </ul>
      </nav>
      <div className="p-6">
        <button className="whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 flex w-full items-center justify-start gap-2">
          <Plus className="h-5 w-5" />
          Create Playlist
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
