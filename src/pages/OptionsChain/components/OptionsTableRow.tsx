import React from 'react';
import { useOptionsChainStore } from '../../../store/optionsChainStore';
import type { OptionsChainData } from '../../../types/optionsChain';

interface OptionsTableRowProps {
  data: OptionsChainData;
}

export const OptionsTableRow: React.FC<OptionsTableRowProps> = ({ data }) => {
  const { selectedStrikes, toggleStrike } = useOptionsChainStore();

  const isCallSelected = selectedStrikes.includes(`${data.strike}-C`);
  const isPutSelected = selectedStrikes.includes(`${data.strike}-P`);

  const callValues = [
    data.call.score,
    data.call.deltaVolume,
    data.call.value,
    data.call.coi,
    data.call.oi,
    data.call.volume,
    data.call.iv,
    data.call.ltp
  ];

  const putValues = [
    data.put.ltp,
    data.put.iv,
    data.put.volume,
    data.put.oi,
    data.put.coi,
    data.put.value,
    data.put.deltaVolume,
    data.put.score
  ];

  return (
    <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
      {/* Call values */}
      {callValues.map((value, index) => (
        <td key={`call-${index}`} className="px-3 py-2 text-sm text-right">
          {typeof value === 'number' && value % 1 !== 0 ? value.toFixed(2) : value}
        </td>
      ))}
      
      {/* Call checkbox */}
      <td className="px-3 py-2 text-center">
        <input
          type="checkbox"
          checked={isCallSelected}
          onChange={() => toggleStrike(`${data.strike}-C`)}
          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        />
      </td>
      
      {/* Strike */}
      <td className="px-3 py-2 text-center font-medium bg-gray-50 dark:bg-gray-900">
        {data.strike}
      </td>
      
      {/* Put checkbox */}
      <td className="px-3 py-2 text-center">
        <input
          type="checkbox"
          checked={isPutSelected}
          onChange={() => toggleStrike(`${data.strike}-P`)}
          className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
        />
      </td>
      
      {/* Put values */}
      {putValues.map((value, index) => (
        <td key={`put-${index}`} className="px-3 py-2 text-sm text-right">
          {typeof value === 'number' && value % 1 !== 0 ? value.toFixed(2) : value}
        </td>
      ))}
    </tr>
  );
};