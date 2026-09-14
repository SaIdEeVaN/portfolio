import SwooshText from "@/components/kokonutui/swoosh-text";
import type { SitePage } from "../lib/pages";

type PageHeaderProps = {
  page: SitePage;
  lede: string;
  children?: React.ReactNode;
};

export default function PageHeader({ page, lede, children }: PageHeaderProps) {
  return (
    <header className={`page-header${page.accent === "ink" ? " on-ink" : ""}`} data-accent={page.accent}>
      <div className="shell page-header__inner">
        <p className="eyebrow eyebrow--path">~/{page.slug}</p>
        <h1 className="page-header__title">
          <SwooshText text={page.label} />
        </h1>
        <p className="page-header__lede">{lede}</p>
        {children}
      </div>
    </header>
  );
}
