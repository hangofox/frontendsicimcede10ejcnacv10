import { Plugin } from 'chart.js';

/** Dibuja el valor de cada porción fuera de la tarta y lo une con una línea del color correspondiente. */
export const etiquetasConectoresPlugin: Plugin<'pie'> = {
  id: 'etiquetasConectores',
  afterDatasetsDraw(chart) {
    const { ctx } = chart;
    const dataset = chart.data.datasets[0];
    const colores = dataset.backgroundColor as string[];
    const meta = chart.getDatasetMeta(0);

    ctx.save();
    ctx.font = '700 12px Arial, sans-serif';
    ctx.lineWidth = 1.5;

    meta.data.forEach((elemento, indice) => {
      const valor = Number(dataset.data[indice] ?? 0);
      if (valor <= 0) return;

      const arco = elemento.getProps(['x', 'y', 'startAngle', 'endAngle', 'outerRadius'], true);
      const angulo = (Number(arco['startAngle']) + Number(arco['endAngle'])) / 2;
      const direccion = Math.cos(angulo) >= 0 ? 1 : -1;
      const color = colores[indice] || '#475569';
      const xInicio = Number(arco['x']) + Math.cos(angulo) * Number(arco['outerRadius']);
      const yInicio = Number(arco['y']) + Math.sin(angulo) * Number(arco['outerRadius']);
      const xCodo = Number(arco['x']) + Math.cos(angulo) * (Number(arco['outerRadius']) + 18);
      const yCodo = Number(arco['y']) + Math.sin(angulo) * (Number(arco['outerRadius']) + 18);
      const xFinal = xCodo + direccion * 24;

      ctx.strokeStyle = color;
      ctx.beginPath();
      ctx.moveTo(xInicio, yInicio);
      ctx.lineTo(xCodo, yCodo);
      ctx.lineTo(xFinal, yCodo);
      ctx.stroke();

      ctx.fillStyle = color;
      ctx.textAlign = direccion > 0 ? 'left' : 'right';
      ctx.textBaseline = 'middle';
      ctx.fillText(`${chart.data.labels?.[indice]}: ${valor}`, xFinal + direccion * 4, yCodo);
    });

    ctx.restore();
  }
};

/** Muestra el valor exacto centrado sobre cada barra. */
export const valoresSobreBarrasPlugin: Plugin<'bar'> = {
  id: 'valoresSobreBarras',
  afterDraw(chart) {
    const { ctx } = chart;
    const dataset = chart.data.datasets[0];
    const colores = dataset.backgroundColor as string[];
    const meta = chart.getDatasetMeta(0);

    ctx.save();
    ctx.font = '800 13px Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'bottom';

    meta.data.forEach((elemento, indice) => {
      const valor = Number(dataset.data[indice] ?? 0);
      const barra = elemento.getProps(['x', 'y', 'base'], true);
      const y = valor === 0 ? Number(barra['base']) - 6 : Number(barra['y']) - 7;
      ctx.lineWidth = 3;
      ctx.strokeStyle = '#ffffff';
      ctx.strokeText(String(valor), Number(barra['x']), y);
      ctx.fillStyle = colores[indice] || '#1f2937';
      ctx.fillText(String(valor), Number(barra['x']), y);
    });

    ctx.restore();
  }
};
