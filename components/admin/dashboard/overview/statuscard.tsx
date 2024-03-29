import { LIcon } from "@/components/shared/icons";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { H2 } from "@/components/ui/textui";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import Link from "next/link";
import React from "react";

type StatusCardProps = {
  label: string;
  value: string;
  description: string;
  icon: string;
  className: string;
};

const StatusCard = ({
  label,
  value,
  description,
  icon,
  className,
}: StatusCardProps) => {
  return (
    <div>
      <Card
        className={cn(
          "hover:bg-green-400/10 transition-all duration-600 ease-in-out",
          className
        )}
      >
        <CardHeader className="pb-2 pt-3">
          <CardTitle className="">
            <span className="text-sm font-medium text-muted-foreground">
              {label.toUpperCase()}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="pb-5">
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-3">
                <span className="flex items-center gap-1">
                  <Plus size={18} />
                  <H2 className="">{value}</H2>
                </span>
              </div>
              <div className="flex items-center justify-center ">
                <LIcon
                  name={icon}
                  size={28}
                  color="#2eb82e"
                  strokeWidth={1.2}
                />
              </div>
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {description}
            </div>
          </div>
          {/* <Link href="/">Home</Link> */}
        </CardContent>
      </Card>
    </div>
  );
};

export default StatusCard;
