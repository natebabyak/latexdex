import "katex/dist/katex.min.css";
import { BlockMath } from "react-katex";

export function Latex({ value }: { value: string }) {
  return <BlockMath math={value} />;
}
