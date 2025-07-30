interface IScript {
  id: string;
  museumId: string;
  museumName: string;
  name: string;
  description: string;
  type: number;
  coverUrl: string;
  pictureUrl: string;
}

interface IScriptPoint {
  scriptTemplateId: string;
  id: string;
  name: string;
  width: number;
  height: number;
  left: number;
  right: number;
}

interface IScriptTask {
  id: string;
  name: string;
  dataJson: string;
  nodeLineDate: string;
}
