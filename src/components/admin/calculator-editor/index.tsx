
import React from 'react';
import { CalculatorEditorProps } from './types';
import CalculatorEditorForm from './CalculatorEditorForm';

const CalculatorEditor: React.FC<CalculatorEditorProps> = (props) => {
  return <CalculatorEditorForm {...props} />;
};

export default CalculatorEditor;
