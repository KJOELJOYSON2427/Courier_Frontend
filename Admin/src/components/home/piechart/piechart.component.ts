import { Component } from '@angular/core';
import { ChartData, ChartOptions , Chart, ArcElement, Tooltip, Legend, ChartConfiguration} from 'chart.js';
import { BaseChartDirective } from "ng2-charts";


// Register elements for Pie Chart
Chart.register(ArcElement, Tooltip, Legend);
@Component({
  selector: 'app-piechart',
  imports: [BaseChartDirective],
  templateUrl: './piechart.component.html',
  styleUrl: './piechart.component.css'
})
export class PiechartComponent {
   

  pieChartData :ChartData<'pie',number[], string | string[]> = {
    labels: ['Delivered', 'In Transit', 'Pending','Created'],
    datasets:[
       {
        data: [300, 150, 100, 50],
        backgroundColor: [
          'rgba(16, 185, 129, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(239, 68, 68, 0.8)'
        ],
      
        borderWidth:2,
        borderColor: [
          'rgb(16, 185, 129)',
          'rgb(59, 130, 246)',
          'rgb(245, 158, 11)',
          'rgb(239, 68, 68)'
        ],
      }
    ]
  };

  public pieChartOptions: ChartConfiguration<'pie'>['options'] ={
    responsive: true,
    maintainAspectRatio: false,
    plugins:{
      legend:{
        position:"bottom",
        labels:{
          padding: 20,
          font: {
            size: 13,
            weight: 600,
            family: "'Inter', sans-serif"
            
        },
          usePointStyle: true,
          pointStyle: 'circle',
          color: '#374151'

      },

    },
      tooltip: {
        enabled: true,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        cornerRadius: 8,
        titleFont: {
          size: 14,
          weight: 'bold'
        },
        bodyFont:{ 
            size: 13
        },

       callbacks:{
        label: function(context){
          const label = context.label || '';
          const value = context.parsed || 0;
           const total = context.dataset.data.reduce((a: number, b: number) =>a+b, 0);
           const percentage = ((value / total) * 100).toFixed(1);
           return `${label}: ${value} (${percentage}%)`
        }
       },

      
      
  },
      
    },
    animation: {
      animateRotate: true,
      animateScale: true,
      duration: 1000,
      easing: 'easeInOutQuart'
    }


}


}
