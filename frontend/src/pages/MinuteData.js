import React, { useState } from 'react';
import { Dropdown } from 'semantic-ui-react'; // Assuming you're using Semantic UI

const MinuteData = () => {
    const [expiry, setExpiry] = useState(null);
    const [strikes, setStrikes] = useState([]);
    const [spotPrice, setSpotPrice] = useState(false);
    const [futPrice, setFutPrice] = useState(false);
    const [normalized, setNormalized] = useState(false);
    const [charts, setCharts] = useState([]);

    const expiryOptions = [/* Options go here */];
    const strikesOptions = [/* Options go here */];
    const chartsOptions = [/* Options go here */];

    const handleDropdownChange = (setter) => (event, data) => {
        setter(data.value);
    };

    return (
        <div className="container animate__animated animate__fadeIn">
            <h2>Minute Data</h2>
            <Dropdown
                placeholder='Select Expiry'
                fluid
                selection
                options={expiryOptions}
                onChange={handleDropdownChange(setExpiry)}
                className="dropdown"
            />
            <Dropdown
                placeholder='Select Strikes'
                fluid
                multiple
                selection
                options={strikesOptions}
                onChange={handleDropdownChange(setStrikes)}
                className="dropdown"
            />
            <div>
                <label>
                    <input type="checkbox" checked={spotPrice} onChange={() => setSpotPrice(!spotPrice)} />
                    Spot Price
                </label>
                <label>
                    <input type="checkbox" checked={futPrice} onChange={() => setFutPrice(!futPrice)} />
                    Fut Price
                </label>
                <label>
                    <input type="checkbox" checked={normalized} onChange={() => setNormalized(!normalized)} />
                    Normalized
                </label>
            </div>
            <Dropdown
                placeholder='Select Charts'
                fluid
                multiple
                selection
                options={chartsOptions}
                onChange={handleDropdownChange(setCharts)}
                className="dropdown"
            />
            {/* Chart component visualization would go here */}
        </div>
    );
};

export default MinuteData;
