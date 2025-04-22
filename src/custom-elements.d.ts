// src/custom-elements.d.ts
import { DetailedHTMLProps, HTMLAttributes } from "react";

type AdsgramTaskAttributes = DetailedHTMLProps<
    HTMLAttributes<HTMLElement>,
    HTMLElement
> & {
    "data-block-id"?: string;
    "data-debug"?: boolean;
};

declare module "react" {
    namespace JSX {
        interface IntrinsicElements {
            "adsgram-task": AdsgramTaskAttributes;
        }
    }
}
