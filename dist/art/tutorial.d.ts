import type { ReactElement } from "react";
import type { TutorialCardWindow } from "../contracts/tutorial.js";
export declare function TutorialCursorArt(props: {
    press?: number;
    title?: string;
}): ReactElement;
export declare function TutorialRippleArt(props: {
    p: number;
}): ReactElement;
export declare function TutorialStepLabelArt(props: {
    label: string;
    opacity: number;
    unit: (fraction: number) => string;
}): ReactElement;
export declare function TutorialCardArt(props: {
    card: Pick<TutorialCardWindow, "term" | "definition" | "details" | "example" | "note" | "kind" | "mapping" | "limit" | "overScreen">;
    enter: number;
    exit: number;
    ageMs: number;
    unit: (fraction: number) => string;
    scale?: number;
    label?: string;
}): ReactElement;
