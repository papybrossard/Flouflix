<template>
  <div id="gaugeDiv" ref="myGauge"></div>
  <div id="chartDiv" ref="myKpis"></div>
  <div id="radarDiv" ref="myRadar"></div>
</template>
<style scoped>

#chartDiv {
  max-width: 1000px; /* Longueur du graphique */
  height: 300px; /* Largeur du graphique */
}
#gaugeDiv {
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 1000px; /* Longueur des jauges */
  height: 300px; /* Largeur des jauges */
  }
#radarDiv {
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 1000px; /* Longueur des jauges */
  height: 500px; /* Largeur des jauges */
}
</style>
<script>
import * as JSC from 'jscharting';

export default {
  name: 'KPI',
  data() {
    return {
      kpis: null,
      gauge: null,
      radar: null,
      palette: ['#EF5350', '#26A69A', '#424242'],
      sortBy: 'Target',
      direction: true,
      data: [
        { name: 'Travel', target: 5.11, actual: 3.3 },
        { name: 'Government', target: 4.54, actual: 1.82 },
        { name: 'Tech', target: 3.04, actual: 4.22 },
        { name: 'Consumer', target: 1.83, actual: 0.62 },
        { name: 'Nonprofit', target: 1.84, actual: 0.3 },
        { name: 'Financial', target: 1.21, actual: 0.99 },
        { name: 'Healthcare', target: 1.22, actual: 2.14 },
        { name: 'Energy', target: 1.23, actual: 1.35 },
        { name: 'Education', target: 1.22, actual: 0.64 },
      ],
    };
  },
  mounted() {
    this.initChart();
    this.initGauge();
    this.initRadar();
  },
  methods: {
    initChart() {
      this.kpis = JSC.chart(this.$refs.myKpis, {
        type: 'horizontal column solid',
        title_label: {
          text: 'Graphique multifonction avec filtre, trie, légende etc...',
          position: 'center',
          style_fontSize: 16,
          margin_bottom: 28
        },
        defaultTooltip_label_text: this.combinedTooltipText,
        logo_visible: false,
        box_size_auto: true,
        series: this.makeSeries(this.sortData(this.data, this.sortBy, this.direction)),
        toolbar_items: {
          export_visible: false,
          group: {
            offset: '0,-25',
            label_text: '',
            itemsBox_visible: true,
            items: {
              Label: {
                type: 'label',
                label_text: 'Sort by:',
                boxVisible: false
              },
              Sort: {
                type: 'select',
                items: 'Target,Actual,Difference',
                value: this.sortBy,
                events_change: (val) => {
                  this.sortBy = val;
                  this.kpis.options({
                    series: this.makeSeries(this.sortData(this.data, val, this.direction))
                  });
                }
              },
              Direction: {
                type: 'option',
                value: this.direction,
                icon: {
                  name: 'material/content/sort',
                  size: 14
                },
                label_text: '',
                events_change: (val) => {
                  this.direction = val;
                  this.kpis.uiItems('Direction').options({
                    value: val,
                    icon_rotate: val ? 0 : 180
                  });
                  this.kpis.options({
                    series: this.makeSeries(this.sortData(this.data, this.sortBy, val))
                  });
                }
              }
            }
          }
        }
      });
    },

    initGauge() {
      this.chart = JSC.chart(this.$refs.myGauge, {
        title_label: {
          text: 'Jauges pour indiquer les différents thèmes d\'un jeu ?',
          position: 'center',
          style_fontSize: 16,
          margin_bottom: 28
        },
        debug: false,
        legend_visible: false,
        logo_visible: false,
        defaultTooltip_enabled: false,
        xAxis_spacingPercentage: 0.4,
        yAxis: [
          {
            id: 'ax1',
            defaultTick: { padding: 10, enabled: false },
            customTicks: [350, 600, 700, 800, 850],
            line: {
              width: 10,
              breaks: {},
              color: 'smartPalette:pal1'
            },
            scale_range: [350, 850]
          },
          {
            id: 'ax2',
            scale_range: [0, 850],
            defaultTick: { padding: 10, enabled: false },
            customTicks: [0, 300, 600, 700, 800, 850],
            line: { width: 10, color: 'smartPalette:pal2' }
          }
        ],
        defaultSeries: {
          type: 'gauge column roundcaps',
          shape: {
            label: {
              text: '%max',
              align: 'center',
              verticalAlign: 'middle',
              style_fontSize: 28
            }
          }
        },
        series: [
          {
            type: 'column roundcaps',
            name: 'Temperatures',
            yAxis: 'ax1',
            palette: {
              id: 'pal1',
              pointValue: '%yValue',
              ranges: [
                { value: 350, color: '#FF5353' },
                { value: 600, color: '#FFD221' },
                { value: 700, color: '#77E6B4' },
                { value: [800, 850], color: '#21D683' }
              ]
            },
            points: [['x', [350, 720]]]
          },
          {
            yAxis: 'ax2',
            name: 'Temperatures',
            palette: {
              id: 'pal2',
              pointValue: '{%yValue/850}',
              colors: [
                '#ffffd9',
                '#edf8b0',
                '#c7e9b4',
                '#7fcdbb',
                '#41b6c3',
                '#1d91c0',
                '#225ea8',
                '#253494',
                '#081d58'
              ]
            },
            points: [['x', 320]]
          }
        ]
      });
    },

    initRadar() {
      const radarData = this.getRadarData(); // Obtenir les données du graphique

      console.log(radarData)
      this.game1 = 'Jeu 1';
      this.game2 = 'Jeu 2';

      this.chart = JSC.chart(this.$refs.myRadar, {
        type: 'radar',
        legend_visible: false,
        animation_duration: 500,
        title_label: {
          text: 'Comparaison des mécaniques de jeux',
          style_fontSize: 17
        },
        palette: this.palette,
        yAxis: {
          alternateGridFill: 'none',
          scale_range: [0, 1],
          defaultTick_label_visible: false
        },
        xAxis_defaultTick: {
          line_visible: false,
          label_width: 80
        },
        defaultSeries_mouseTracking_enabled: false,
        defaultPoint_marker: {
          type: 'circle',
          outline_width: 0
        },
        series: this.makeRadarSeries(radarData, this.game1, this.game2),
        toolbar_defaultItem_position: 'inside top',
        toolbar_items: {
          dropdown1: {
            type: 'select',
            value: this.game1,
            items: this.makeRadarList(radarData).join(','),
            events_change: (val) => {
              this.game1 = val;
              const series = this.makeRadarSeries(radarData, val, this.game2);
              this.chart.options({ series: series });
            },
            itemsBox_outline_width: 0,
            fill: this.palette[0],
            radius: 20,
            outline_width: 0,
            label_color: 'white',
            states_hover: {
              fill: this.palette[0],
              outline_width: 0
            },
            icon: {
              size: 12,
              name: 'material/navigation/arrow-drop-down',
              fill: 'white',
              margin: 4
            }
          },
          label: {
            label_text: 'VS.',
            boxVisible: false,
            margin: 4
          },
          dropdown2: {
            type: 'select',
            value: this.game2,
            items: this.makeRadarList(radarData).join(','),
            events_change: (val) => {
              this.game2 = val;
              const series = this.makeRadarSeries(radarData, this.game1, val);
              this.chart.options({ series: series });
            },
            itemsBox_outline_width: 0,
            fill: this.palette[1],
            radius: 20,
            outline_width: 0,
            label_color: 'white',
            states_hover: {
              fill: this.palette[1],
              outline_width: 0
            },
            icon: {
              size: 12,
              name: 'material/navigation/arrow-drop-down',
              fill: 'white',
              margin: 4
            }
          }
        }
      });
    },

    beforeDestroy() {
      if (this.kpis) {
        this.kpis.dispose();
        this.kpis = null;
      }
      if (this.gauge) {
        this.gauge.dispose();
        this.gauge = null;
      }
    },

    makeSeries(data) {
      /*
      Transforme data en une structure appropriée pour la création des séries du graphique.
      La méthode nest().key() regroupe les données en fonction de la clé 'name', puis
      pointRollup() pour transformer ces groupes en points de série.
      La méthode points() est utilisée pour filtrer les données en fonction de si 'actual' est
      inférieur ou supérieur à 'target'.
      La série 'Target' est spécialement configurée pour être un marqueur plutôt qu'une colonne.
       */

      const key = JSC.nest().key('name');
      return [
        {
          name: 'Revenue (miss)',
          points: key
              .pointRollup((key, val) => {
                return {
                  x: key,
                  id: key,
                  y: val[0].actual
                };
              })
              .points(
                  data.filter((x) => {
                    return x.actual - x.target < 0;
                  })
              )
        },
        {
          name: 'Revenue (beat)',
          points: key
              .pointRollup((key, val) => {
                return {
                  x: key,
                  id: key,
                  y: val[0].actual
                };
              })
              .points(
                  data.filter((x) => {
                    return x.actual - x.target >= 0;
                  })
              )
        },
        {
          name: 'Target',
          type: 'marker',
          defaultPoint: {
            marker: {
              type: 'linear/arrows/minus',
              size: 30,
              rotate: 90
            },
            tooltip:
                '<icon size=10 margin=5 outline_width=2 verticalAlign=middle outline_color=' +
                this.palette[2] +
                ' name=linear/arrows/minus>' +
                ' %seriesName: <b>${%value*1000000:n0}</b>'
          },
          points: key
              .pointRollup((key, val) => {
                return {
                  x: key,
                  id: key,
                  y: val[0].target
                };
              })
              .points(data)
        }
      ];
    },

    sortData(data, sortBy, direction) {
      switch (sortBy) {
        case 'Target':
          data = JSC.sortBy(data, function(item) {
            return item.target;
          });
          direction && data.reverse();
          break;
        case 'Actual':
          data = JSC.sortBy(data, function(item) {
            return item.actual;
          });
          direction && data.reverse();
          break;
        case 'Difference':
          data = JSC.sortBy(data, function(item) {
            return Math.abs(item.target - item.actual);
          });
          direction && data.reverse();
          break;
      }
      return data;
    },

    combinedTooltipText(points) {
      if (points.length === 2) {
        var result =
            points[0].replaceTokens('%seriesName') === 'Target'
                ? 'Beat (<span style="color:' +
                this.palette[1] +
                '"><b>' +
                Math.round((points[1].y / points[0].y) * 100) +
                '%</b></span> of Target)'
                : 'Missed (<span style="color:' +
                this.palette[0] +
                '"><b>' +
                Math.round((points[0].y / points[1].y) * 100) +
                '%</b></span> of Target)';
        return (
            '<b>%xValue</b><br>' +
            result +
            '<br>' +
            '%points'
        );
      } else {
        return '<b>%xValue</b><br>' + '%points';
      }
    },

    getRadarData() {
      // Simuler les données du graphique
      return [
        {Player: 'Jeu 1', Points: 0.2, Rebounds: 0.8, Assists: 0.2, 'Field Goal': 0.5, '3-Point FG': 0.4},
        {Player: 'Jeu 2', Points: 0.1, Rebounds: 1, Assists: 0.3, 'Field Goal': 0.6, '3-Point FG': 0.3}
      ];
    },

    makeRadarSeries(data, player1, player2) {
      const player1Data = data.find((player) => player.Player === player1);
      const player2Data = data.find((player) => player.Player === player2);

      return [
        {
          name: player1,
          id: 'Jeu 1',
          shape_fill: ['#B0BEC5', 0.5],
          points: [
            { name: 'Points', y: player1Data.Points, id: 'Points1' },
            { name: 'Rebounds', y: player1Data.Rebounds, id: 'Rebounds1' },
            { name: 'Assists', y: player1Data.Assists, id: 'Assists1' },
            { name: 'Field Goal', y: player1Data['Field Goal'], id: 'Field Goal1' },
            { name: '3-Point FG', y: player1Data['3-Point FG'], id: '3-Point FG1' }
          ]
        },
        {
          name: player2,
          id: 'Jeu 2',
          shape_fill: ['#B0BEC5', 0.5],
          points: [
            { name: 'Points', y: player2Data.Points, id: 'Points2' },
            { name: 'Rebounds', y: player2Data.Rebounds, id: 'Rebounds2' },
            { name: 'Assists', y: player2Data.Assists, id: 'Assists2' },
            { name: 'Field Goal', y: player2Data['Field Goal'], id: 'Field Goal2' },
            { name: '3-Point FG', y: player2Data['3-Point FG'], id: '3-Point FG2' }
          ]
        }
      ];
    },

    makeRadarList(data) {
      return data.map((player) => player.Player);
    }
  },
};
</script>