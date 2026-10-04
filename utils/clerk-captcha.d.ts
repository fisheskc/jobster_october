import React from "react";

declare namespace JSX {
  interface IntrinsicElements {
    "clerk-captcha": React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement>,
      HTMLElement
    >;
  }
}
