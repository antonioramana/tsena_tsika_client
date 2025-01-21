import { NavLink } from "react-router-dom";

export default function SubHeader() {
  return (
    <nav className="absolute bottom-0 left-1/2 -translate-x-1/2 bg-myWhite p-8 rounded-t-lg">
      <ul className="flex gap-12 text-2xl">
        <NavLink
          to="achats"
          className={({ isActive }) =>
            `rounded ${isActive ? "border-b-4 border-myMarron text-myMarron" : "text-gray-800"}`
          }
        >
          Achat simple/groupé
        </NavLink>
        {/* <NavLink
          to="achats"
          className={({ isActive }) =>
            `p-2 rounded ${isActive ? "border-b-4 border-myMarron text-myMarron" : "text-gray-800"}`
          }
        >
          Achat groupé
        </NavLink> */}
        <NavLink
          to="achat-procedural"
          className={({ isActive }) =>
            `p-2 rounded ${isActive ? "border-b-4 border-myMarron text-myMarron" : "text-gray-800"}`
          }
        >
          Achat procédural
        </NavLink>
      </ul>
    </nav>
  );
}
