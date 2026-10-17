import { type ArmPose, type Point, type Pose } from '../contracts/pose.js';
export declare const POSES: {
    readonly idle: {
        readonly head: {
            readonly turn: 15;
            readonly tilt: -7;
        };
        readonly body: {
            readonly turn: 14;
        };
        readonly armLeft: {
            readonly hand: {
                readonly x: 438;
                readonly y: 706;
            };
            readonly elbow: {
                readonly x: 298;
                readonly y: 692;
            };
            readonly shape: 'grip';
            readonly angle: 6;
            readonly view: 'back';
        };
        readonly armRight: {
            readonly hand: {
                readonly x: 562;
                readonly y: 688;
            };
            readonly elbow: {
                readonly x: 702;
                readonly y: 692;
            };
            readonly shape: 'flat';
            readonly angle: 174;
            readonly view: 'back';
        };
    };
    readonly armsDown: {
        readonly armLeft: ArmPose;
        readonly armRight: ArmPose;
    };
    readonly pointRight: Pose;
    readonly pointLeft: Pose;
    readonly pointUp: {
        readonly head: {
            readonly tilt: -4;
        };
        readonly armLeft: ArmPose;
        readonly armRight: {
            readonly hand: {
                readonly x: 788;
                readonly y: 398;
            };
            readonly elbow: {
                readonly x: 772;
                readonly y: 590;
            };
            readonly shape: 'point';
            readonly angle: -90;
        };
    };
    readonly presentRight: Pose;
    readonly presentLeft: Pose;
    readonly pointScreenRight: Pose;
    readonly pointScreenLeft: Pose;
    readonly openArms: {
        readonly armLeft: {
            readonly hand: {
                readonly x: 180;
                readonly y: 584;
            };
            readonly elbow: {
                readonly x: 270;
                readonly y: 660;
            };
            readonly shape: 'open';
            readonly angle: 202;
        };
        readonly armRight: {
            readonly hand: {
                readonly x: 820;
                readonly y: 584;
            };
            readonly elbow: {
                readonly x: 730;
                readonly y: 660;
            };
            readonly shape: 'open';
            readonly angle: -22;
        };
    };
    readonly explain: {
        readonly head: {
            readonly turn: 13;
            readonly tilt: -4;
        };
        readonly armLeft: {
            readonly hand: {
                readonly x: 380;
                readonly y: 668;
            };
            readonly elbow: {
                readonly x: 374;
                readonly y: 754;
            };
            readonly shape: 'palmUp';
            readonly angle: 205;
        };
        readonly armRight: {
            readonly hand: {
                readonly x: 636;
                readonly y: 628;
            };
            readonly elbow: {
                readonly x: 642;
                readonly y: 742;
            };
            readonly shape: 'palmUp';
            readonly angle: -26;
        };
    };
    readonly shrug: {
        readonly head: {
            readonly tilt: 8;
        };
        readonly body: {
            readonly y: -7;
        };
        readonly armLeft: {
            readonly hand: {
                readonly x: 192;
                readonly y: 566;
            };
            readonly elbow: {
                readonly x: 296;
                readonly y: 684;
            };
            readonly shape: 'palmUp';
            readonly angle: 194;
        };
        readonly armRight: {
            readonly hand: {
                readonly x: 808;
                readonly y: 566;
            };
            readonly elbow: {
                readonly x: 704;
                readonly y: 684;
            };
            readonly shape: 'palmUp';
            readonly angle: -14;
        };
    };
    readonly waveRight: Pose;
    readonly waveLeft: Pose;
    readonly thumbsUp: {
        readonly head: {
            readonly tilt: 5;
        };
        readonly armLeft: ArmPose;
        readonly armRight: {
            readonly hand: {
                readonly x: 706;
                readonly y: 566;
            };
            readonly elbow: {
                readonly x: 770;
                readonly y: 610;
            };
            readonly shape: 'thumbsUp';
            readonly angle: 180;
        };
    };
    readonly thumbsDown: {
        readonly head: {
            readonly tilt: -4;
        };
        readonly armLeft: ArmPose;
        readonly armRight: {
            readonly hand: {
                readonly x: 700;
                readonly y: 610;
            };
            readonly elbow: {
                readonly x: 776;
                readonly y: 660;
            };
            readonly shape: 'thumbsUp';
            readonly angle: 180;
            readonly flip: true;
        };
    };
    readonly thumbsUpBoth: {
        readonly head: {
            readonly tilt: 4;
        };
        readonly armLeft: {
            readonly hand: {
                readonly x: 300;
                readonly y: 592;
            };
            readonly elbow: {
                readonly x: 230;
                readonly y: 650;
            };
            readonly shape: 'thumbsUp';
            readonly angle: 0;
        };
        readonly armRight: {
            readonly hand: {
                readonly x: 700;
                readonly y: 592;
            };
            readonly elbow: {
                readonly x: 770;
                readonly y: 650;
            };
            readonly shape: 'thumbsUp';
            readonly angle: 180;
        };
    };
    readonly okSign: {
        readonly head: {
            readonly tilt: 5;
        };
        readonly armLeft: ArmPose;
        readonly armRight: {
            readonly hand: {
                readonly x: 784;
                readonly y: 512;
            };
            readonly elbow: {
                readonly x: 812;
                readonly y: 676;
            };
            readonly shape: 'ok';
            readonly angle: -84;
        };
    };
    readonly peace: {
        readonly head: {
            readonly tilt: 6;
        };
        readonly armLeft: ArmPose;
        readonly armRight: {
            readonly hand: {
                readonly x: 804;
                readonly y: 452;
            };
            readonly elbow: {
                readonly x: 776;
                readonly y: 630;
            };
            readonly shape: 'peace';
            readonly angle: -84;
        };
    };
    readonly thinking: {
        readonly head: {
            readonly turn: -8;
            readonly tilt: 7;
        };
        readonly body: {
            readonly turn: -6;
        };
        readonly armLeft: {
            readonly hand: {
                readonly x: 506;
                readonly y: 690;
            };
            readonly elbow: {
                readonly x: 306;
                readonly y: 732;
            };
            readonly shape: 'relaxed';
            readonly angle: -6;
        };
        readonly armRight: {
            readonly hand: {
                readonly x: 596;
                readonly y: 470;
            };
            readonly elbow: {
                readonly x: 674;
                readonly y: 690;
            };
            readonly shape: 'lShape';
            readonly angle: -95;
        };
        readonly front: 'right';
    };
    readonly handsOnHips: {
        readonly armLeft: {
            readonly hand: {
                readonly x: 300;
                readonly y: 712;
            };
            readonly elbow: {
                readonly x: 190;
                readonly y: 620;
            };
            readonly shape: 'fist';
            readonly angle: 40;
            readonly view: 'back';
        };
        readonly armRight: {
            readonly hand: {
                readonly x: 700;
                readonly y: 712;
            };
            readonly elbow: {
                readonly x: 810;
                readonly y: 620;
            };
            readonly shape: 'fist';
            readonly angle: 140;
            readonly view: 'back';
        };
    };
    readonly crossArms: {
        readonly head: {
            readonly tilt: -4;
        };
        readonly armLeft: {
            readonly hand: {
                readonly x: 604;
                readonly y: 690;
            };
            readonly elbow: {
                readonly x: 346;
                readonly y: 714;
            };
            readonly shape: 'grip';
            readonly angle: -10;
            readonly view: 'back';
        };
        readonly armRight: {
            readonly hand: {
                readonly x: 414;
                readonly y: 644;
            };
            readonly elbow: {
                readonly x: 660;
                readonly y: 718;
            };
            readonly shape: 'grip';
            readonly angle: 190;
            readonly view: 'back';
        };
    };
    readonly celebrate: {
        readonly head: {
            readonly nod: -6;
        };
        readonly armLeft: {
            readonly hand: {
                readonly x: 232;
                readonly y: 296;
            };
            readonly elbow: {
                readonly x: 280;
                readonly y: 482;
            };
            readonly shape: 'open';
            readonly angle: -104;
        };
        readonly armRight: {
            readonly hand: {
                readonly x: 840;
                readonly y: 296;
            };
            readonly elbow: {
                readonly x: 792;
                readonly y: 482;
            };
            readonly shape: 'open';
            readonly angle: -76;
        };
    };
    readonly fistPump: {
        readonly head: {
            readonly tilt: -5;
        };
        readonly armLeft: ArmPose;
        readonly armRight: {
            readonly hand: {
                readonly x: 782;
                readonly y: 440;
            };
            readonly elbow: {
                readonly x: 778;
                readonly y: 630;
            };
            readonly shape: 'fist';
            readonly angle: -90;
        };
    };
    readonly stop: {
        readonly armLeft: ArmPose;
        readonly armRight: {
            readonly hand: {
                readonly x: 778;
                readonly y: 476;
            };
            readonly elbow: {
                readonly x: 766;
                readonly y: 652;
            };
            readonly shape: 'open';
            readonly angle: -90;
        };
    };
    readonly countOne: Pose;
    readonly countTwo: Pose;
    readonly countThree: Pose;
    readonly handOnHeart: {
        readonly head: {
            readonly tilt: 6;
        };
        readonly armLeft: ArmPose;
        readonly armRight: {
            readonly hand: {
                readonly x: 668;
                readonly y: 650;
            };
            readonly elbow: {
                readonly x: 736;
                readonly y: 744;
            };
            readonly shape: 'flat';
            readonly angle: -128;
            readonly view: 'back';
        };
    };
    readonly headScratch: {
        readonly head: {
            readonly turn: -6;
            readonly tilt: -8;
        };
        readonly body: {
            readonly turn: -4;
        };
        readonly armLeft: ArmPose;
        readonly armRight: {
            readonly hand: {
                readonly x: 710;
                readonly y: 330;
            };
            readonly elbow: {
                readonly x: 790;
                readonly y: 470;
            };
            readonly shape: 'relaxed';
            readonly angle: -120;
            readonly view: 'back';
        };
    };
    readonly shush: {
        readonly armLeft: ArmPose;
        readonly armRight: {
            readonly hand: {
                readonly x: 564;
                readonly y: 462;
            };
            readonly elbow: {
                readonly x: 700;
                readonly y: 640;
            };
            readonly shape: 'pointSide';
            readonly angle: -90;
        };
    };
    readonly oops: {
        readonly head: {
            readonly nod: -4;
            readonly tilt: 3;
        };
        readonly armLeft: ArmPose;
        readonly armRight: {
            readonly hand: {
                readonly x: 652;
                readonly y: 340;
            };
            readonly elbow: {
                readonly x: 740;
                readonly y: 580;
            };
            readonly shape: 'flat';
            readonly angle: -168;
            readonly view: 'back';
        };
    };
    readonly facepalm: {
        readonly head: {
            readonly nod: 10;
            readonly tilt: -5;
        };
        readonly armLeft: ArmPose;
        readonly armRight: {
            readonly hand: {
                readonly x: 622;
                readonly y: 300;
            };
            readonly elbow: {
                readonly x: 788;
                readonly y: 460;
            };
            readonly shape: 'open';
            readonly angle: -122;
            readonly view: 'back';
        };
    };
    readonly clap: {
        readonly armLeft: {
            readonly hand: {
                readonly x: 482;
                readonly y: 650;
            };
            readonly elbow: {
                readonly x: 330;
                readonly y: 734;
            };
            readonly shape: 'flat';
            readonly angle: -74;
        };
        readonly armRight: {
            readonly hand: {
                readonly x: 522;
                readonly y: 654;
            };
            readonly elbow: {
                readonly x: 670;
                readonly y: 734;
            };
            readonly shape: 'flat';
            readonly angle: -104;
            readonly view: 'back';
        };
        readonly front: 'right';
    };
    readonly pointCamera: {
        readonly head: {
            readonly nod: 3;
        };
        readonly armLeft: ArmPose;
        readonly armRight: {
            readonly hand: {
                readonly x: 680;
                readonly y: 576;
            };
            readonly elbow: {
                readonly x: 716;
                readonly y: 632;
            };
            readonly shape: 'pointFront';
            readonly angle: -112;
        };
    };
    readonly chinHold: {
        readonly head: {
            readonly turn: -6;
            readonly nod: 3;
            readonly tilt: 5;
        };
        readonly body: {
            readonly turn: -4;
        };
        readonly armLeft: {
            readonly hand: {
                readonly x: 576;
                readonly y: 678;
            };
            readonly elbow: {
                readonly x: 330;
                readonly y: 726;
            };
            readonly shape: 'relaxed';
            readonly angle: -6;
        };
        readonly armRight: {
            readonly hand: {
                readonly x: 590;
                readonly y: 432;
            };
            readonly elbow: {
                readonly x: 698;
                readonly y: 644;
            };
            readonly shape: 'chinGrip';
            readonly angle: -178;
            readonly flip: true;
        };
        readonly front: 'right';
    };
    readonly hangLoose: {
        readonly head: {
            readonly tilt: 6;
        };
        readonly armLeft: ArmPose;
        readonly armRight: {
            readonly hand: {
                readonly x: 826;
                readonly y: 452;
            };
            readonly elbow: {
                readonly x: 836;
                readonly y: 650;
            };
            readonly shape: 'hangLoose';
            readonly angle: -40;
        };
    };
    readonly leanIn: {
        readonly head: {
            readonly turn: 17;
            readonly tilt: -6;
        };
        readonly body: {
            readonly lean: 5;
            readonly x: 18;
        };
        readonly armLeft: {
            readonly hand: {
                readonly x: 470;
                readonly y: 704;
            };
            readonly elbow: {
                readonly x: 302;
                readonly y: 738;
            };
            readonly shape: 'relaxed';
            readonly angle: -2;
            readonly view: 'back';
        };
        readonly armRight: {
            readonly hand: {
                readonly x: 608;
                readonly y: 690;
            };
            readonly elbow: {
                readonly x: 700;
                readonly y: 732;
            };
            readonly shape: 'relaxed';
            readonly angle: 174;
            readonly view: 'back';
        };
    };
    readonly pointGuest: {
        readonly head: {
            readonly turn: 16;
            readonly tilt: -5;
        };
        readonly armLeft: {
            readonly hand: {
                readonly x: 438;
                readonly y: 706;
            };
            readonly elbow: {
                readonly x: 298;
                readonly y: 692;
            };
            readonly shape: 'grip';
            readonly angle: 6;
            readonly view: 'back';
        };
        readonly armRight: {
            readonly hand: {
                readonly x: 626;
                readonly y: 596;
            };
            readonly elbow: Point;
            readonly shape: 'point';
            readonly angle: -9;
        };
    };
    readonly claspedLean: {
        readonly head: {
            readonly turn: 15;
            readonly tilt: -5;
            readonly nod: 2;
        };
        readonly body: {
            readonly lean: 4;
            readonly y: 5;
        };
        readonly armLeft: {
            readonly hand: {
                readonly x: 496;
                readonly y: 702;
            };
            readonly elbow: {
                readonly x: 302;
                readonly y: 744;
            };
            readonly shape: 'grip';
            readonly angle: -6;
            readonly view: 'back';
        };
        readonly armRight: {
            readonly hand: {
                readonly x: 524;
                readonly y: 686;
            };
            readonly elbow: {
                readonly x: 698;
                readonly y: 742;
            };
            readonly shape: 'grip';
            readonly angle: -178;
            readonly view: 'back';
        };
    };
    readonly mugHold: {
        readonly head: {
            readonly turn: 15;
            readonly tilt: -6;
        };
        readonly armLeft: {
            readonly hand: {
                readonly x: 438;
                readonly y: 706;
            };
            readonly elbow: {
                readonly x: 298;
                readonly y: 692;
            };
            readonly shape: 'grip';
            readonly angle: 6;
            readonly view: 'back';
        };
        readonly armRight: {
            readonly hand: {
                readonly x: 648;
                readonly y: 684;
            };
            readonly elbow: {
                readonly x: 726;
                readonly y: 716;
            };
            readonly shape: 'grip';
            readonly angle: 96;
            readonly view: 'back';
        };
    };
    readonly mugSip: {
        readonly head: {
            readonly turn: 14;
            readonly nod: 7;
            readonly tilt: -5;
        };
        readonly armLeft: {
            readonly hand: {
                readonly x: 438;
                readonly y: 706;
            };
            readonly elbow: {
                readonly x: 298;
                readonly y: 692;
            };
            readonly shape: 'grip';
            readonly angle: 6;
            readonly view: 'back';
        };
        readonly armRight: {
            readonly hand: {
                readonly x: 612;
                readonly y: 434;
            };
            readonly elbow: {
                readonly x: 736;
                readonly y: 628;
            };
            readonly shape: 'grip';
            readonly angle: -96;
            readonly view: 'back';
        };
    };
    readonly chinRest: {
        readonly head: {
            readonly turn: 10;
            readonly nod: 9;
            readonly tilt: -12;
            readonly x: -26;
            readonly y: 26;
        };
        readonly body: {
            readonly lean: -3;
            readonly y: 18;
            readonly turn: 10;
        };
        readonly armLeft: {
            readonly hand: {
                readonly x: 388;
                readonly y: 576;
            };
            readonly elbow: Point;
            readonly shape: 'fist';
            readonly angle: -70;
            readonly view: 'back';
        };
        readonly armRight: ArmPose;
        readonly front: 'left';
    };
    readonly steepleHands: {
        readonly head: {
            readonly tilt: -4;
            readonly nod: 3;
        };
        readonly body: {
            readonly y: 4;
        };
        readonly armLeft: {
            readonly hand: {
                readonly x: 400;
                readonly y: 646;
            };
            readonly elbow: Point;
            readonly shape: 'flat';
            readonly angle: -58;
            readonly view: 'back';
        };
        readonly armRight: {
            readonly hand: {
                readonly x: 600;
                readonly y: 646;
            };
            readonly elbow: Point;
            readonly shape: 'flat';
            readonly angle: -122;
            readonly view: 'back';
        };
    };
    readonly palmUpOffer: {
        readonly head: {
            readonly turn: 17;
            readonly tilt: -5;
        };
        readonly body: {
            readonly lean: 2;
            readonly x: 6;
        };
        readonly armLeft: ArmPose;
        readonly armRight: {
            readonly hand: {
                readonly x: 594;
                readonly y: 642;
            };
            readonly elbow: Point;
            readonly shape: 'palmUp';
            readonly angle: 0;
        };
    };
    readonly fingerTap: {
        readonly head: {
            readonly tilt: -5;
            readonly nod: 4;
        };
        readonly armLeft: ArmPose;
        readonly armRight: {
            readonly hand: {
                readonly x: 660;
                readonly y: 604;
            };
            readonly elbow: Point;
            readonly shape: 'point';
            readonly angle: 118;
        };
        readonly front: 'right';
    };
    readonly tableCount: {
        readonly head: {
            readonly tilt: -3;
            readonly nod: 2;
        };
        readonly armLeft: {
            readonly hand: {
                readonly x: 330;
                readonly y: 560;
            };
            readonly elbow: Point;
            readonly shape: 'three';
            readonly angle: -86;
        };
        readonly armRight: {
            readonly hand: {
                readonly x: 520;
                readonly y: 610;
            };
            readonly elbow: Point;
            readonly shape: 'point';
            readonly angle: -160;
        };
        readonly front: 'right';
    };
    readonly pinchPoint: {
        readonly head: {
            readonly tilt: -4;
            readonly nod: 2;
        };
        readonly armLeft: ArmPose;
        readonly armRight: {
            readonly hand: {
                readonly x: 560;
                readonly y: 615;
            };
            readonly elbow: Point;
            readonly shape: 'ok';
            readonly angle: -92;
        };
    };
    readonly chopEmphasis: {
        readonly head: {
            readonly tilt: -6;
            readonly nod: 5;
        };
        readonly armLeft: ArmPose;
        readonly armRight: {
            readonly hand: {
                readonly x: 650;
                readonly y: 624;
            };
            readonly elbow: Point;
            readonly shape: 'flat';
            readonly angle: 116;
        };
        readonly front: 'right';
    };
    readonly dismissFlick: {
        readonly head: {
            readonly turn: 8;
            readonly tilt: 6;
            readonly nod: -3;
        };
        readonly armLeft: {
            readonly hand: {
                readonly x: 240;
                readonly y: 612;
            };
            readonly elbow: Point;
            readonly shape: 'relaxed';
            readonly angle: 160;
            readonly view: 'back';
        };
        readonly armRight: ArmPose;
    };
    readonly soSo: {
        readonly head: {
            readonly tilt: 5;
        };
        readonly armLeft: {
            readonly hand: {
                readonly x: 312;
                readonly y: 592;
            };
            readonly elbow: Point;
            readonly shape: 'open';
            readonly angle: -10;
            readonly view: 'back';
        };
        readonly armRight: ArmPose;
    };
    readonly laughLean: {
        readonly head: {
            readonly turn: 10;
            readonly nod: -8;
            readonly tilt: 6;
        };
        readonly body: {
            readonly lean: -3;
            readonly y: 2;
            readonly turn: 8;
        };
        readonly armLeft: ArmPose;
        readonly armRight: {
            readonly hand: {
                readonly x: 624;
                readonly y: 622;
            };
            readonly elbow: Point;
            readonly shape: 'flat';
            readonly angle: -150;
            readonly view: 'back';
        };
    };
    readonly pointUpTable: {
        readonly head: {
            readonly tilt: -4;
        };
        readonly armLeft: {
            readonly hand: {
                readonly x: 318;
                readonly y: 540;
            };
            readonly elbow: Point;
            readonly shape: 'point';
            readonly angle: -86;
        };
        readonly armRight: ArmPose;
    };
    readonly rubHands: {
        readonly head: {
            readonly tilt: -3;
            readonly nod: 2;
        };
        readonly armLeft: {
            readonly hand: {
                readonly x: 462;
                readonly y: 640;
            };
            readonly elbow: Point;
            readonly shape: 'flat';
            readonly angle: -52;
        };
        readonly armRight: {
            readonly hand: {
                readonly x: 538;
                readonly y: 636;
            };
            readonly elbow: Point;
            readonly shape: 'flat';
            readonly angle: -128;
            readonly view: 'back';
        };
        readonly front: 'right';
    };
    readonly frameIdea: {
        readonly head: {
            readonly tilt: -3;
        };
        readonly armLeft: {
            readonly hand: {
                readonly x: 372;
                readonly y: 604;
            };
            readonly elbow: Point;
            readonly shape: 'lShape';
            readonly angle: -90;
        };
        readonly armRight: {
            readonly hand: {
                readonly x: 628;
                readonly y: 604;
            };
            readonly elbow: Point;
            readonly shape: 'lShape';
            readonly angle: -90;
        };
    };
    readonly pointSelf: {
        readonly head: {
            readonly tilt: 4;
            readonly nod: 3;
        };
        readonly armLeft: ArmPose;
        readonly armRight: {
            readonly hand: {
                readonly x: 640;
                readonly y: 620;
            };
            readonly elbow: Point;
            readonly shape: 'point';
            readonly angle: -150;
        };
    };
    readonly stopTable: {
        readonly head: {
            readonly tilt: -3;
        };
        readonly armLeft: {
            readonly hand: {
                readonly x: 296;
                readonly y: 508;
            };
            readonly elbow: Point;
            readonly shape: 'open';
            readonly angle: -92;
        };
        readonly armRight: ArmPose;
    };
    readonly shrugTable: {
        readonly head: {
            readonly tilt: 8;
        };
        readonly body: {
            readonly y: -7;
        };
        readonly armLeft: {
            readonly hand: {
                readonly x: 284;
                readonly y: 598;
            };
            readonly elbow: Point;
            readonly shape: 'palmUp';
            readonly angle: 184;
        };
        readonly armRight: {
            readonly hand: {
                readonly x: 646;
                readonly y: 612;
            };
            readonly elbow: Point;
            readonly shape: 'palmUp';
            readonly angle: 0;
        };
    };
    readonly openArmsTable: {
        readonly armLeft: {
            readonly hand: {
                readonly x: 276;
                readonly y: 590;
            };
            readonly elbow: Point;
            readonly shape: 'open';
            readonly angle: 184;
        };
        readonly armRight: {
            readonly hand: {
                readonly x: 640;
                readonly y: 618;
            };
            readonly elbow: Point;
            readonly shape: 'open';
            readonly angle: 0;
        };
    };
    readonly explainTable: {
        readonly head: {
            readonly turn: 13;
            readonly tilt: -4;
        };
        readonly armLeft: {
            readonly hand: {
                readonly x: 370;
                readonly y: 648;
            };
            readonly elbow: Point;
            readonly shape: 'palmUp';
            readonly angle: 184;
        };
        readonly armRight: {
            readonly hand: {
                readonly x: 640;
                readonly y: 620;
            };
            readonly elbow: Point;
            readonly shape: 'palmUp';
            readonly angle: 0;
        };
    };
    readonly middleFinger: {
        readonly head: {
            readonly tilt: -5;
        };
        readonly armLeft: ArmPose;
        readonly armRight: {
            readonly hand: {
                readonly x: 774;
                readonly y: 444;
            };
            readonly elbow: {
                readonly x: 826;
                readonly y: 650;
            };
            readonly shape: 'middleFinger';
            readonly angle: -92;
            readonly view: 'back';
        };
    };
    readonly tablet: Pose;
    readonly tabletRight: {
        readonly base?: string;
        readonly head?: Partial<import("../contracts/pose.js").HeadPose>;
        readonly body?: Partial<import("../contracts/pose.js").BodyPose>;
        readonly armLeft?: ArmPose;
        readonly armRight?: ArmPose;
        readonly front?: import("../contracts/pose.js").Side;
        readonly prop: {
            readonly id: 'tablet';
            readonly hand: 'right';
            readonly angle: 0;
        };
    };
    readonly tabletRead: {
        readonly head: {
            readonly nod: 16;
        };
        readonly armLeft: ArmPose;
        readonly armRight: ArmPose;
        readonly prop: {
            readonly id: 'tablet';
            readonly hand: 'left';
            readonly angle: 0;
        };
    };
    readonly countFour: {
        readonly head: {
            readonly tilt: -3;
        };
        readonly armLeft: {
            readonly hand: {
                readonly x: 280;
                readonly y: 510;
            };
            readonly elbow: {
                readonly x: 256;
                readonly y: 686;
            };
            readonly shape: 'four';
            readonly angle: -82;
        };
        readonly armRight: ArmPose;
    };
    readonly airQuotes: {
        readonly head: {
            readonly tilt: 5;
        };
        readonly armLeft: {
            readonly hand: {
                readonly x: 340;
                readonly y: 596;
            };
            readonly elbow: {
                readonly x: 278;
                readonly y: 712;
            };
            readonly shape: 'quote';
            readonly angle: -76;
        };
        readonly armRight: {
            readonly hand: {
                readonly x: 644;
                readonly y: 596;
            };
            readonly elbow: {
                readonly x: 702;
                readonly y: 712;
            };
            readonly shape: 'quote';
            readonly angle: -96;
        };
    };
    readonly fingersCrossed: {
        readonly head: {
            readonly tilt: -5;
            readonly nod: -2;
        };
        readonly armLeft: {
            readonly hand: {
                readonly x: 312;
                readonly y: 548;
            };
            readonly elbow: {
                readonly x: 266;
                readonly y: 698;
            };
            readonly shape: 'fingersCrossed';
            readonly angle: -76;
        };
        readonly armRight: ArmPose;
    };
    readonly rockOn: {
        readonly head: {
            readonly tilt: 6;
            readonly nod: -3;
        };
        readonly armLeft: {
            readonly hand: {
                readonly x: 254;
                readonly y: 484;
            };
            readonly elbow: {
                readonly x: 240;
                readonly y: 670;
            };
            readonly shape: 'rockOn';
            readonly angle: -86;
        };
        readonly armRight: ArmPose;
    };
    readonly tinyBit: {
        readonly head: {
            readonly tilt: -5;
            readonly nod: 3;
        };
        readonly armLeft: {
            readonly hand: {
                readonly x: 342;
                readonly y: 568;
            };
            readonly elbow: {
                readonly x: 276;
                readonly y: 702;
            };
            readonly shape: 'pinch';
            readonly angle: -62;
        };
        readonly armRight: ArmPose;
    };
    readonly cupEar: {
        readonly head: {
            readonly turn: 18;
            readonly tilt: -8;
            readonly nod: 2;
        };
        readonly body: {
            readonly lean: 2;
        };
        readonly armLeft: {
            readonly hand: {
                readonly x: 240;
                readonly y: 424;
            };
            readonly elbow: {
                readonly x: 216;
                readonly y: 612;
            };
            readonly shape: 'cupHand';
            readonly angle: -76;
        };
        readonly armRight: ArmPose;
    };
    readonly mindBlown: {
        readonly head: {
            readonly nod: -4;
            readonly tilt: -4;
        };
        readonly armLeft: {
            readonly hand: {
                readonly x: 296;
                readonly y: 584;
            };
            readonly elbow: {
                readonly x: 264;
                readonly y: 708;
            };
            readonly shape: 'open';
            readonly angle: -92;
        };
        readonly armRight: {
            readonly hand: {
                readonly x: 650;
                readonly y: 584;
            };
            readonly elbow: {
                readonly x: 704;
                readonly y: 708;
            };
            readonly shape: 'open';
            readonly angle: -96;
        };
    };
    readonly scalesBalance: {
        readonly head: {
            readonly tilt: -6;
        };
        readonly armLeft: {
            readonly hand: {
                readonly x: 332;
                readonly y: 584;
            };
            readonly elbow: {
                readonly x: 278;
                readonly y: 712;
            };
            readonly shape: 'palmUp';
            readonly angle: -70;
        };
        readonly armRight: {
            readonly hand: {
                readonly x: 644;
                readonly y: 620;
            };
            readonly elbow: {
                readonly x: 702;
                readonly y: 720;
            };
            readonly shape: 'palmUp';
            readonly angle: -102;
        };
    };
    readonly timeOut: {
        readonly head: {
            readonly tilt: -4;
            readonly nod: 2;
        };
        readonly armLeft: {
            readonly hand: {
                readonly x: 468;
                readonly y: 636;
            };
            readonly elbow: {
                readonly x: 330;
                readonly y: 728;
            };
            readonly shape: 'flat';
            readonly angle: -52;
        };
        readonly armRight: {
            readonly hand: {
                readonly x: 544;
                readonly y: 568;
            };
            readonly elbow: {
                readonly x: 684;
                readonly y: 706;
            };
            readonly shape: 'flat';
            readonly angle: -146;
            readonly view: 'back';
        };
        readonly front: 'right';
    };
    readonly namaste: {
        readonly head: {
            readonly nod: 6;
            readonly tilt: -3;
        };
        readonly armLeft: {
            readonly hand: {
                readonly x: 482;
                readonly y: 634;
            };
            readonly elbow: {
                readonly x: 336;
                readonly y: 732;
            };
            readonly shape: 'flat';
            readonly angle: -56;
        };
        readonly armRight: {
            readonly hand: {
                readonly x: 518;
                readonly y: 634;
            };
            readonly elbow: {
                readonly x: 664;
                readonly y: 732;
            };
            readonly shape: 'flat';
            readonly angle: -124;
            readonly view: 'back';
        };
        readonly front: 'right';
    };
    readonly chefKiss: {
        readonly head: {
            readonly turn: 12;
            readonly tilt: 6;
            readonly nod: -3;
        };
        readonly armLeft: {
            readonly hand: {
                readonly x: 278;
                readonly y: 478;
            };
            readonly elbow: {
                readonly x: 244;
                readonly y: 658;
            };
            readonly shape: 'ok';
            readonly angle: -76;
        };
        readonly armRight: ArmPose;
    };
    readonly writeAir: {
        readonly head: {
            readonly nod: 6;
            readonly tilt: -5;
        };
        readonly armLeft: {
            readonly hand: {
                readonly x: 420;
                readonly y: 598;
            };
            readonly elbow: {
                readonly x: 306;
                readonly y: 714;
            };
            readonly shape: 'pinch';
            readonly angle: -44;
        };
        readonly armRight: {
            readonly hand: {
                readonly x: 556;
                readonly y: 648;
            };
            readonly elbow: {
                readonly x: 684;
                readonly y: 726;
            };
            readonly shape: 'flat';
            readonly angle: -152;
            readonly view: 'back';
        };
        readonly front: 'left';
    };
    readonly callMe: {
        readonly head: {
            readonly turn: 16;
            readonly tilt: -8;
        };
        readonly armLeft: {
            readonly hand: {
                readonly x: 252;
                readonly y: 444;
            };
            readonly elbow: {
                readonly x: 224;
                readonly y: 632;
            };
            readonly shape: 'hangLoose';
            readonly angle: -74;
        };
        readonly armRight: ArmPose;
    };
    readonly fistBump: {
        readonly head: {
            readonly tilt: 4;
            readonly nod: 2;
        };
        readonly armLeft: {
            readonly hand: {
                readonly x: 364;
                readonly y: 582;
            };
            readonly elbow: {
                readonly x: 280;
                readonly y: 706;
            };
            readonly shape: 'fist';
            readonly angle: -54;
            readonly view: 'back';
        };
        readonly armRight: ArmPose;
    };
    readonly calmDown: {
        readonly head: {
            readonly nod: 3;
            readonly tilt: -4;
        };
        readonly armLeft: {
            readonly hand: {
                readonly x: 344;
                readonly y: 604;
            };
            readonly elbow: {
                readonly x: 278;
                readonly y: 716;
            };
            readonly shape: 'flat';
            readonly angle: -50;
            readonly view: 'back';
        };
        readonly armRight: {
            readonly hand: {
                readonly x: 636;
                readonly y: 604;
            };
            readonly elbow: {
                readonly x: 696;
                readonly y: 716;
            };
            readonly shape: 'flat';
            readonly angle: -128;
            readonly view: 'back';
        };
    };
    readonly peekEyes: {
        readonly head: {
            readonly turn: 10;
            readonly nod: 4;
            readonly tilt: -6;
        };
        readonly armLeft: {
            readonly hand: {
                readonly x: 242;
                readonly y: 432;
            };
            readonly elbow: {
                readonly x: 218;
                readonly y: 622;
            };
            readonly shape: 'open';
            readonly angle: -78;
            readonly view: 'back';
        };
        readonly armRight: ArmPose;
    };
    readonly muscleFlex: {
        readonly head: {
            readonly turn: 10;
            readonly tilt: 6;
            readonly nod: -2;
        };
        readonly armLeft: {
            readonly hand: {
                readonly x: 234;
                readonly y: 454;
            };
            readonly elbow: {
                readonly x: 202;
                readonly y: 634;
            };
            readonly shape: 'fist';
            readonly angle: -76;
        };
        readonly armRight: ArmPose;
    };
    readonly bringItIn: {
        readonly head: {
            readonly turn: 14;
            readonly nod: 2;
            readonly tilt: -5;
        };
        readonly armLeft: {
            readonly hand: {
                readonly x: 332;
                readonly y: 598;
            };
            readonly elbow: {
                readonly x: 278;
                readonly y: 716;
            };
            readonly shape: 'cupHand';
            readonly angle: -60;
        };
        readonly armRight: {
            readonly hand: {
                readonly x: 640;
                readonly y: 598;
            };
            readonly elbow: {
                readonly x: 698;
                readonly y: 716;
            };
            readonly shape: 'cupHand';
            readonly angle: -112;
        };
    };
    readonly doublePeace: {
        readonly head: {
            readonly tilt: 6;
        };
        readonly armLeft: {
            readonly hand: {
                readonly x: 312;
                readonly y: 588;
            };
            readonly elbow: {
                readonly x: 272;
                readonly y: 710;
            };
            readonly shape: 'peace';
            readonly angle: -78;
        };
        readonly armRight: {
            readonly hand: {
                readonly x: 650;
                readonly y: 588;
            };
            readonly elbow: {
                readonly x: 704;
                readonly y: 710;
            };
            readonly shape: 'peace';
            readonly angle: -98;
        };
    };
    readonly salute: {
        readonly head: {
            readonly turn: 12;
            readonly tilt: -4;
            readonly nod: -2;
        };
        readonly armLeft: {
            readonly hand: {
                readonly x: 242;
                readonly y: 420;
            };
            readonly elbow: {
                readonly x: 214;
                readonly y: 608;
            };
            readonly shape: 'flat';
            readonly angle: -68;
        };
        readonly armRight: ArmPose;
    };
    readonly laptopType: Pose;
    readonly laptopMouse: Pose;
    readonly laptopClick: Pose;
    readonly laptopLook: Pose;
    readonly laptopTalk: Pose;
    readonly laptopExplain: Pose;
    readonly laptopPoint: Pose;
    readonly laptopThink: Pose;
    readonly laptopThumbsUp: Pose;
    readonly laptopAlienType: Pose;
    readonly laptopAlienMouse: Pose;
    readonly laptopAlienClick: Pose;
    readonly laptopAlienLook: Pose;
    readonly laptopAlienTalk: Pose;
    readonly laptopAlienExplain: Pose;
    readonly laptopAlienPoint: Pose;
    readonly laptopAlienThink: Pose;
    readonly laptopAlienThumbsUp: Pose;
    readonly laptopThinkpadType: Pose;
    readonly laptopThinkpadMouse: Pose;
    readonly laptopThinkpadClick: Pose;
    readonly laptopThinkpadLook: Pose;
    readonly laptopThinkpadTalk: Pose;
    readonly laptopThinkpadExplain: Pose;
    readonly laptopThinkpadPoint: Pose;
    readonly laptopThinkpadThink: Pose;
    readonly laptopThinkpadThumbsUp: Pose;
};
export declare const OFFICIAL_POSES: typeof POSES;
export declare const DERIVED_POSES: {
    readonly pointLeft: {
        readonly from: 'pointRight';
        readonly how: 'mirror';
    };
    readonly presentLeft: {
        readonly from: 'presentRight';
        readonly how: 'mirror';
    };
    readonly pointScreenLeft: {
        readonly from: 'pointScreenRight';
        readonly how: 'mirror';
    };
    readonly waveLeft: {
        readonly from: 'waveRight';
        readonly how: 'mirror';
    };
    readonly tabletRight: {
        readonly from: 'tablet';
        readonly how: 'owner';
    };
};
export declare function derivedPose(how: 'mirror' | 'owner', source: Pose): Pose;
export declare function buildPoses(official: typeof POSES, versions: Readonly<Partial<Record<string, Pose>>>): typeof POSES;
export type PoseId = keyof typeof POSES;
export declare const POSE_IDS: PoseId[];
export declare const POSE_LABELS: Record<PoseId, string>;
export declare function isPoseId(value: unknown): value is PoseId;
