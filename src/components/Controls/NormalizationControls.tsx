import React from 'react';
import { useOptionsStore } from '../../store/optionsStore';

export const NormalizationControls: React.FC = () => {
  const { normalized, normalizationOptions, toggleNormalization, setNormalizationOptions } = useOptionsStore();

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={normalized}
            onChange={toggleNormalization}
            className="rounded"
          />
          Normalize Data
        </label>
      </div>
      
      {normalized && (
        <div className="flex items-center gap-4 ml-6">
          <select
            value={normalizationOptions.method}
            onChange={(e) => setNormalizationOptions({
              ...normalizationOptions,
              method: e.target.value as 'minmax' | 'zscore'
            })}
            className="px-2 py-1 rounded border"
          >
            <option value="minmax">Min-Max (0-1)</option>
            <option value="zscore">Z-Score</option>
          </select>
          
          {normalizationOptions.method === 'minmax' && (
            <div className="flex items-center gap-2">
              <label className="text-sm">Custom Range:</label>
              <input
                type="number"
                value={normalizationOptions.customRange?.min ?? 0}
                onChange={(e) => setNormalizationOptions({
                  ...normalizationOptions,
                  customRange: {
                    min: Number(e.target.value),
                    max: normalizationOptions.customRange?.max ?? 1
                  }
                })}
                className="w-20 px-2 py-1 rounded border"
                placeholder="Min"
              />
              <span>-</span>
              <input
                type="number"
                value={normalizationOptions.customRange?.max ?? 1}
                onChange={(e) => setNormalizationOptions({
                  ...normalizationOptions,
                  customRange: {
                    min: normalizationOptions.customRange?.min ?? 0,
                    max: Number(e.target.value)
                  }
                })}
                className="w-20 px-2 py-1 rounded border"
                placeholder="Max"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}