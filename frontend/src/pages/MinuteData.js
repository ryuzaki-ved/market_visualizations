import React, { useState, useEffect } from 'react'; // Import useEffect here
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

    // Move useEffect inside the component
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('http://localhost:8000/strikes/');
            const data = await response.json();
            // Process the data to set expiryOptions, strikesOptions, and chartsOptions
        };

        fetchData();
    }, []);

    const fetchHistoricalData = async (expiry) => {
        const response = await fetch(`http://localhost:8000/historical_data/?expiry=${expiry}`);
        const data = await response.json();
        // Process the data for your charts
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
