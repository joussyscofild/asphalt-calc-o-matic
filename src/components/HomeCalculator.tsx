
import React, { useState, useEffect } from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { PrinterIcon, Share2Icon, RefreshCcw } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface CalculatorResult {
  volume: string;
  tons: string;
  cost: string;
  mixType: string;
}

const HomeCalculator = () => {
  const [unitSystem, setUnitSystem] = useState<'imperial' | 'metric'>('imperial');
  const [length, setLength] = useState<number>(10);
  const [width, setWidth] = useState<number>(10);
  const [thickness, setThickness] = useState<number>(2);
  const [density, setDensity] = useState<number>(145);
  const [costPerTon, setCostPerTon] = useState<number>(100);
  const [calculationResult, setCalculationResult] = useState<CalculatorResult | null>(null);
  const { toast } = useToast();

  // Calculate when inputs change
  useEffect(() => {
    calculateResults();
  }, [length, width, thickness, density, costPerTon, unitSystem]);

  const calculateResults = () => {
    try {
      // Convert metrics to imperial if needed for calculation
      let calcLength = length;
      let calcWidth = width;
      let calcThickness = thickness;
      
      if (unitSystem === 'metric') {
        // Convert meters to feet and cm to inches
        calcLength = length * 3.28084;
        calcWidth = width * 3.28084;
        calcThickness = thickness / 2.54;
      }
      
      // Calculate volume in cubic feet
      const thicknessInFeet = calcThickness / 12;
      const cubicFeet = calcLength * calcWidth * thicknessInFeet;
      
      // Calculate tons
      const pounds = cubicFeet * density;
      const tons = pounds / 2000;
      
      // Calculate cost
      const cost = tons * costPerTon;
      
      // Determine mix type recommendation based on thickness
      let mixType = "Standard Hot Mix Asphalt";
      if (calcThickness < 1.5) {
        mixType = "Fine Hot Mix Asphalt";
      } else if (calcThickness > 3) {
        mixType = "Heavy-Duty Hot Mix Asphalt";
      }

      // Format results based on unit system
      let volumeDisplay = unitSystem === 'imperial' 
        ? `${cubicFeet.toFixed(2)} cubic feet` 
        : `${(cubicFeet * 0.0283168).toFixed(2)} cubic meters`;

      setCalculationResult({
        volume: volumeDisplay,
        tons: tons.toFixed(2),
        cost: cost.toFixed(2),
        mixType: mixType
      });
    } catch (error) {
      console.error("Calculation error:", error);
      setCalculationResult(null);
    }
  };

  const handleResetCalculator = () => {
    setLength(unitSystem === 'imperial' ? 10 : 3);
    setWidth(unitSystem === 'imperial' ? 10 : 3);
    setThickness(unitSystem === 'imperial' ? 2 : 5);
    setDensity(145);
    setCostPerTon(100);
    
    toast({
      title: "Calculator Reset",
      description: "All values have been reset to default.",
    });
  };

  const handlePrint = () => {
    window.print();
    
    toast({
      title: "Print Initiated",
      description: "The calculator results are being sent to your printer.",
    });
  };

  const handleShare = () => {
    // Create shareable URL with parameters
    const url = new URL(window.location.href);
    url.searchParams.set('calc', 'asphalt');
    url.searchParams.set('l', length.toString());
    url.searchParams.set('w', width.toString());
    url.searchParams.set('t', thickness.toString());
    url.searchParams.set('d', density.toString());
    url.searchParams.set('c', costPerTon.toString());
    url.searchParams.set('u', unitSystem);
    
    // Copy to clipboard
    navigator.clipboard.writeText(url.toString())
      .then(() => {
        toast({
          title: "Link Copied!",
          description: "Calculator link has been copied to your clipboard.",
        });
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
        toast({
          title: "Sharing Failed",
          description: "Could not copy the link to clipboard.",
          variant: "destructive"
        });
      });
  };

  const toggleUnitSystem = () => {
    if (unitSystem === 'imperial') {
      // Convert imperial to metric
      setLength(Number((length / 3.28084).toFixed(2)));
      setWidth(Number((width / 3.28084).toFixed(2)));
      setThickness(Number((thickness * 2.54).toFixed(1)));
      setUnitSystem('metric');
    } else {
      // Convert metric to imperial
      setLength(Number((length * 3.28084).toFixed(2)));
      setWidth(Number((width * 3.28084).toFixed(2)));
      setThickness(Number((thickness / 2.54).toFixed(1)));
      setUnitSystem('imperial');
    }
  };

  return (
    <div className="calculator-card">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold">Asphalt Tonnage Calculator</h3>
        <div className="flex space-x-2">
          <div className="text-sm font-medium">Units:</div>
          <div className="flex p-1 bg-gray-100 rounded-full">
            <button
              onClick={() => unitSystem !== 'imperial' && toggleUnitSystem()}
              className={`px-3 py-1 text-xs font-medium rounded-full transition-all ${
                unitSystem === 'imperial' ? 'bg-white shadow-sm' : 'text-gray-600'
              }`}
            >
              Imperial
            </button>
            <button
              onClick={() => unitSystem !== 'metric' && toggleUnitSystem()}
              className={`px-3 py-1 text-xs font-medium rounded-full transition-all ${
                unitSystem === 'metric' ? 'bg-white shadow-sm' : 'text-gray-600'
              }`}
            >
              Metric
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-5">
        <h4 className="text-md font-semibold text-asphalt">Project Dimensions</h4>
        
        <div>
          <div className="flex justify-between items-center mb-1">
            <Label htmlFor="length">
              Length {unitSystem === 'imperial' ? '(feet)' : '(meters)'}
            </Label>
            <span className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">{length}</span>
          </div>
          <div className="flex space-x-4 items-center">
            <Slider
              id="length-slider"
              value={[length]}
              min={unitSystem === 'imperial' ? 1 : 0.3}
              max={unitSystem === 'imperial' ? 1000 : 300}
              step={unitSystem === 'imperial' ? 1 : 0.1}
              onValueChange={(vals) => setLength(vals[0])}
              className="flex-grow"
            />
            <div className="w-24">
              <Input
                id="length"
                type="number"
                value={length}
                onChange={(e) => setLength(Number(e.target.value))}
                min={unitSystem === 'imperial' ? 1 : 0.3}
                className="h-8"
              />
            </div>
          </div>
        </div>
        
        <div>
          <div className="flex justify-between items-center mb-1">
            <Label htmlFor="width">
              Width {unitSystem === 'imperial' ? '(feet)' : '(meters)'}
            </Label>
            <span className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">{width}</span>
          </div>
          <div className="flex space-x-4 items-center">
            <Slider
              id="width-slider"
              value={[width]}
              min={unitSystem === 'imperial' ? 1 : 0.3}
              max={unitSystem === 'imperial' ? 200 : 60}
              step={unitSystem === 'imperial' ? 1 : 0.1}
              onValueChange={(vals) => setWidth(vals[0])}
              className="flex-grow"
            />
            <div className="w-24">
              <Input
                id="width"
                type="number"
                value={width}
                onChange={(e) => setWidth(Number(e.target.value))}
                min={unitSystem === 'imperial' ? 1 : 0.3}
                className="h-8"
              />
            </div>
          </div>
        </div>
        
        <div>
          <div className="flex justify-between items-center mb-1">
            <Label htmlFor="thickness">
              Thickness {unitSystem === 'imperial' ? '(inches)' : '(cm)'}
            </Label>
            <span className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">{thickness}</span>
          </div>
          <div className="flex space-x-4 items-center">
            <Slider
              id="thickness-slider"
              value={[thickness]}
              min={unitSystem === 'imperial' ? 0.5 : 1.25}
              max={unitSystem === 'imperial' ? 8 : 20}
              step={unitSystem === 'imperial' ? 0.25 : 0.5}
              onValueChange={(vals) => setThickness(vals[0])}
              className="flex-grow"
            />
            <div className="w-24">
              <Input
                id="thickness"
                type="number"
                value={thickness}
                onChange={(e) => setThickness(Number(e.target.value))}
                min={unitSystem === 'imperial' ? 0.5 : 1.25}
                step={unitSystem === 'imperial' ? 0.25 : 0.5}
                className="h-8"
              />
            </div>
          </div>
        </div>
        
        <h4 className="text-md font-semibold text-asphalt pt-2">Material Properties</h4>
        
        <div>
          <div className="flex justify-between items-center mb-1">
            <Label htmlFor="density">
              Asphalt Density (lbs/cubic foot)
            </Label>
            <span className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">{density}</span>
          </div>
          <div className="flex space-x-4 items-center">
            <Slider
              id="density-slider"
              value={[density]}
              min={100}
              max={170}
              step={1}
              onValueChange={(vals) => setDensity(vals[0])}
              className="flex-grow"
            />
            <div className="w-24">
              <Input
                id="density"
                type="number"
                value={density}
                onChange={(e) => setDensity(Number(e.target.value))}
                min={100}
                max={170}
                className="h-8"
              />
            </div>
          </div>
        </div>
        
        <div>
          <div className="flex justify-between items-center mb-1">
            <Label htmlFor="costPerTon">
              Cost per Ton ($)
            </Label>
            <span className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">{costPerTon}</span>
          </div>
          <div className="flex space-x-4 items-center">
            <Slider
              id="costPerTon-slider"
              value={[costPerTon]}
              min={50}
              max={300}
              step={5}
              onValueChange={(vals) => setCostPerTon(vals[0])}
              className="flex-grow"
            />
            <div className="w-24">
              <Input
                id="costPerTon"
                type="number"
                value={costPerTon}
                onChange={(e) => setCostPerTon(Number(e.target.value))}
                min={50}
                className="h-8"
              />
            </div>
          </div>
        </div>
      </div>

      {calculationResult && (
        <Card className="mt-6 bg-gray-50 border border-gray-100">
          <CardContent className="pt-6">
            <h3 className="text-lg font-semibold text-asphalt mb-4">Calculation Results</h3>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-concrete-dark">Volume:</span>
                <span className="text-xl font-bold text-safety-dark">{calculationResult.volume}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-concrete-dark">Weight:</span>
                <span className="text-xl font-bold text-safety-dark">{calculationResult.tons} tons</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-concrete-dark">Estimated Cost:</span>
                <span className="text-xl font-bold text-safety-dark">${calculationResult.cost}</span>
              </div>
              
              <div className="flex justify-between items-center pt-1">
                <span className="text-concrete-dark">Suggested Mix Type:</span>
                <span className="text-safety font-medium">{calculationResult.mixType}</span>
              </div>
            </div>
          </CardContent>
          
          <CardFooter className="pt-2 pb-4 flex justify-center space-x-3">
            <Button variant="outline" size="sm" onClick={handlePrint}>
              <PrinterIcon className="mr-1 h-4 w-4" /> Print
            </Button>
            <Button variant="outline" size="sm" onClick={handleShare}>
              <Share2Icon className="mr-1 h-4 w-4" /> Share
            </Button>
            <Button variant="outline" size="sm" onClick={handleResetCalculator}>
              <RefreshCcw className="mr-1 h-4 w-4" /> Reset
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default HomeCalculator;
