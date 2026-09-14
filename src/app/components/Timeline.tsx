import ScrollReveal from "./ScrollReveal";

export type TimelineItem = {
  title: string;
  subtitle: string;
  start: string;
  end: string;
  summary?: string;
  highlights?: string[];
};

export default function Timeline({ items }: { items: TimelineItem[] }) {
  return (
    <ol className="rows">
      {items.map((item, index) => {
        const isCurrent = item.end === "Present";
        return (
          <ScrollReveal
            as="li"
            key={`${item.title}-${item.subtitle}-${item.start}`}
            delayMs={index * 70}
          >
            <article className="row">
              <p className="row__date">
                {item.start} — {item.end}
              </p>

              <div>
                <h2 className="row__title">{item.title}</h2>
                <p className="row__org">{item.subtitle}</p>

                {item.summary ? <p className="row__summary">{item.summary}</p> : null}

                {item.highlights?.length ? (
                  <ul className="row__highlights">
                    {item.highlights.map((highlight) => (
                      <li key={highlight}>{highlight}</li>
                    ))}
                  </ul>
                ) : null}
              </div>

              {isCurrent ? (
                <p className="row__now">
                  <span className="status-dot" aria-hidden="true" />
                  Current role
                </p>
              ) : null}
            </article>
          </ScrollReveal>
        );
      })}
    </ol>
  );
}
