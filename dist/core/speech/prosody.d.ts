import type { AlignmentResult, ScriptWord, WordProsody } from '../../contracts/talk.js';
import type { AudioFeatures } from './dsp.js';
export declare function wordProsody(words: readonly ScriptWord[], alignment: AlignmentResult, features: AudioFeatures): WordProsody[];
