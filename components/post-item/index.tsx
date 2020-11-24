import Link from "../link";

interface PostItemProps {
  title: string;
  description: string;
  href: string;
}

export default function PostItem({ title, description, href }: PostItemProps) {
  return (
    <Link href={href} className="py-4 block">
      <span className="block">{title}</span>
      <span className="text-sm text-gray-500">{description}</span>
    </Link>
  );
}
