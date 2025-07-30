export enum NodeType {
  /** 旁白介绍 */
  narration = 'narration',
  /** 进入博物馆 */
  enterMuseum = 'enterMuseum',
  /** AR识别 */
  cameraRecognize = 'cameraRecognize',
  /** 分支结构 */
  branch = 'branch',
  /** 分支结构V2 */
  branchV2 = 'branchV2',
  /** 输入答案 */
  input = 'input',
  /** 回答问题 */
  question = 'question',
  /** 对话模式 */
  dialogue = 'dialogue',
  /** 对话模式v2 */
  dialogueV2 = 'dialogueV2',
  /** 视频介绍 */
  video = 'video',
  /** 迷宫 */
  maze = 'maze',
  /** 翻牌 */
  flip = 'flip',
  /** 翻牌 */
  clue = 'clue',
}

export interface INodeTypeConf {
  nodeLabel: string;
  borderColor: string;
  backgroundColor: string;
}

export interface INodeSelect {
  id: string;
  nodeType: NodeType;
  nodeLabel: string;
}

export interface VideoNodeData {
  video: string;
  pointId?: string;
  nftId?: string;
}

export interface QuestionNodeData {
  bg: string;
  question: string;
  questionTop: number;
  dub: string;
  questionOptions: {
    image?: string;
    description: string;
  }[];
  answer: number;
  pointId?: string;
  nftId?: string;
}

export interface DialogueNodeData {
  bg: string;
  dialogueList: {
    roleName: string;
    roleAvatar: string;
    dialogue: string;
    dialogueCover: string;
    dub: string;
    button: string;
    buttonBg: string;
    buttonPadding: number;
    buttonBottom: number;
    buttonRadius: number;
  }[];
  pointId?: string;
  nftId?: string;
}

export interface CameraRecognizeNodeData {
  bg: string;
  description: string;
  descriptionTop: number;
  dub: string;
  image: string[];
  model: string;
  buttonBottom: number;
  pointId?: string;
  nftId?: string;
}

export interface NarrationNodeData {
  bg: string;
  description: string;
  dub: string;
  descriptionTop: number;
  button?: string;
  buttonBg: string;
  buttonRadius: number;
  buttonPadding: number;
  buttonBottom: number;
  pointId?: string;
  nftId?: string;
}

export interface EnterMuseumData {
  bg: string;
  description: string;
  descriptionTop: string;
  dub: string;
  button?: string;
  buttonBg?: string;
  buttonPadding?: number;
  buttonRadius?: number;
  buttonBottom?: number;
  pointId?: string;
  nftId?: string;
}

export interface BranchNodeData {
  bg: string;
  question: string;
  questionTop: number;
  dub: string;
  branchs: {
    button?: string;
    buttonBg: string;
    buttonRadius: number;
    buttonPadding: number;
  }[];
  buttonBottom: number;
  pointId?: string;
  nftId?: string;
}

export interface BranchV2NodeData {
  title: string;
  branchs: string[];
  buttonBottom: number;
  tip: string;
  pointId?: string;
  nftId?: string;
}

export interface InputNodeData {
  bg: string;
  question: string;
  questionTop: number;
  dub: string;
  questionTips: string[];
  placeholder: string;
  answer: string;
  inputBottom: number;
  pointId?: string;
  nftId?: string;
}

export interface ClueNodeData {
  image: string[];
  clueList: {
    title: string;
    content: string;
  }[];
  pointId?: string;
  nftId?: string;
}

export interface FlipNodeData {
  imgs: string[];
  pointId?: string;
  nftId?: string;
}

export interface MazeNodeData {
  width: number;
  height: number;
  start: string;
  end: string;
  mazeWalls: string[];
}

export interface DialogueV2NodeData {
  bg: string;
  dialogueList: {
    characterId: string;
    dialogue: string;
    position: 'left' | 'right';
    dub: string;
  }[];
  pointId?: string;
  nftId?: string;
}

export type NodeData<T = any> = T extends NodeType.video
  ? VideoNodeData
  : T extends NodeType.question
  ? QuestionNodeData
  : T extends NodeType.dialogue
  ? DialogueNodeData
  : T extends NodeType.cameraRecognize
  ? CameraRecognizeNodeData
  : T extends NodeType.branch
  ? NarrationNodeData
  : T extends NodeType.input
  ? InputNodeData
  : T extends NodeType.narration
  ? NarrationNodeData
  : T extends NodeType.enterMuseum
  ? EnterMuseumData
  : any;
