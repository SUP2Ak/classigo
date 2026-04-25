export type ClassLiteValue = string | false | null | undefined;

export function classigo(...classes: ClassLiteValue[]): string {
  let result = "";
  for (let i = 0; i < classes.length; i++) {
    const cls = classes[i];
    if (cls) result = result ? result + " " + cls : cls;
  }
  return result;
}

export default classigo;
