"use client";
import { LucideProps, icons } from "lucide-react";
import dynamic from "next/dynamic";
import dynamicIconImports from "lucide-react/dynamicIconImports";

type IconProps = LucideProps & {
  name: string;
  color?: string;
  size?: any;
  strokeWidth?: Number;
};
type iconsKey = keyof typeof icons;
export const FormIcon = ({
  name,
  color,
  size,
  strokeWidth,
  ...rest
}: IconProps) => {
  size = size || 16;
  strokeWidth = strokeWidth || 1;
  const nn: iconsKey = name as iconsKey;
  const LucideIcon = icons[nn];
  return (
    <LucideIcon color={color} size={size} strokeWidth={strokeWidth} {...rest} />
  );
};

interface DIconProps extends LucideProps {
  //name: keyof typeof dynamicIconImports;
  name: string;
}
type kk = keyof typeof dynamicIconImports;
export const LIcon = ({ name, ...props }: DIconProps) => {
  const LucideIcon = dynamic(dynamicIconImports[name as kk]);

  return <LucideIcon {...props} />;
};
