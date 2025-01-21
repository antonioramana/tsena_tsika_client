import { Header, Footer } from "..";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
