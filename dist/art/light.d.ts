export interface Vec3 {
    x: number;
    y: number;
    z: number;
}
export declare const LIGHT: Vec3;
export declare const SHADOW_DIRECTION: {
    x: number;
    y: number;
};
export declare const dot3: (a: Vec3, b: Vec3) => number;
export declare function smoothstep(lo: number, hi: number, v: number): number;
export declare function lightInRotatedFrame(deg: number): Vec3;
export interface CylinderShade {
    side: 1 | -1;
    from: number;
    strength: number;
    rim: number;
}
export declare function cylinderShade(nx: number, ny: number): CylinderShade;
export declare function mixHex(a: string, b: string, t: number): string;
