
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SiteSettings } from './types';

interface ColorInputProps {
  id: string;
  name: string;
  value: string;
  label: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ColorInput: React.FC<ColorInputProps> = ({ id, name, value, label, onChange }) => (
  <div className="space-y-4">
    <Label htmlFor={id}>{label}</Label>
    <div className="flex items-center space-x-2">
      <div 
        className="w-10 h-10 rounded-md border"
        style={{ backgroundColor: value }}
      />
      <Input 
        id={id} 
        name={name} 
        value={value} 
        onChange={onChange}
        type="text"
      />
    </div>
  </div>
);

interface ColorsTabProps {
  settings: SiteSettings;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ColorsTab: React.FC<ColorsTabProps> = ({ settings, handleChange }) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ColorInput 
          id="primary-color"
          name="primaryColor"
          value={settings.primaryColor}
          label="Primary Color"
          onChange={handleChange}
        />
        
        <ColorInput 
          id="secondary-color"
          name="secondaryColor"
          value={settings.secondaryColor}
          label="Secondary Color"
          onChange={handleChange}
        />
        
        <ColorInput 
          id="accent-color"
          name="accentColor"
          value={settings.accentColor}
          label="Accent Color"
          onChange={handleChange}
        />
      </div>
      
      <div className="mt-8">
        <h3 className="text-lg font-medium mb-4">Color Preview</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div 
            className="h-24 rounded-md flex items-center justify-center text-white font-medium"
            style={{ backgroundColor: settings.primaryColor }}
          >
            Primary Color
          </div>
          <div 
            className="h-24 rounded-md flex items-center justify-center text-white font-medium"
            style={{ backgroundColor: settings.secondaryColor }}
          >
            Secondary Color
          </div>
          <div 
            className="h-24 rounded-md flex items-center justify-center text-white font-medium"
            style={{ backgroundColor: settings.accentColor }}
          >
            Accent Color
          </div>
        </div>
      </div>
    </>
  );
};

export default ColorsTab;
