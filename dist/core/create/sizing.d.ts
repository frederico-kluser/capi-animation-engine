import type { ProfileAspect, VideoProfileId } from '../../contracts/profile.js';
import { type CreateFormatSpec } from './formats.js';
export interface CreateSizing {
    profile: VideoProfileId;
    aspect: ProfileAspect;
    seconds: number;
    minutes: number;
    limits: {
        default: number;
        min: number;
        max: number;
    };
    words: number;
    parts: number;
    turns?: readonly [number, number];
    points: number;
    facts?: number;
    lenses: number;
    research: Readonly<Record<'quick' | 'deep', {
        queries: number;
        read: number;
    }>>;
    options: string[];
    droppedOptions: string[];
    warnings: string[];
}
export declare function createSizing(format: CreateFormatSpec, options?: {
    presenters?: 1 | 2;
    profile?: VideoProfileId;
    seconds?: number;
}): CreateSizing;
