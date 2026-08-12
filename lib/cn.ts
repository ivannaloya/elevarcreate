/** Tiny classname joiner — avoids pulling in a dependency for one function. */
export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}
