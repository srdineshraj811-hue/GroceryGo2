import { RoleSelector } from "../RoleSelector";
import { useState } from "react";

export default function RoleSelectorExample() {
  const [role, setRole] = useState("customer");

  return (
    <div className="p-20">
      <RoleSelector role={role} onRoleChange={setRole} />
    </div>
  );
}
