import RecentPlaylist from "@/components/recent-playlist";
import RecentlyPlayedTable from "@/components/recently-played-table";

export default function HomePage() {
  return (
    <div className="flex flex-1 overflow-y-auto flex-col h-full w-full gap-8 py-6">
      {/* Hero Section */}
      <section className="space-y-4">
        <h1 className="text-3xl font-bold">Welcome Back</h1>
        {recentPlaylists.length < 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recentPlaylists.map((playlist) => (
              <RecentPlaylist key={playlist.id} playlist={playlist} />
            ))}
          </div>
        )}
      </section>

      {/* Featured Playlists */}
      {/* <section className="space-y-4 overflow-y-auto">
        <h2 className="text-2xl font-semibold">Featured Playlists</h2>
        <ScrollArea>
          <div className="flex gap-4 pb-4">
            {featuredPlaylists.map((playlist) => (
              <Card key={playlist.id} className="w-48 shrink-0">
                <CardContent className="p-4">
                  <div className="h-40 w-40 overflow-hidden rounded-md bg-gray-200"></div>
                  <div className="mt-2">
                    <h3 className="font-semibold">{playlist.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {playlist.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </section> */}

      {/* Recently Played */}

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Recently Played</h2>
        <RecentlyPlayedTable />
      </section>
    </div>
  );
}

const recentPlaylists = [
  {
    id: 1,
    title: "Party Hits",
    description: "Top party tracks",
    cover: "/placeholder.svg?height=168&width=168",
  },
  {
    id: 2,
    title: "Morning Coffee",
    description: "Calm morning vibes",
    cover: "/placeholder.svg?height=168&width=168",
  },
  {
    id: 3,
    title: "Workout Mix",
    description: "Energy boost",
    cover: "/placeholder.svg?height=168&width=168",
  },
];
