import React, { Component } from 'react';
import { Param, ParamValue, Model, Props, State } from './types';

export class ParamEditor extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    
    const paramValuesMap = new Map<number, string>();
    
    props.params.forEach(param => {
      const paramValue = props.model.paramValues.find(
        pv => pv.paramId === param.id
      );
      paramValuesMap.set(param.id, paramValue?.value || '');
    });

    this.state = {
      paramValues: paramValuesMap,
    };
  }

  handleParamChange = (paramId: number, value: string) => {
    this.setState(prevState => {
      const newParamValues = new Map(prevState.paramValues);
      newParamValues.set(paramId, value);
      return { paramValues: newParamValues };
    });
  };

  getModel = (): Model => {
    const paramValues: ParamValue[] = [];
    
    this.state.paramValues.forEach((value, paramId) => {
      paramValues.push({
        paramId,
        value,
      });
    });

    return {
      paramValues,
      colors: this.props.model.colors,
    };
  };

  render() {
    const { params } = this.props;
  
    return (
      <div>
        {params.map(param => {
          const value = this.state.paramValues.get(param.id) || '';
          const inputId = `param-${param.id}`;
          
          return (
            <div key={param.id}>
              <label htmlFor={inputId}>
                {param.name}:
              </label>
              <input
                id={inputId}
                type="text"
                value={value}
                onChange={(e) => this.handleParamChange(param.id, e.target.value)}
                placeholder={`Введите ${param.name.toLowerCase()}`}
                title={param.name}
                aria-label={param.name}
              />
            </div>
          );
        })}
      </div>
    );
  }
}

const ParamEditorWithRef = React.forwardRef<any, Props>((props, ref) => {
  return <ParamEditor {...props} ref={ref} />;
});

export default ParamEditorWithRef;