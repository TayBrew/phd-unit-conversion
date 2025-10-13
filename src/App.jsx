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
    },
  },
  Time: {
    base: "s",
    units: {
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
        <p className="text-slate-500 mb-4">by Taylor Brew</p>

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
            <div className="text-2xl font-medium">{result ? `${result} ${toUnit}` : '—'}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
