import { truncateText } from '@/utils/dataFormat';
import Link from 'next/link';

type TruncatedContentProps = {
  content: string;
  maxLength?: number;
  href: string;
};

export default function TruncatedContent({
  content,
  maxLength = 200,
  href,
}: TruncatedContentProps) {
  if (content.length <= maxLength) {
    return <p>{content}</p>;
  }

  return (
    <p>
      {truncateText(content, maxLength)}
      <Link
        href={href}
        className="underline underline-offset-2 font-bold hover:no-underline"
      >
        see more
      </Link>
    </p>
  );
}
