import { PageLink } from "./components/PageTransition";

export default function NotFound() {
  return (
    <header className="page-header" data-accent="a4">
      <div className="shell page-header__inner">
        <p className="eyebrow eyebrow--path">~/404</p>
        <h1 className="page-header__title">Not found</h1>
        <p className="page-header__lede">
          This page doesn&apos;t exist. Go back to the home page or pick a page from the menu.
        </p>
        <PageLink href="/" className="btn btn--a1 page-header__action" magnetic>
          Go to home
        </PageLink>
      </div>
    </header>
  );
}
