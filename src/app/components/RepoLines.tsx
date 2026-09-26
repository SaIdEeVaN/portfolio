import type { RepoPart } from "../lib/projects";

const PART_COLORS = ["var(--a2)", "var(--a3)", "var(--a4)", "var(--a1)", "var(--ink)", "var(--paper)"];

type RepoLinesProps = {
  parts: RepoPart[];
  source: string;
};

// Every line in a repo by part: the total, a bar split in proportion, and a row per part.
export default function RepoLines({ parts, source }: RepoLinesProps) {
  const total = parts.reduce((sum, part) => sum + part.lines, 0);
  const color = (index: number) => PART_COLORS[index % PART_COLORS.length];

  return (
    <div className="repo-lines">
      <p className="repo-lines__total">
        <span className="repo-lines__number">{total.toLocaleString("en-US")}</span>
        <span className="repo-lines__unit">lines in the repo</span>
      </p>

      <div className="repo-lines__bar" aria-hidden="true">
        {parts.map((part, index) => (
          <span key={part.name} style={{ flexGrow: part.lines, background: color(index) }} />
        ))}
      </div>

      <ul className="repo-lines__list">
        {parts.map((part, index) => (
          <li key={part.name} className="repo-lines__row">
            <span className="languages__swatch" style={{ background: color(index) }} aria-hidden="true" />
            <span className="languages__name">{part.name}</span>
            <span className="repo-lines__count">{part.lines.toLocaleString("en-US")}</span>
            <span className="repo-lines__text">{part.text}</span>
          </li>
        ))}
      </ul>

      <p className="languages__note">{source}</p>
    </div>
  );
}
