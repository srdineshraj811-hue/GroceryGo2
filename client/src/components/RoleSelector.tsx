import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface RoleSelectorProps {
  role: string;
  onRoleChange: (role: string) => void;
}

export function RoleSelector({ role, onRoleChange }: RoleSelectorProps) {
  return (
    <div className="fixed top-4 right-4 z-50">
      <Select value={role} onValueChange={onRoleChange}>
        <SelectTrigger className="w-[180px] bg-card" data-testid="select-role">
          <SelectValue placeholder="Select role" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="customer">Customer View</SelectItem>
          <SelectItem value="driver">Driver View</SelectItem>
          <SelectItem value="admin">Admin View</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
