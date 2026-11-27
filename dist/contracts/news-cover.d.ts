export declare const COVER_LAYOUT: {
    readonly width: 1080;
    readonly height: 1920;
    readonly bar: {
        readonly width: 270;
        readonly text: {
            readonly left: 26;
            readonly top: 80;
            readonly size: 98;
            readonly spacing: 10;
        };
    };
    readonly photo: {
        readonly left: 270;
        readonly top: 0;
        readonly width: 810;
        readonly height: 1920;
    };
    readonly sash: {
        readonly right: -50;
        readonly top: 210;
        readonly width: 700;
        readonly height: 500;
        readonly skew: -7;
    };
    readonly panel: {
        readonly right: 22;
        readonly top: 260;
        readonly width: 560;
        readonly lineHeight: 0.95;
        readonly letterSpacing: -2;
    };
    readonly capi: {
        readonly left: -100;
        readonly bottom: -70;
        readonly width: 930;
    };
    readonly colors: {
        readonly bar: '#FFE14D';
        readonly ink: '#08110F';
        readonly red: '#B3261E';
        readonly paper: '#F4F7F2';
    };
    readonly font: 'Arial Black, Arial, sans-serif';
};
export interface CoverFraming {
    scale?: number;
    x?: number;
    y?: number;
    rotate?: number;
}
export declare const CARD_LAYOUT: {
    readonly width: 1080;
    readonly height: 950;
    readonly photo: {
        readonly width: 1080;
        readonly height: 607;
    };
};
export declare function coverPhotoTransform(framing?: CoverFraming): string | undefined;
export declare function normalizeCoverFraming(raw: unknown): CoverFraming | undefined;
