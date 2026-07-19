import usePalette from "../../hooks/usePalette";
import styles from "./Heading.module.css";
import { THeadingProps } from "./types";

export function THeading(p: THeadingProps) {
  const plt = usePalette(styles, p);
  return (
    <div role="heading" className={plt.styles(styles.heading)}>
      {p.children}
    </div>
  );
}
