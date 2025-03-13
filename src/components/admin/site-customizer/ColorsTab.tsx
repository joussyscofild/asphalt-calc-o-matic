
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SiteSettings } from './types';
import { Button } from "@/components/ui/button";
import { AlertCircle, Info } from 'lucide-react';
import { 
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface ColorInputProps {
  id: string;
  name: string;
  value: string;
  label: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  info?: string;
}

const ColorInput: React.FC<ColorInputProps> = ({ id, name, value, label, onChange, info }) => (
  <div className="space-y-4">
    <div className="flex items-center">
      <Label htmlFor={id}>{label}</Label>
      {info && (
        <Tooltip>
          <TooltipTrigger asChild>
            <Info className="h-4 w-4 ml-2 text-gray-500 cursor-help" />
          </TooltipTrigger>
          <TooltipContent>
            <p className="max-w-xs">{info}</p>
          </TooltipContent>
        </Tooltip>
      )}
    </div>
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
        className="w-32"
      />
      <input
        type="color"
        value={value}
        onChange={(e) => {
          const syntheticEvent = {
            target: {
              name,
              value: e.target.value
            }
          } as React.ChangeEvent<HTMLInputElement>;
          onChange(syntheticEvent);
        }}
        className="h-10 w-10"
      />
    </div>
  </div>
);

// Brand color palettes
const colorPresets = [
  {
    name: "Construction",
    primary: "#2563eb",
    secondary: "#f97316",
    accent: "#10b981",
  },
  {
    name: "Professional",
    primary: "#1e40af",
    secondary: "#475569",
    accent: "#0ea5e9",
  },
  {
    name: "Modern",
    primary: "#4f46e5",
    secondary: "#0f172a",
    accent: "#06b6d4",
  },
  {
    name: "Earthy",
    primary: "#78350f",
    secondary: "#a16207",
    accent: "#65a30d",
  }
];

interface ColorsTabProps {
  settings: SiteSettings;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ColorsTab: React.FC<ColorsTabProps> = ({ settings, handleChange }) => {
  // Function to apply a color preset
  const applyPreset = (preset: typeof colorPresets[0]) => {
    // Create synthetic events for each color field
    const fields = [
      { name: 'primaryColor', value: preset.primary },
      { name: 'secondaryColor', value: preset.secondary },
      { name: 'accentColor', value: preset.accent }
    ];
    
    fields.forEach(field => {
      const syntheticEvent = {
        target: {
          name: field.name,
          value: field.value
        }
      } as React.ChangeEvent<HTMLInputElement>;
      
      handleChange(syntheticEvent);
    });
  };
  
  return (
    <>
      <div className="mb-8 p-4 border border-amber-200 bg-amber-50 rounded-md">
        <div className="flex items-start space-x-3">
          <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5" />
          <div>
            <h3 className="font-medium text-amber-800">Brand Identity Guideline</h3>
            <p className="text-sm text-amber-700 mt-1">
              Choose colors that align with your brand identity. For construction sites, we recommend 
              using blues for primary, oranges for secondary, and greens for accent colors. 
              Use the presets below for professionally selected combinations.
            </p>
          </div>
        </div>
      </div>
      
      <div className="mb-8">
        <h3 className="text-lg font-medium mb-4">Color Presets</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {colorPresets.map((preset, index) => (
            <Button 
              key={index} 
              variant="outline" 
              className="flex flex-col items-center p-3 h-auto"
              onClick={() => applyPreset(preset)}
            >
              <span className="mb-2">{preset.name}</span>
              <div className="flex space-x-1">
                <div className="w-6 h-6 rounded-full" style={{ backgroundColor: preset.primary }}></div>
                <div className="w-6 h-6 rounded-full" style={{ backgroundColor: preset.secondary }}></div>
                <div className="w-6 h-6 rounded-full" style={{ backgroundColor: preset.accent }}></div>
              </div>
            </Button>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ColorInput 
          id="primary-color"
          name="primaryColor"
          value={settings.primaryColor}
          label="Primary Color"
          onChange={handleChange}
          info="Used for main buttons, links and important UI elements. Blues work well for construction sites."
        />
        
        <ColorInput 
          id="secondary-color"
          name="secondaryColor"
          value={settings.secondaryColor}
          label="Secondary Color"
          onChange={handleChange}
          info="Used for secondary elements, highlights and call-to-actions. Orange tones provide good contrast to blue."
        />
        
        <ColorInput 
          id="accent-color"
          name="accentColor"
          value={settings.accentColor}
          label="Accent Color"
          onChange={handleChange}
          info="Used sparingly for highlighting important items. Green suggests eco-friendliness in construction."
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
      
      <div className="mt-8">
        <h3 className="text-lg font-medium mb-4">UI Elements Preview</h3>
        <div className="p-6 border rounded-lg bg-gray-50">
          <div className="mb-6">
            <button className="py-2 px-4 rounded-md text-white mr-3" style={{ backgroundColor: settings.primaryColor }}>
              Primary Button
            </button>
            <button className="py-2 px-4 rounded-md text-white" style={{ backgroundColor: settings.secondaryColor }}>
              Secondary Button
            </button>
          </div>
          <div className="mb-6">
            <div className="rounded-md p-4" style={{ backgroundColor: `${settings.primaryColor}20` }}>
              <div className="text-lg font-bold mb-2" style={{ color: settings.primaryColor }}>
                Information Alert
              </div>
              <p>This is how information alerts will look with your chosen primary color.</p>
              <a href="#" className="font-medium" style={{ color: settings.primaryColor }}>Learn more</a>
            </div>
          </div>
          <div>
            <div className="p-4 rounded-md" style={{ border: `2px solid ${settings.accentColor}` }}>
              <div className="text-lg mb-2 font-bold" style={{ color: settings.accentColor }}>
                Feature Box 
              </div>
              <p>This shows how feature boxes and bordered elements will appear with your accent color.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ColorsTab;
