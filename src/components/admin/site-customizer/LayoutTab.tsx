
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { SiteSettings } from './types';

interface LayoutOptionProps {
  type: 'header' | 'footer';
  layout: string;
  currentValue: string;
  onClick: () => void;
  label: string;
  children: React.ReactNode;
}

const LayoutOption: React.FC<LayoutOptionProps> = ({ 
  type, layout, currentValue, onClick, label, children 
}) => (
  <Card 
    className={`p-4 cursor-pointer transition-all ${currentValue === layout ? 'ring-2 ring-primary' : 'hover:bg-muted'}`}
    onClick={onClick}
  >
    <CardContent className="p-0">
      {children}
      <p className="text-center text-sm">{label}</p>
    </CardContent>
  </Card>
);

interface LayoutTabProps {
  settings: SiteSettings;
  setSettings: React.Dispatch<React.SetStateAction<SiteSettings>>;
}

const LayoutTab: React.FC<LayoutTabProps> = ({ settings, setSettings }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <h3 className="text-lg font-medium mb-4">Header Layout</h3>
        <div className="grid grid-cols-2 gap-4">
          <LayoutOption
            type="header"
            layout="standard"
            currentValue={settings.headerLayout}
            onClick={() => setSettings(prev => ({ ...prev, headerLayout: 'standard' }))}
            label="Standard"
          >
            <div className="h-16 bg-muted rounded-md mb-2 flex items-center justify-between px-4">
              <div className="w-8 h-8 bg-gray-400 rounded"></div>
              <div className="flex space-x-2">
                <div className="w-12 h-4 bg-gray-400 rounded"></div>
                <div className="w-12 h-4 bg-gray-400 rounded"></div>
                <div className="w-12 h-4 bg-gray-400 rounded"></div>
              </div>
            </div>
          </LayoutOption>
          
          <LayoutOption
            type="header"
            layout="centered"
            currentValue={settings.headerLayout}
            onClick={() => setSettings(prev => ({ ...prev, headerLayout: 'centered' }))}
            label="Centered"
          >
            <div className="h-16 bg-muted rounded-md mb-2 flex flex-col items-center justify-center px-4">
              <div className="w-8 h-8 bg-gray-400 rounded mb-1"></div>
              <div className="flex space-x-2">
                <div className="w-12 h-4 bg-gray-400 rounded"></div>
                <div className="w-12 h-4 bg-gray-400 rounded"></div>
                <div className="w-12 h-4 bg-gray-400 rounded"></div>
              </div>
            </div>
          </LayoutOption>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-medium mb-4">Footer Layout</h3>
        <div className="grid grid-cols-2 gap-4">
          <LayoutOption
            type="footer"
            layout="standard"
            currentValue={settings.footerLayout}
            onClick={() => setSettings(prev => ({ ...prev, footerLayout: 'standard' }))}
            label="Standard"
          >
            <div className="h-16 bg-muted rounded-md mb-2 flex items-center justify-between px-4">
              <div className="w-24 h-4 bg-gray-400 rounded"></div>
              <div className="flex space-x-2">
                <div className="w-4 h-4 bg-gray-400 rounded"></div>
                <div className="w-4 h-4 bg-gray-400 rounded"></div>
                <div className="w-4 h-4 bg-gray-400 rounded"></div>
              </div>
            </div>
          </LayoutOption>
          
          <LayoutOption
            type="footer"
            layout="complex"
            currentValue={settings.footerLayout}
            onClick={() => setSettings(prev => ({ ...prev, footerLayout: 'complex' }))}
            label="Complex"
          >
            <div className="h-16 bg-muted rounded-md mb-2 grid grid-cols-3 gap-2 p-2">
              <div className="col-span-1">
                <div className="w-full h-3 bg-gray-400 rounded mb-1"></div>
                <div className="w-full h-3 bg-gray-400 rounded"></div>
              </div>
              <div className="col-span-1">
                <div className="w-full h-3 bg-gray-400 rounded mb-1"></div>
                <div className="w-full h-3 bg-gray-400 rounded"></div>
              </div>
              <div className="col-span-1">
                <div className="w-full h-3 bg-gray-400 rounded mb-1"></div>
                <div className="w-full h-3 bg-gray-400 rounded"></div>
              </div>
            </div>
          </LayoutOption>
        </div>
      </div>
    </div>
  );
};

export default LayoutTab;
