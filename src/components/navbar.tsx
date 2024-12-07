import { Home, Library, Music } from "lucide-react";
import NavbarItem from "./navbar-item";
import { useLocation } from "react-router-dom";
import { AddPlaylistModal } from "./modal/add-playlist-modal";

const Navbar = () => {
  const location = useLocation();

  const navbarItems = [
    { icon: Home, title: "Home", path: "/home" },
    { icon: Music, title: "All songs", path: "/songs" },
    { icon: Library, title: "Your Library", path: "/library" },
  ];

  return (
    <>
      <nav className="flex-1">
        <ul>
          {navbarItems.map((item) => (
            <NavbarItem
              key={item.title}
              icon={item.icon}
              title={item.title}
              path={item.path}
            />
          ))}
        </ul>
      </nav>
      {location.pathname !== "/library" && (
        <div className="p-6">
          <AddPlaylistModal />
        </div>
      )}
    </>
  );
};

{
  /* {isLoading && (
  <div className="rounded-md text-sm font-medium pl-12 py-2">
    Loading playlists...
  </div>
)}
{error && <div>Error loading playlists</div>}
{playlists?.map((playlist) => (
  <button
    key={playlist.id}
    onClick={() => navigate(`/playlist/${playlist.id}`)}
    className={cn(
      "whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-10 flex w-full items-center justify-start gap-2 px-4 py-2 pl-12",
      playlistId === playlist.id &&
        "bg-accent text-accent-foreground pointer-events-none"
    )}
  >
    {playlist.title}
  </button>
))} */
}
export default Navbar;
