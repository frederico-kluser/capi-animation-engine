import type { ScriptWord, WordProsody } from '../../contracts/talk.js';
import type { TalkPlan } from './plan.js';
import type { Tone } from './tones.js';
export declare function fallbackPlan(words: readonly ScriptWord[], prosody: readonly WordProsody[] | undefined, tone: Tone): TalkPlan;
