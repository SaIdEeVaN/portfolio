import { Fragment } from "react";

// A project name in a display title. A joined-up name like "SecretSentinel" may break between
// its words ("SECRET / SENTINEL") when one line is too narrow for it, and reads as one word
// otherwise. Page titles, share tags and preview images keep the plain name.
export default function ProjectName({ name }: { name: string }) {
  return name.split(/(?<=[a-z])(?=[A-Z])/).map((part, index) => (
    <Fragment key={index}>
      {index > 0 ? <wbr /> : null}
      {part}
    </Fragment>
  ));
}
