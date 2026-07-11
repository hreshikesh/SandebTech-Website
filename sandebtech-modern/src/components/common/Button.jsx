import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

function Button({
  children,
  to = "/contact",
  outline = false,
  className = "",
}) {
  return (
    <Link
      to={to}
      className={`
      inline-flex
      items-center
      gap-2
      rounded-full
      px-7
      py-3.5
      text-[15px]
      font-semibold
      transition-all
      duration-300
      ${outline
        ? `
        border-2 border-[var(--primary)]
        text-[var(--primary)]
        hover:bg-[var(--primary)]
        hover:text-white
        `
        : `
        bg-[var(--primary)]
        text-white
        hover:bg-[var(--primary-dark)]
        hover:-translate-y-0.5
        hover:shadow-xl
        shadow-lg
        `
      }
      ${className}
      `}
    >
      {children}
      {!outline && (
        <ArrowRight
          size={18}
          className="transition-transform duration-300 group-hover:translate-x-1"
        />
      )}
    </Link>
  );
}

export default Button;