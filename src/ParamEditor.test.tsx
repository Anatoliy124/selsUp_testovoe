import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Param, Model } from './types';

import ParamEditorDefault, { ParamEditor } from './ParamEditor';

describe('ParamEditor', () => {
  const mockParams: Param[] = [
    { id: 1, name: 'Назначение' },
    { id: 2, name: 'Длина' },
  ];

  const mockModel: Model = {
    paramValues: [
      { paramId: 1, value: 'повседневное' },
      { paramId: 2, value: 'макси' },
    ],
    colors: [],
  };

  test('отображает оба поля параметров', () => {
    render(<ParamEditor params={mockParams} model={mockModel} />);
    
    // Используем getByLabelText для поиска по label
    expect(screen.getByLabelText('Назначение:')).toBeInTheDocument();
    expect(screen.getByLabelText('Длина:')).toBeInTheDocument();
  });

  test('инициализирует значения из модели', () => {
    render(<ParamEditor params={mockParams} model={mockModel} />);
    
    const purposeInput = screen.getByDisplayValue('повседневное');
    const lengthInput = screen.getByDisplayValue('макси');
    
    expect(purposeInput).toBeInTheDocument();
    expect(lengthInput).toBeInTheDocument();
  });

  test('возвращает корректную модель через getModel', () => {
    const ref = React.createRef<any>();
    
    render(<ParamEditorDefault 
      ref={ref}
      params={mockParams} 
      model={mockModel} 
    />);

    const component = ref.current;
    expect(component).toBeDefined();
    
    const model = component.getModel();
    
    expect(model).toBeDefined();
    expect(model.paramValues).toHaveLength(2);
    
    const purposeParam = model.paramValues.find(pv => pv.paramId === 1);
    expect(purposeParam.value).toBe('повседневное');
    
    const lengthParam = model.paramValues.find(pv => pv.paramId === 2);
    expect(lengthParam.value).toBe('макси');
  });

  test('обновляет значения параметров', async () => {
    const ref = React.createRef<any>();
    const user = userEvent.setup();
    
    render(<ParamEditorDefault 
      ref={ref}
      params={mockParams} 
      model={mockModel} 
    />);

    const purposeInput = screen.getByDisplayValue('повседневное');
    
    await user.clear(purposeInput);
    await user.type(purposeInput, 'вечернее');
    
    const model = ref.current.getModel();
    const purposeParam = model.paramValues.find(pv => pv.paramId === 1);
    
    expect(purposeParam.value).toBe('вечернее');
  });

  test('сохраняет оригинальные цвета в модели', () => {
    const modelWithColors: Model = {
      paramValues: [
        { paramId: 1, value: 'повседневное' },
      ],
      colors: [
        { id: 1, name: 'Красный', hex: '#FF0000' },
        { id: 2, name: 'Синий', hex: '#0000FF' },
      ],
    };

    const ref = React.createRef<any>();
    
    render(<ParamEditorDefault 
      ref={ref}
      params={[mockParams[0]]} 
      model={modelWithColors} 
    />);

    const model = ref.current.getModel();
    
    expect(model.colors).toHaveLength(2);
    expect(model.colors[0].name).toBe('Красный');
    expect(model.colors[1].hex).toBe('#0000FF');
  });

  test('сохраняет пустое значение для параметра без начального значения', () => {
    const modelWithoutValues: Model = {
      paramValues: [],
      colors: [],
    };

    const ref = React.createRef<any>();
    
    render(<ParamEditorDefault 
      ref={ref}
      params={mockParams} 
      model={modelWithoutValues} 
    />);

    const model = ref.current.getModel();
    
    expect(model.paramValues).toHaveLength(2);
    
    const purposeParam = model.paramValues.find(pv => pv.paramId === 1);
    expect(purposeParam.value).toBe('');
    
    const lengthParam = model.paramValues.find(pv => pv.paramId === 2);
    expect(lengthParam.value).toBe('');
  });
});