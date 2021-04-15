import Link from "next/link";
import { FiChevronRight } from "react-icons/fi";

type Crumb = {
  title: string;
};

const SettingsBreadcrumb = ({ path }: { path: Crumb[] }) => {
  return (
    <div className="flex items-center leading-none text-sm">
      <Link href="/app/settings">Settings</Link>
      <FiChevronRight className="text-lg" />
      {path.map(({ title }) => (
        <span key={title} className="text-indigo-500 font-medium">
          {title}
        </span>
      ))}
    </div>
  );
};

export default SettingsBreadcrumb;
