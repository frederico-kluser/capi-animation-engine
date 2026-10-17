import type { HairColorId, HairId, HatId } from '../contracts/outfit.js';
import { type Point3 } from '../core/head/solid.js';
import type { PhonesFit } from './headphones.js';
import { type OutfitItem, type OutfitView } from './solid.js';
export declare const CAP: {
    readonly rimBill: -141;
    readonly rimOther: -114;
    readonly rimOpening: -116;
    readonly round: 8;
    readonly dome: {
        readonly a: number;
        readonly b: number;
        readonly h: 52;
        readonly forward: 18;
    };
    readonly profile: 1.9;
    readonly section: 2.6;
    readonly button: 8;
    readonly visor: {
        readonly halfWidth: 150;
        readonly length: 80;
        readonly droop: 26;
        readonly thickness: 7;
    };
    readonly backVisor: {
        readonly halfWidth: 112;
        readonly length: 86;
        readonly droop: 12;
        readonly thickness: 7;
    };
};
export declare function hatFit(hair: HairId, hat?: HatId): PhonesFit;
export declare function visorPitch(nod: number, backwards: boolean): number;
interface Visor {
    top: Point3[];
    bottom: Point3[];
    normal: Point3;
    seam: Point3[];
}
export declare function visorGeometry(attach: {
    y: number;
    z: number;
}, dir: 1 | -1, pitch: number, backwards: boolean): Visor;
export declare function capVisorOutline(hair: HairId, nod: number, backwards?: boolean): Point3[];
export declare function hatItems(view: OutfitView, hat: HatId, hair: HairId, hairColor: HairColorId): OutfitItem[];
export {};
