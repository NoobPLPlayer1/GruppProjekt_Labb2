import React from 'react';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto'

function TimeChart(props) {
    var labels = [];
    var hours = [];
    var worked_hours = [];
    props.props.results.forEach((project) => {
        labels.push(project.properties.Projectname.title[0].plain_text);
        hours.push(project.properties.Hours.number);
        worked_hours.push(project.properties["Worked hours"].rollup.number);
    })
    const colors = worked_hours.map((value, index) => value < hours[index] * 0.8 ? 'rgba(0,200,0)' : 'rgba(255,0,0)');
 


    const data = {

        labels: labels,
        datasets: [{
            label: '# of Hours',
            data: hours,
            backgroundColor: [
                'rgba(0,160,255)',
            ],
            borderWidth: 1
        },
            {
                label: '# of Worked Hours',
                data: worked_hours,
                backgroundColor: colors,
                borderWidth: 1

            }]
    }

    
    return (
        <div>
            <Bar
                data={data}
                height={400}
                width={600}
                options={{
                    maintainAspectRatio: false,
                    legend: {
                        labels: {
                            fontSize: 25,
                        },
                    },
                }}
            />
        </div>
    )
    
}


export default TimeChart;