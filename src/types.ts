export interface Param {
  id: number;
  name: string;
}

export interface ParamValue {
  paramId: number;
  value: string;
}

export interface Color {
  id: number;
  name: string;
  hex: string;
}

export interface Model {
  paramValues: ParamValue[];
  colors: Color[];
}

export interface Props {
  params: Param[];
  model: Model;
}

export interface State {
  paramValues: Map<number, string>;
}