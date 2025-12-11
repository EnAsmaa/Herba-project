import React from 'react'
import { PieChart, Pie, Label, ResponsiveContainer } from 'recharts';
const data = [
    { name: 'Group C', value: 6, fill: '#335D39cc' },
    { name: 'Group C', value: 4, fill: '#6BB68333' },
];

const MyPie = () => (
    <Pie
        data={data}
        dataKey="value"
        nameKey="name"
        outerRadius="80%"
        innerRadius="60%"
        isAnimationActive={true}
        strokeWidth={0}
    />
);


export default function ProgressStates() {
    const total = data.reduce((sum, item) => sum + item.value, 0);
    const percentage = ((data[0].value / total) * 100).toFixed(0);
    return <>
        <div
            style={{
                display: 'flex',
                flexWrap: 'wrap',
                width: '100%',
                maxWidth: '350px',
                minHeight: '300px',
                padding: '10px',
                justifyContent: 'space-around',
                alignItems: 'stretch',
            }}
        >
            <div style={{ width: '33%', flex: '1 1 200px', aspectRatio: 1, height: 'calc(100% - 20px)' }}>
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <MyPie />
                        <Label position="center" fill="#222" fontWeight={600}>
                            {`progress ${percentage}%`}
                        </Label>
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    </>
}
