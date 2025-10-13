import React, { useEffect, useState } from "react";


// Unit definitions (Force, Pressure, Length, etc.)
const UNITS = {
  Force: {
    base: "N",
    units: {
      "µN (micronewton)": 1e-6,
      "mN (millinewton)": 1e-3,
      "N (newton)": 1,
      "kN (kilonewton)": 1e3,
      "MN (meganewton)": 1e6,
      "kg (mass due to gravity)": 9.80665,
    },
  },
  Pressure: {
    base: "Pa",
    units: {
      "Pa (pascal)": 1,
      "mbar (millibar)": 100,
      "bar": 100000,
      "kPa": 1000,
      "MPa": 1e6,
      "atm (standard)": 101325,
      "psi": 6894.757,
      "torr": 133.322,
    },
  },
  Length: {
    base: "m",
    units: {
      "Å (angstrom)": 1e-10,
      "nm (nanometre)": 1e-9,
      "µm (micrometre)": 1e-6,
      "mm (millimetre)": 1e-3,
      "cm (centimetre)": 1e-2,
      "m (metre)": 1,
      "km (kilometre)": 1e3,
      "in (inch)": 0.0254,
      "ft (foot)": 0.3048,
      "yd (yard)": 0.9144,
      "mi (mile)": 1609.34,
      "NM (nautical mile)": 1852,
    },
  },
  Mass: {
    base: "kg",
    units: {
      "µg (microgram)": 1e-9,
      "mg (milligram)": 1e-6,
      "g (gram)": 1e-3,
      "kg (kilogram)": 1,
      "t (tonne)": 1000,
      "lb (pound)": 0.453592,
      "oz (ounce)": 0.0283495,
      "st (stone)": 6.35029,
    },
  },
  Time: {
    base: "s",
    units: {
      "ns (nanosecond)": 1e-9,
      "µs (microsecond)": 1e-6,
      "ms (millisecond)": 1e-3,
      "s (second)": 1,
      "min (minute)": 60,
      "h (hour)": 3600,
      "day": 86400,
      "week": 604800,
      "year": 31557600,
    },
  },
  Temperature: {
    base: "K",
    units: {
      "°C (Celsius)": "C",
      "°F (Fahrenheit)": "F",
      "K (Kelvin)": "K",
    },
  },
  Energy: {
    base: "J",
    units: {
      "J": 1,                        // Joule
      "kJ": 1e3,                     // Kilojoule
      "MJ": 1e6,                     // Megajoule
      "GJ": 1e9,                     // Gigajoule
      "cal": 4.184,                  // Calorie (small calorie)
      "kcal": 4184,                  // Kilocalorie (food calorie)
      "Wh": 3600,                    // Watt-hour
      "kWh": 3.6e6,                  // Kilowatt-hour
      "BTU": 1055.05585,             // British thermal unit
      "eV": 1.602176634e-19,         // Electronvolt
      "keV": 1.602176634e-16,        // Kiloelectronvolt
      "MeV": 1.602176634e-13,        // Megaelectronvolt
      "GeV": 1.602176634e-10,        // Gigaelectronvolt
      "amu": 1.492418e-10,           // Atomic mass unit (u)
      "erg": 1e-7,                   // Erg (CGS)
      "ft·lb": 1.3558179483314004,   // Foot-pound force
    }
  },
  Power: {
    base: "W",
    units: {
      "W (watt)": 1,
      "kW (kilowatt)": 1e3,
      "MW (megawatt)": 1e6,
      "hp (horsepower)": 745.7,
      "BTU/hr": 0.29307107,
    },
  },
  Electricity: {
    base: "V",
    units: {
      "V (volt)": 1,
      "mV (millivolt)": 1e-3,
      "kV (kilovolt)": 1e3,
      "A (ampere)": 1, // Current
      "mA (milliampere)": 1e-3,
      "Ω (ohm)": 1, // Resistance
      "kΩ (kilo-ohm)": 1e3,
      "MΩ (mega-ohm)": 1e6,
      "C (coulomb)": 1, // Charge
      "mAh (milliamp-hour)": 3.6, // 1 mAh = 3.6 C
    },
  },
  Area: {
    base: "m²",
    units: {
      "mm²": 1e-6,
      "cm²": 1e-4,
      "m²": 1,
      "km²": 1e6,
      "ft²": 0.092903,
      "in²": 0.00064516,
      "acre": 4046.86,
      "hectare": 10000,
    },
  },
  Volume: {
    base: "m³",
    units: {
      "mm³": 1e-9,
      "cm³": 1e-6,
      "m³": 1,
      "L (litre)": 1e-3,
      "mL (millilitre)": 1e-6,
      "gal (US gallon)": 0.00378541,
      "gal (UK gallon)": 0.00454609,
      "cup (US)": 0.000236588,
      "pint (US)": 0.000473176,
    },
  },
  Speed: {
    base: "m/s",
    units: {
      "m/s": 1,
      "km/h": 0.277778,
      "mph": 0.44704,
      "knots": 0.514444,
      "ft/s": 0.3048,
    },
  },
  Density: {
    base: "kg/m³",
    units: {
      "kg/m³": 1,
      "g/cm³": 1000,
      "lb/ft³": 16.0185,
    },
  },
  Angle: {
    base: "rad",
    units: {
      "rad (radian)": 1,
      "° (degree)": Math.PI / 180,
      "gon (gradian)": Math.PI / 200,
    },
  },
  Frequency: {
    base: "Hz",
    units: {
      "Hz (hertz)": 1,
      "kHz (kilohertz)": 1e3,
      "MHz (megahertz)": 1e6,
      "GHz (gigahertz)": 1e9,
    },
  },
  AngularFrequency: {
    base: "rad/s",
    units: {
      "rad/s (radians per second)": 1,
      "Hz (hertz)": 2 * Math.PI,
      "kHz (kilohertz)": 2 * Math.PI * 1e3,
      "MHz (megahertz)": 2 * Math.PI * 1e6,
      "rpm (revolutions per minute)": 2 * Math.PI / 60,
    },
  },
  MolarMass: {
    base: "g/mol",
    units: {
      "g/mol": 1,           // Gram per mole
      "kg/mol": 1000,       // Kilogram per mole
      "mg/mol": 1e-3,       // Milligram per mole
      "g/mmol": 1e3,        // Gram per millimole
      "kg/kmol": 1           // Kilogram per kilomole (same scale as g/mol)
    }
  },
  VolumetricFlowRate: {
    base: "m³/s",
    units: {
      "m³/s (cubic metre per second)": 1,
      "L/s (litre per second)": 1e-3,
      "L/min (litre per minute)": 1e-3 / 60,
      "L/h (litre per hour)": 1e-3 / 3600,
      "gal/min (US gallons per minute)": 0.00378541 / 60,
      "gal/h (US gallons per hour)": 0.00378541 / 3600,
      "ft³/s (cubic foot per second)": 0.0283168,
      "ft³/min (cubic foot per minute)": 0.0283168 / 60,
    },
  },        
  MassFlowRate: {
    base: "kg/s",
    units: {
      "kg/s (kilogram per second)": 1,
      "kg/min (kilogram per minute)": 1 / 60,
      "kg/h (kilogram per hour)": 1 / 3600,
      "g/s (gram per second)": 1e-3,
      "g/min (gram per minute)": 1e-3 / 60,
      "lb/s (pound per second)": 0.453592,
      "lb/min (pound per minute)": 0.453592 / 60,
    },
  },
  DataSize: {
    base: "B", // Byte as base
    units: {
      "bit": 1 / 8,          // 1 bit = 1/8 byte
      "Byte": 1,             // Byte
      "KB": 1024,            // Kilobyte (binary)
      "MB": 1024 ** 2,       // Megabyte
      "GB": 1024 ** 3,       // Gigabyte
      "TB": 1024 ** 4,       // Terabyte
      "PB": 1024 ** 5,       // Petabyte
      "EB": 1024 ** 6,       // Exabyte
      "kB": 1000,            // Kilobyte (decimal)
      "MB (decimal)": 1e6,
      "GB (decimal)": 1e9,
      "TB (decimal)": 1e12
    }
  },
};

// Temperature conversion helpers
function tempToKelvin(value, fromCode) {
  const v = Number(value);
  if (Number.isNaN(v)) return NaN;
  switch (fromCode) {
    case "C": return v + 273.15;
    case "F": return (v - 32) * (5/9) + 273.15;
    case "K": return v;
    default: return NaN;
  }
}

function kelvinToTarget(kelvin, toCode) {
  if (!isFinite(kelvin)) return NaN;
  switch (toCode) {
    case "C": return kelvin - 273.15;
    case "F": return (kelvin - 273.15) * 9/5 + 32;
    case "K": return kelvin;
    default: return NaN;
  }
}

// App component
export default function App() {
  const categories = Object.keys(UNITS);
  const [category, setCategory] = useState(categories[0]);
  const [fromUnit, setFromUnit] = useState(Object.keys(UNITS[categories[0]].units)[0]);
  const [toUnit, setToUnit] = useState(Object.keys(UNITS[categories[0]].units)[1]);
  const [inputValue, setInputValue] = useState("1");
  const [result, setResult] = useState("");

  useEffect(() => {
    const keys = Object.keys(UNITS[category].units);
    setFromUnit(keys[0]);
    setToUnit(keys[1] || keys[0]);
  }, [category]);

  useEffect(() => {
    convert();
  }, [inputValue, fromUnit, toUnit, category]);

  function convert() {
    if (!inputValue) { setResult(""); return; }
    if (category === "Temperature") {
      const kelvin = tempToKelvin(inputValue, UNITS.Temperature.units[fromUnit]);
      setResult(kelvinToTarget(kelvin, UNITS.Temperature.units[toUnit]).toFixed(6));
      return;
    }
    const fromFactor = UNITS[category].units[fromUnit];
    const toFactor = UNITS[category].units[toUnit];
    const val = Number(inputValue);
    if (isNaN(val)) { setResult("—"); return; }
    setResult((val * fromFactor / toFactor).toPrecision(9));
  }

  function swapUnits() {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg p-6">
        <h1 className="text-2xl font-semibold mb-4">Unit Converter</h1>
        <p className="text-slate-500 mb-4">Category</p>

        {/* Category buttons */}
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                cat === category ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Conversion inputs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Value</label>
            <input
              inputMode="decimal"
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">From</label>
            <select
              value={fromUnit}
              onChange={e => setFromUnit(e.target.value)}
              className="w-full rounded-lg border border-slate-200 px-3 py-2"
            >
              {Object.keys(UNITS[category].units).map(u => <option key={u}>{u}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">To</label>
            <div className="flex gap-2">
              <select
                value={toUnit}
                onChange={e => setToUnit(e.target.value)}
                className="flex-1 rounded-lg border border-slate-200 px-3 py-2"
              >
                {Object.keys(UNITS[category].units).map(u => <option key={u}>{u}</option>)}
              </select>
              <button onClick={swapUnits} className="rounded-lg border border-slate-200 px-3 py-2 bg-white hover:bg-slate-50">⇄</button>
            </div>
          </div>
        </div>

        {/* Result */}
        <div className="mt-6 bg-slate-50 p-4 rounded-lg flex items-center justify-between">
          <div>
            <div className="text-sm text-slate-500">Result</div>
            <div className="text-2xl font-medium">  {result ? `${result} ${toUnit}` : '—'}
            </div>{result && (  
              <div className="text-xs text-slate-500 mt-1">    Standard form: {(Number(result)).toExponential(3)} {toUnit}  
            </div>)}
          </div>
        </div>

        {/* Footer section */}
    <div className="mt-10 border-t border-slate-300 pt-4 text-center text-slate-600 text-sm">
      <p>[Pre-release] Version 1.5.1</p>
      <p>Author - T. Brew (txb980@student.bham.ac.uk)</p>
      <p className="text-xs mt-1 text-slate-400">Last updated: October 13, 2025</p>

      <div className="mt-2 text-left mx-auto max-w-md text-slate-500">
        <p className="font-semibold text-slate-700 mb-1">Recent updates:</p>
        <ul className="list-disc list-inside text-xs space-y-1">
          <li>Added add to home screen functionality</li>
          <li>Added offline mode</li>
          <li>Added lots of new categories</li>
          <li>Added standard form notation</li>
          <li>Added version history sub</li>
          <li>Added smaller length units (angstroms, nanometers, micrometers)</li>
          <li>Improved auto-conversion logic</li>
          <li>UI tweaks for better mobile support</li>
        </ul>
      </div>
      <p className="mt-4 text-sm">
        <a 
          href="https://github.com/TayBrew/phd-unit-conversion" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-500 underline"
        >
          https://github.com/TayBrew/phd-unit-conversion
        </a>
      </p>

    </div>

    </div>

  </div>
  );

}
