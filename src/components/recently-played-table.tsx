import { useRecentlyPlayed } from "@/hooks/use-recently-played";
import RecentSongTable from "./songs/recent-song-table";

const RecentlyPlayedTable = () => {
  const { recentlyPlayed } = useRecentlyPlayed();
  return <RecentSongTable songs={recentlyPlayed} />;
};

export default RecentlyPlayedTable;
