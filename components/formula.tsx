import { MathJax } from "better-react-mathjax";

export function Formula() {
  return (
    <div>
      <MathJax>{`\\(E = mc^2\\)`}</MathJax>
      <h3>This is a header</h3>
      <MathJax>
        <div>
          <h4>This is a subheader</h4>
          <span>{/* math content */}</span>
          <h4>This is a second subheader</h4>
          <span>{/* math content */}</span>
          ...
        </div>
      </MathJax>
      <p>
        This is text which involves math <MathJax>{/* math content */}</MathJax>{" "}
        inside the paragraph.
      </p>
    </div>
  );
}
