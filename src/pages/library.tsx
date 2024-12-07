import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom";
import { AddPlaylistModal } from "@/components/modal/add-playlist-modal";
import { usePlaylistsQuery } from "@/api/hooks/usePlaylist";

const Library = () => {
  const { data: playlists = [] } = usePlaylistsQuery();
  return (
    <div className="w-full py-6 overflow-y-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Your Library</h1>
        <AddPlaylistModal />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
        {playlists.map(({ title, description, id, coverUrl, songs }) => (
          <Link to={`/playlist/${id}`} key={id}>
            <Card className="hover:bg-muted/50 transition-colors">
              <CardHeader>
                <div className="h-40 w-40 overflow-hidden rounded-md bg-gray-200">
                  {coverUrl && (
                    <img
                      alt={title}
                      className="w-full h-full rounded-md object-cover"
                      src={coverUrl}
                    />
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <CardTitle className="line-clamp-2">{title}</CardTitle>
                <CardDescription className="line-clamp-2">
                  {description}
                </CardDescription>
              </CardContent>
              <CardFooter>
                <p className="text-sm text-muted-foreground">
                  {songs.length} song{`${songs.length > 1 ? "s" : ""}`}
                </p>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Library;
