export function buildPieStyle(items) {
  if (!items || !items.length) {
    return { background: '#e2e8f0' };
  }
  const colors = ['#2563eb', '#14b8a6', '#f59e0b', '#ef4444', '#8b5cf6', '#0ea5e9'];
  const total = items.reduce((sum, item) => sum + Number(item.amount || 0), 0);
  let start = 0;
  const segments = items.map((item, index) => {
    const angle = total ? (Number(item.amount || 0) / total) * 360 : 0;
    const color = colors[index % colors.length];
    const segment = `${color} ${start}deg ${start + angle}deg`;
    start += angle;
    return segment;
  });
  return { background: `conic-gradient(${segments.join(', ')})` };
}

export function formatCurrency(value) {
  const amount = Number(value || 0);
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 2,
  }).format(amount);
}
