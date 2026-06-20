import { Link } from "react-router-dom";

type AuthFooterLinkProps = {
  text: string;
  linkText: string;
  to: string;
};

export default function AuthFooter({
  text,
  linkText,
  to,
}: AuthFooterLinkProps) {
  return (
    <div className="mt-5">
      <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
        {text}{" "}
        <Link
          to={to}
          className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
        >
          {linkText}
        </Link>
      </p>
    </div>
  );
}