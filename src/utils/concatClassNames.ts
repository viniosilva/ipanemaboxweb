export default function concatClassNames(classNames: any[]): string {
  return classNames.filter((c) => c).join(" ");
}
