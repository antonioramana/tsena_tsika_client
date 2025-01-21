import { Outlet } from "react-router-dom";
import HeaderAd from "./HeaderAd";
import SidebarAd from "./SidebarAd";

export default function LayoutAd() {
  return (
    <div className="flex">
      <SidebarAd />
      <div className="flex-1">
        <HeaderAd />
        <Outlet />
      </div>
    </div>
  );
}
