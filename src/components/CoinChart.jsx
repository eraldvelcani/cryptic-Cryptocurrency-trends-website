import { useState, useEffect } from 'react';
import { Line } from "react-chartjs-2";
import { 
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
    TimeScale
 } from 'chart.js';
import 'chartjs-adapter-date-fns';
import { callback } from 'chart.js/helpers';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
    TimeScale
);

const API = import.meta.env.VITE_API_COIN;

const CoinChart = ({coinID}) => {
    const [coinChartData, setCoinChartData] = useState(null);
    const [loader, setLoader] = useState(true);

    useEffect(() => {
        const fetchPrice = async () => {
            const response = await fetch(`${API}/${coinID}/market_chart?vs_currency=eur&days=7`);
            const data = await response.json();
            const prices = data.prices.map((price) => ({
                x: price[0],
                y: price[1]
            }));

            setCoinChartData({
                datasets: [
                    {
                        label: 'Price in EUR',
                        data: prices,
                        fill: true,
                        borderColor: '#007bff',
                        backgroundColor: 'rgba(0, 123, 255, 0.1)',
                        pointRadius: 0,
                        tension: 0.3
                    }
                ]
            });
            setLoader(false);
        };
        fetchPrice();
    }, [coinID]);


    // return <div style={{marginTop: '25px'}}>
    //         <Line data={coinChartData} options={{
    //         responsive: true,
    //         plugins: {
    //             legend: {display: false},
    //             tooltip: {mode: 'index', intersect: 'false'}
    //         },
    //         scales: {
    //             x: {
    //                 type: 'time',
    //                 time: {
    //                     unit: 'day'
    //                 },
    //                 ticks: {
    //                     autoSkip: true,
    //                     maxTicksLimit: 7,
    //                 }
    //             },
    //             y: {
    //                 ticks: {
    //                     callback: (value) => `€${value.toLocaleString()}` //runs this function for every tick
    //                 }
    //             }
    //         }
    //     }} 
    //     />
    //     </div>;
    return (
        <div style={{ marginTop: '25px' }}>
            {!loader && coinChartData ? (
            <Line
                data={coinChartData}
                options={{
                responsive: true,
                plugins: {
                    legend: { display: false },
                    tooltip: { mode: 'index', intersect: false }
                },
                scales: {
                    x: {
                    type: 'time',
                    time: { unit: 'day' },
                    ticks: { autoSkip: true, maxTicksLimit: 7 }
                    },
                    y: {
                    ticks: { callback: (value) => `€${value.toLocaleString()}` }
                    }
                }
                }}
            />
            ) : (
            <p>Loading chart...</p>
            )}
        </div>
    );
}
 
export default CoinChart;