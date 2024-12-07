import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import { Outlet } from "react-router-dom";
import { MusicPlayer } from "@/components/music-player";

const AppLayout = () => {
  return (
    <div className="flex h-screen flex-col">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <div className="flex w-full pb-1 px-6">
          <Outlet />
        </div>
      </div>
      <MusicPlayer />
    </div>
  );
};

export default AppLayout;
