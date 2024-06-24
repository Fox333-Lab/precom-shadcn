import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import Link from "next/link";
import { Power, UserRound } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

type UserAccountMenusPropsTypes = {
  signOut: () => void;
};

const UserAccountMenus = ({ signOut }: UserAccountMenusPropsTypes) => {
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 py-1">
          <DropdownMenuItem className="py-3">
            <Link href="/user/dashboard" className="flex w-full items-start">
              <UserRound className="mr-2 h-5 w-5 text-primary" />
              <span>Dashboard</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="py-3">
            <Link href="/profile" className="flex w-full items-start">
              <UserRound className="mr-2 h-5 w-5 text-primary" />
              <span>My Account</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="py-3">
            <Link
              href="/user/dashboard/orders"
              className="flex w-full items-start"
            >
              <UserRound className="mr-2 h-5 w-5 text-primary" />
              <span>Orders</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Button
              variant="default"
              className="flex w-full items-center gap-2"
              size="sm"
              onClick={() => signOut()}
            >
              <Power size={18} />
              <span>Logout</span>
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserAccountMenus;
