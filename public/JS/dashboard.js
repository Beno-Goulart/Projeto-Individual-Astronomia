// // Pizza - Distribuição de escolhas por etapa
// new Chart(document.getElementById('pizzaChart'), {
//     type: 'pie',
//     data: {
//         labels: ['Desligar sistema', 'Chamar ajuda', 'Investigar ruído', 'Ignorar alerta'],
//         datasets: [{
//             data: [40, 30, 20, 10],
//             backgroundColor: ['#4bc0c0', '#ff9f40', '#9966ff', '#ff6384']
//         }]
//     },
//     options: { plugins: { legend: { labels: { color: '#fff' } } } }
// });

// Barras - Finais (soma 36)
new Chart(document.getElementById('barChart'), {
    type: 'bar',
    data: {
        labels: ['Missão Cumprida', 'Missão Fracassada', 'Civilização Alien', 'Traição', 'Sacrifício'],
        datasets: [{
            label: 'Quantidade',
            data: [12, 8, 7, 5, 4], // Total: 36
            backgroundColor: '#36a2eb'
        }]
    },
    options: {
        scales: {
            x: { ticks: { color: '#fff' } },
            y: { ticks: { color: '#fff' } }
        },
        plugins: {
            legend: { labels: { color: '#fff' } }
        }
    }
});



// // Linha - Tempo médio por etapa
// new Chart(document.getElementById('lineChart'), {
//     type: 'line',
//     data: {
//         labels: ['Etapa 1', 'Etapa 2', 'Etapa 3', 'Etapa 4', 'Etapa 5'],
//         datasets: [{
//             label: 'Tempo Médio (s)',
//             data: [30, 45, 60, 35, 50],
//             borderColor: '#ffcd56',
//             backgroundColor: 'rgba(255, 205, 86, 0.3)',
//             fill: true,
//             tension: 0.4
//         }]
//     },
//     options: {
//         scales: { x: { ticks: { color: '#fff' } }, y: { ticks: { color: '#fff' } } },
//         plugins: { legend: { labels: { color: '#fff' } } }
//     }
// });

// // Área - Tempo total de jogo por jogador
// new Chart(document.getElementById('areaChart'), {
//     type: 'line',
//     data: {
//         labels: ['Jogador 1', 'Jogador 2', 'Jogador 3', 'Jogador 4', 'Jogador 5'],
//         datasets: [{
//             label: 'Tempo Total (s)',
//             data: [420, 480, 390, 520, 450],
//             backgroundColor: 'rgba(54, 162, 235, 0.3)',
//             borderColor: '#36a2eb',
//             fill: true,
//             tension: 0.3
//         }]
//     },
//     options: {
//         scales: { x: { ticks: { color: '#fff' } }, y: { ticks: { color: '#fff' } } },
//         plugins: { legend: { labels: { color: '#fff' } } }
//     }
// });

// Radar - Perfil de decisões (aumentado o tamanho da fonte)
new Chart(document.getElementById('radarChart'), {
    type: 'radar',
    data: {
        labels: ['Cauteloso', 'Impulsivo', 'Analítico', 'Emocional', 'Explorador'],
        datasets: [{
            label: 'Média dos jogadores',
            data: [3, 2, 4, 1, 5],
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: '#ff6384'
        }]
    },
    options: {
        scales: {
            r: {
                ticks: {
                    backdropColor: 'transparent',
                    color: '#fff'
                },
                grid: {
                    color: '#999'
                },
                pointLabels: {
                    font: {
                        size: 17 // aumentado o tamanho da fonte
                    },
                    color: '#fff'
                }
            }
        },
        plugins: {
            legend: {
                labels: {
                    color: '#fff'
                }
            }
        }
    }
});