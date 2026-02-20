import Link from "next/link";

export default function DropDown({ href, children, ...rest }) {
  return (
    <Link className="text-blue-500" href={href} {...rest}>
      {children}
    </Link>
  );
}
