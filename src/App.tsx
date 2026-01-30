import React, { useRef } from 'react';
import ParamEditor from './ParamEditor';
import { Param, Model } from './types';

function App() {
  const paramEditorRef = useRef<any>(null);

  const params: Param[] = [
    { id: 1, name: 'Назначение' },
    { id: 2, name: 'Длина' },
  ];

  const model: Model = {
    paramValues: [
      { paramId: 1, value: 'повседневное' },
      { paramId: 2, value: 'макси' },
    ],
    colors: [],
  };

  const handleGetModel = () => {
    if (paramEditorRef.current) {
      const model = paramEditorRef.current.getModel();
      console.log('Current model:', JSON.stringify(model, null, 2));
    }
  };

  return (
    <div>
      <ParamEditor 
        ref={paramEditorRef}
        params={params} 
        model={model} 
      />
      
      <button 
        onClick={handleGetModel}
        title="Получить текущую модель"
      >
        Get Model (check console)
      </button>
    </div>
  );
}

export default App;