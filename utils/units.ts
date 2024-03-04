type Unit = "i" | "f" | "mm" | "cm" | "m";

export function unitFromName(name: string): Unit {
  switch (name.toLowerCase()) {
    case '"':
    case "in":
    case "inch":
    case "inchs":
    case "inches":
      return "i";

    case "'":
    case "ft":
    case "feet":
    case "feets":
    case "foot":
    case "foots":
      return "f";

    case "mm":
    case "millimeter":
    case "millimeters":
    case "millimetre":
    case "millimetres":
      return "mm";

    case "cm":
    case "centimeter":
    case "centimeters":
    case "centimetre":
    case "centimetres":
      return "cm";

    case "m":
    case "meter":
    case "meters":
    case "metre":
    case "metres":
      return "m";

    default:
      throw new Error(`NumberInput: unsupported unit "${name}"`);
  }
}

const unitFactors = {
  i: 1,
  f: 0.08333333333,
  mm: 25.4,
  cm: 2.54,
  m: 0.0254,
};

export function convertUnit(value: number, from: Unit, to: Unit): number {
  // Use inches as the pivot unit
  return (value / unitFactors[from]) * unitFactors[to];
}
