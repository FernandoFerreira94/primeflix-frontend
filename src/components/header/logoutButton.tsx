"use client";

import { handleLogout } from "@/actions/logout";
import { CiLogout } from "react-icons/ci";

export function LogoutButton() {
  return (
    <button
      className="cursor-pointer"
      onClick={() => handleLogout()}
      title="Sair"
    >
      <CiLogout size={30} color="red" />
    </button>
  );
}
