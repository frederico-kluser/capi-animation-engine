export interface SpokenNumber {
    value: number;
    raw: string;
    percent: boolean;
    times: boolean;
    approx: boolean;
    trivial: boolean;
}
export declare function spokenNumbers(text: string): SpokenNumber[];
export declare function articleNumbers(text: string): number[];
export declare function articlePercents(text: string): number[];
export declare function numberSupported(n: Pick<SpokenNumber, 'value' | 'approx' | 'percent'>, article: readonly number[]): boolean;
export declare function isRoundingOf(spoken: number, article: number): boolean;
