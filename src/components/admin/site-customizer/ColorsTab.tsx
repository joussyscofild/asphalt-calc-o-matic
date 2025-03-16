
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

// Updated modern calculator-focused color palettes
const colorPresets = [
  {
    name: "Modern Calculator",
    primary: "#4299E1",
    secondary: "#A0AEC0",
    accent: "#805AD5",
  },
  {
    name: "Professional",
    primary: "#3182CE",
    secondary: "#718096",
    accent: "#3182CE",
  },
  {
    name: "Tech-Focused",
    primary: "#3B82F6",
    secondary: "#1E293B",
    accent: "#6366F1",
  },
  {
    name: "Soft UI",
    primary: "#60A5FA",
    secondary: "#94A3B8",
    accent: "#8B5CF6",
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
      <div className="mb-8 p-4 border border-blue-200 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-800 rounded-md">
        <div className="flex items-start space-x-3">
          <AlertCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
          <div>
            <h3 className="font-medium text-blue-800 dark:text-blue-300">Calculator Site Color Guidelines</h3>
            <p className="text-sm text-blue-700 dark:text-blue-400 mt-1">
              For calculator websites, we recommend using blues and purples for primary colors to convey trust and precision.
              Use neutral grays for secondary colors and vibrant accents for interactive elements.
              Choose from our presets below for optimized combinations.
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
              className="flex flex-col items-center p-3 h-auto border-gray-200 hover:border-safety hover:bg-gray-50"
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
          info="Used for main buttons, links and important UI elements. Blues work well for calculator sites."
        />
        
        <ColorInput 
          id="secondary-color"
          name="secondaryColor"
          value={settings.secondaryColor}
          label="Secondary Color"
          onChange={handleChange}
          info="Used for secondary elements, backgrounds, and supporting UI. Neutral grays work well."
        />
        
        <ColorInput 
          id="accent-color"
          name="accentColor"
          value={settings.accentColor}
          label="Accent Color"
          onChange={handleChange}
          info="Used sparingly for highlighting important items, calls-to-action, and results."
        />
      </div>
      
      <div className="mt-8">
        <h3 className="text-lg font-medium mb-4">Color Preview</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div 
            className="h-24 rounded-md flex items-center justify-center text-white font-medium shadow-sm"
            style={{ backgroundColor: settings.primaryColor }}
          >
            Primary Color
          </div>
          <div 
            className="h-24 rounded-md flex items-center justify-center text-white font-medium shadow-sm"
            style={{ backgroundColor: settings.secondaryColor }}
          >
            Secondary Color
          </div>
          <div 
            className="h-24 rounded-md flex items-center justify-center text-white font-medium shadow-sm"
            style={{ backgroundColor: settings.accentColor }}
          >
            Accent Color
          </div>
        </div>
      </div>
      
      <div className="mt-8">
        <h3 className="text-lg font-medium mb-4">UI Elements Preview</h3>
        <div className="p-6 border rounded-lg bg-white dark:bg-gray-800 shadow-sm">
          <div className="mb-6">
            <button className="py-2 px-4 rounded-md text-white mr-3 shadow-sm" style={{ backgroundColor: settings.primaryColor }}>
              Primary Button
            </button>
            <button className="py-2 px-4 rounded-md text-white shadow-sm" style={{ backgroundColor: settings.secondaryColor }}>
              Secondary Button
            </button>
          </div>
          <div className="mb-6">
            <div className="rounded-md p-4 shadow-sm" style={{ backgroundColor: `${settings.primaryColor}10` }}>
              <div className="text-lg font-bold mb-2" style={{ color: settings.primaryColor }}>
                Calculator Result
              </div>
              <p>This shows how calculation results might appear with your chosen primary color.</p>
              <div className="mt-2 p-2 rounded bg-white dark:bg-gray-700 border" style={{ borderColor: `${settings.primaryColor}50` }}>
                <span className="font-mono font-bold" style={{ color: settings.accentColor }}>42.5 sq ft</span>
              </div>
            </div>
          </div>
          <div>
            <div className="p-4 rounded-md shadow-sm" style={{ border: `2px solid ${settings.accentColor}` }}>
              <div className="text-lg mb-2 font-bold" style={{ color: settings.accentColor }}>
                Calculator Input
              </div>
              <p>This demonstrates how calculator inputs and form elements will appear with your accent color.</p>
              <div className="mt-3 flex items-end gap-2">
                <div className="flex-1">
                  <label className="block mb-1 text-sm font-medium">Length (ft)</label>
                  <input type="text" className="w-full p-2 border rounded" style={{ borderColor: settings.secondaryColor }} value="10" readOnly />
                </div>
                <div className="flex-1">
                  <label className="block mb-1 text-sm font-medium">Width (ft)</label>
                  <input type="text" className="w-full p-2 border rounded" style={{ borderColor: settings.secondaryColor }} value="12" readOnly />
                </div>
                <button className="py-2 px-4 rounded-md text-white" style={{ backgroundColor: settings.accentColor }}>
                  Calculate
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ColorsTab;
