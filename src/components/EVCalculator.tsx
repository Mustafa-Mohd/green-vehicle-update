import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Zap, Fuel, TrendingUp, IndianRupee, Info, Calculator, Bike, Car } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export const EVCalculator = () => {
    // State for calculator inputs
    const [dailyDistance, setDailyDistance] = useState([30]);
    const [fuelPrice, setFuelPrice] = useState([102]); // INR per liter (avg)
    const [mileageICE, setMileageICE] = useState([40]); // km per liter
    const [electricityRate, setElectricityRate] = useState([8]); // INR per kWh
    const [evEfficiency, setEvEfficiency] = useState([40]); // km per kWh (default to scooter)

    // Derived Costs
    const [costs, setCosts] = useState({
        petrolCostPerKm: 0,
        evCostPerKm: 0,
        dailyPetrolCost: 0,
        dailyEVCost: 0
    });

    const [savings, setSavings] = useState({
        monthly: 0,
        yearly: 0,
        fiveYear: 0
    });

    // Preset Handlers
    const setPreset = (type: 'scooter' | 'car') => {
        if (type === 'scooter') {
            setMileageICE([45]);
            setEvEfficiency([40]); // User spec: 35-45
        } else {
            setMileageICE([15]);
            setEvEfficiency([7]); // User spec: 5-7
        }
    };

    useEffect(() => {
        calculateSavings();
    }, [dailyDistance, fuelPrice, electricityRate, mileageICE, evEfficiency]);

    const calculateSavings = () => {
        const distance = dailyDistance[0];
        const fuel = fuelPrice[0];
        const electricity = electricityRate[0];
        const iceEff = mileageICE[0]; // km/L
        const evEff = evEfficiency[0]; // km/kWh

        // Avoid division by zero
        if (iceEff === 0 || evEff === 0) return;

        // 1. Petrol cost per km
        const petrolCostPerKm = fuel / iceEff;

        // 2. EV cost per km
        const evCostPerKm = electricity / evEff;

        // 3. Daily costs
        const dailyPetrolCost = distance * petrolCostPerKm;
        const dailyEVCost = distance * evCostPerKm;

        setCosts({
            petrolCostPerKm,
            evCostPerKm,
            dailyPetrolCost,
            dailyEVCost
        });

        // 4. Savings
        const dailySavings = dailyPetrolCost - dailyEVCost;

        // Logic check: Negative savings
        if (dailySavings < 0) {
            setSavings({ monthly: 0, yearly: 0, fiveYear: 0 });
            return;
        }

        const monthlySavings = dailySavings * 30; // Assumption: 30 days
        const yearlySavings = monthlySavings * 12;
        const fiveYearSavings = yearlySavings * 5;

        setSavings({
            monthly: Math.round(monthlySavings),
            yearly: Math.round(yearlySavings),
            fiveYear: Math.round(fiveYearSavings)
        });
    };

    return (
        <div className="w-full max-w-5xl mx-auto p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
            >
                <Card className="border-teal/20 shadow-xl bg-white overflow-hidden">
                    <div className="h-2 bg-gradient-to-r from-teal to-emerald-500"></div>
                    <CardHeader className="text-center pb-2">
                        <CardTitle className="text-3xl font-bold flex items-center justify-center gap-2">
                            <Calculator className="text-teal w-8 h-8" />
                            <span className="text-gray-800">EV Savings Calculator</span>
                        </CardTitle>
                        <CardDescription className="text-lg text-gray-500">
                            Transparent comparison based on your real-world usage
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="p-4 md:p-8">
                        {/* Vehicle Type Presets */}
                        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
                            <Button
                                variant={evEfficiency[0] > 20 ? "default" : "outline"}
                                onClick={() => setPreset('scooter')}
                                className={`w-full sm:w-auto ${evEfficiency[0] > 20 ? "bg-teal hover:bg-teal/90" : "border-teal text-teal hover:bg-teal/5"}`}
                            >
                                <Bike className="w-5 h-5 mr-2" /> Electric Scooter
                            </Button>
                            <Button
                                variant={evEfficiency[0] <= 20 ? "default" : "outline"}
                                onClick={() => setPreset('car')}
                                className={`w-full sm:w-auto ${evEfficiency[0] <= 20 ? "bg-teal hover:bg-teal/90" : "border-teal text-teal hover:bg-teal/5"}`}
                            >
                                <Car className="w-5 h-5 mr-2" /> Electric Car
                            </Button>
                        </div>

                        <div className="grid lg:grid-cols-2 gap-6 md:gap-10">
                            {/* Inputs Section */}
                            <div className="space-y-8">
                                <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 space-y-6">
                                    {/* Daily Distance */}
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-baseline">
                                            <Label className="text-base font-semibold text-gray-700">Daily Commute Distance</Label>
                                            <span className="text-xl font-bold text-teal bg-white px-3 py-1 rounded shadow-sm border border-gray-100">
                                                {dailyDistance} <span className="text-sm font-normal text-gray-500">km</span>
                                            </span>
                                        </div>
                                        <Slider
                                            value={dailyDistance}
                                            onValueChange={setDailyDistance}
                                            max={150}
                                            step={1}
                                            className="py-2 cursor-pointer"
                                        />
                                    </div>

                                    {/* Petrol Price */}
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-baseline">
                                            <Label className="text-base font-semibold text-gray-700">Petrol Price</Label>
                                            <span className="text-xl font-bold text-gray-700 bg-white px-3 py-1 rounded shadow-sm border border-gray-100">
                                                ₹{fuelPrice} <span className="text-sm font-normal text-gray-500">/ L</span>
                                            </span>
                                        </div>
                                        <Slider
                                            value={fuelPrice}
                                            onValueChange={setFuelPrice}
                                            min={90}
                                            max={120}
                                            step={1}
                                            className="py-2"
                                        />
                                    </div>

                                    {/* ICE Mileage */}
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-baseline">
                                            <Label className="text-base font-semibold text-gray-700">Current Vehicle Mileage</Label>
                                            <span className="text-xl font-bold text-gray-700 bg-white px-3 py-1 rounded shadow-sm border border-gray-100">
                                                {mileageICE} <span className="text-sm font-normal text-gray-500">km/L</span>
                                            </span>
                                        </div>
                                        <Slider
                                            value={mileageICE}
                                            onValueChange={setMileageICE}
                                            min={5}
                                            max={80}
                                            step={1}
                                            className="py-2"
                                        />
                                    </div>

                                    <div className="h-px bg-gray-200 my-4"></div>

                                    {/* EV Efficiency INPUT */}
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-baseline">
                                            <div className="flex items-center gap-2">
                                                <Label className="text-base font-semibold text-teal-800">EV Efficiency</Label>
                                                <TooltipProvider>
                                                    <Tooltip>
                                                        <TooltipTrigger><Info className="w-4 h-4 text-gray-400" /></TooltipTrigger>
                                                        <TooltipContent>
                                                            <p>How far the EV travels on 1 unit (kWh) of electricity.</p>
                                                            <p>Scooters: ~35-45 km/kWh | Cars: ~5-7 km/kWh</p>
                                                        </TooltipContent>
                                                    </Tooltip>
                                                </TooltipProvider>
                                            </div>
                                            <span className="text-xl font-bold text-teal-800 bg-white px-3 py-1 rounded shadow-sm border border-gray-100">
                                                {evEfficiency} <span className="text-sm font-normal text-gray-500">km/kWh</span>
                                            </span>
                                        </div>
                                        <Slider
                                            value={evEfficiency}
                                            onValueChange={setEvEfficiency}
                                            min={3}
                                            max={60}
                                            step={1}
                                            className="py-2"
                                        />
                                    </div>

                                    {/* Electricity Rate */}
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-baseline">
                                            <Label className="text-base font-semibold text-gray-700">Electricity Rate</Label>
                                            <span className="text-xl font-bold text-gray-700 bg-white px-3 py-1 rounded shadow-sm border border-gray-100">
                                                ₹{electricityRate} <span className="text-sm font-normal text-gray-500">/ kWh</span>
                                            </span>
                                        </div>
                                        <Slider
                                            value={electricityRate}
                                            onValueChange={setElectricityRate}
                                            min={5}
                                            max={15}
                                            step={0.5}
                                            className="py-2"
                                        />
                                    </div>
                                </div>

                                {/* Assumptions */}
                                <div className="text-xs text-gray-500 bg-gray-100 p-4 rounded-lg flex gap-4">
                                    <div>
                                        <strong>Assumptions:</strong>
                                        <ul className="list-disc list-inside mt-1 space-y-1">
                                            <li>30 days of commuting per month.</li>
                                            <li>Comparison based on fuel costs only.</li>
                                            <li>Maintenance savings (typically higher for EVs) are excluded.</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {/* Results Section */}
                            <div className="space-y-6">
                                {/* Cost Comparison Cards */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-red-50 p-4 rounded-xl border border-red-100">
                                        <span className="text-red-600 text-sm font-semibold flex items-center gap-1 mb-2">
                                            <Fuel className="w-4 h-4" /> Petrol Cost
                                        </span>
                                        <p className="text-2xl font-bold text-gray-800">
                                            ₹{costs.petrolCostPerKm.toFixed(2)} <span className="text-sm font-normal text-gray-500">/km</span>
                                        </p>
                                        <p className="text-xs text-muted-foreground mt-1">₹{Math.round(costs.dailyPetrolCost)} per day</p>
                                    </div>
                                    <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100">
                                        <span className="text-emerald-600 text-sm font-semibold flex items-center gap-1 mb-2">
                                            <Zap className="w-4 h-4" /> EV Cost
                                        </span>
                                        <p className="text-2xl font-bold text-gray-800">
                                            ₹{costs.evCostPerKm.toFixed(2)} <span className="text-sm font-normal text-gray-500">/km</span>
                                        </p>
                                        <p className="text-xs text-muted-foreground mt-1">₹{Math.round(costs.dailyEVCost)} per day</p>
                                    </div>
                                </div>

                                {/* Main Savings Card */}
                                <div className="bg-gradient-to-br from-teal to-emerald-700 rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -mr-16 -mt-16 blur-3xl"></div>
                                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-black/10 rounded-full -ml-10 -mb-10 blur-2xl"></div>

                                    <h3 className="text-lg md:text-xl font-semibold mb-6 md:mb-8 flex items-center gap-2 relative z-10 opacity-90">
                                        <TrendingUp className="w-5 h-5 md:w-6 md:h-6" /> Total Projected Savings
                                    </h3>

                                    {savings.yearly > 0 ? (
                                        <div className="space-y-8 relative z-10">
                                            <div className="flex justify-between items-end border-b border-white/20 pb-4">
                                                <span className="text-base md:text-lg opacity-90">Monthly Savings</span>
                                                <span className="text-2xl md:text-3xl font-bold">₹{savings.monthly.toLocaleString()}</span>
                                            </div>

                                            <div className="flex justify-between items-end border-b border-white/20 pb-4">
                                                <span className="text-lg opacity-90">Yearly Savings</span>
                                                <span className="text-4xl font-bold">₹{savings.yearly.toLocaleString()}</span>
                                            </div>

                                            <div className="pt-2">
                                                <span className="text-sm uppercase tracking-wider opacity-80 block mb-2">5-Year Savings</span>
                                                <motion.span
                                                    key={savings.fiveYear}
                                                    initial={{ scale: 0.9 }}
                                                    animate={{ scale: 1 }}
                                                    className="text-4xl md:text-6xl font-extrabold flex items-center gap-1 text-yellow-300"
                                                >
                                                    <IndianRupee className="w-8 h-8 md:w-14 md:h-14" />
                                                    {savings.fiveYear.toLocaleString()}
                                                </motion.span>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="text-center py-10">
                                            <p className="text-xl font-semibold text-white/90">EV not cost-effective</p>
                                            <p className="text-sm text-white/70 mt-2">Based on these inputs, petrol is cheaper per km.</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
};
