import { Link } from "react-router-dom";
import { Card, CardContent } from "./ui/card";
import { Play } from "lucide-react";
import { Button } from "./ui/button";
import { Playlist } from "@/types";

interface RecentPlaylistProps {
  playlist: Omit<Playlist, "songs" | "coverUrl">;
}

const RecentPlaylist = ({
  playlist: { id, title, description },
}: RecentPlaylistProps) => {
  return (
    <Link
      key={id}
      to={`?playlist=${encodeURIComponent(title)}`}
      title={`${title}`}
    >
      <Card className="group relative overflow-hidden transition-colors hover:bg-muted/50">
        <CardContent className="flex items-center gap-4 p-6">
          <div className="h-24 w-24 rounded-md bg-gray-200">
            {/* {coverUrl && (
              <img
                alt={title}
                className="w-full h-full rounded-md object-cover"
                src={coverUrl}
              />
            )} */}
          </div>
          <div>
            <h3 className="font-semibold line-clamp-2">{title}</h3>
            <p className="text-sm text-muted-foreground line-clamp-1">
              {description}
            </p>
          </div>
          <Button className="absolute bottom-4 right-4 opacity-0 transition-opacity group-hover:opacity-100">
            <Play className="h-4 w-4" />
          </Button>
        </CardContent>
      </Card>
    </Link>
  );
};

export default RecentPlaylist;