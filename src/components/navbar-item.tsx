import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

interface NavbarItemProps {
  title: string;
  path: string;
  icon: LucideIcon;
}

const NavbarItem = ({ title, path, icon: Icon }: NavbarItemProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isActive = location.pathname === path;

  return (
    <Button
      className={cn(
        "flex w-full items-center justify-start gap-2 px-4 py-2",
        isActive && "bg-accent text-accent-foreground"
      )}
      variant="ghost"
      onClick={() => navigate(path)}
    >
      <Icon className="h-5 w-5" />
      {title}
    </Button>
  );
};

export default NavbarItem;
