import React from "react";
import type { LucideIcon } from "lucide-react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

interface GradientButtonProps extends ButtonProps {
  text: string;
  icon?: LucideIcon;
  link?: string;
}

const GradientButton: React.FC<GradientButtonProps> = ({
  text,
  icon: Icon,
  link,
  className = "",
  type = "button",
  disabled,
  ...rest
}) => {
  const button = (
    <button
      type={type}
      disabled={disabled}
      className={`cursor-pointer px-3 py-2.5 rounded-md text-sm flex items-center gap-2 transition-colors whitespace-nowrap disabled:opacity-60 disabled:cursor-not-allowed ${"bg-linear-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700"} ${className}`}
      {...rest}
    >
      {Icon && <Icon size={16} />}
      <span className="inline">{text}</span>
    </button>
  );

  if (link) {
    return (
      <a href={link} className="inline-block">
        {button}
      </a>
    );
  }

  return button;
};

export default GradientButton;
