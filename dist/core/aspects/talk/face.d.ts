import type { TalkFaceAspectValue, TalkFaceCue } from '../../../contracts/aspects.js';
import { type ExpressionId } from '../../../contracts/face.js';
import type { ScriptWord } from '../../../contracts/talk.js';
import type { CatalogDetail } from '../../../contracts/catalog.js';
import { type TalkAspectContext, type TalkAspectPeers } from './context.js';
import { type AspectParseResult } from './parse.js';
export declare const FACE_MACROS: readonly ['agree', 'deny', 'laugh'];
export type FaceMacro = (typeof FACE_MACROS)[number];
export interface TalkFaceCueValue extends TalkFaceCue {
    expression?: ExpressionId;
    macro?: FaceMacro;
}
export interface TalkFaceValue extends TalkFaceAspectValue {
    summary?: string;
    start: ExpressionId;
    end: ExpressionId;
    cues: TalkFaceCueValue[];
}
export declare const FACE_MIN_GAP_MS = 1000;
export declare const FACE_SCHEMA_TEXT = "{\n  \"summary\": \"one sentence: the facial performance idea\",\n  \"start\": \"<expression id>\",\n  \"end\": \"<expression id>\",\n  \"cues\": [\n    {\n      \"word\": <int, index of the word where the change happens>,\n      \"expression\": \"<expression id>\"   (optional: the face from here on),\n      \"look\": \"camera\" | \"hold\"         (optional: \"hold\" keeps the eyes where the head points \u2014 thinking/reading; \"camera\" brings them back),\n      \"nod\": true | <degrees 3-8>       (optional: a head nod of semantic emphasis on this word),\n      \"macro\": \"agree\" | \"deny\" | \"laugh\"   (optional: double nod / head shake / laughing face with a small body bounce),\n      \"priority\": 1-5,\n      \"why\": \"<= 12 words\"\n    }\n  ]\n}";
export declare function faceSchemaText(review: boolean): string;
export declare function describeExpressions(detail?: CatalogDetail): string;
export declare function targetFaceChanges(sentences: number, energy: number): number;
export declare function buildFaceMessages(ctx: TalkAspectContext, peers?: TalkAspectPeers): {
    system: string;
    user: string;
};
export declare function parseFace(content: string, ctx: Pick<TalkAspectContext, 'words' | 'tone'> & Pick<Partial<TalkAspectContext>, 'review'>): AspectParseResult<TalkFaceValue>;
export declare function scoreFace(value: TalkFaceValue, problems: readonly string[], ctx: Pick<TalkAspectContext, 'words' | 'tone' | 'speech'> & Pick<Partial<TalkAspectContext>, 'review'>): number;
export declare function faceFallback(ctx: Pick<TalkAspectContext, 'words' | 'tone'>): TalkFaceValue;
export declare function describeFace(value: TalkFaceValue, words: readonly Pick<ScriptWord, 'text'>[]): string;
