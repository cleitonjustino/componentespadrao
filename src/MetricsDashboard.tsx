import { useEffect, useState } from "react";

interface Metrics {
  date: string;
  impressions: number;
  clicks: number;
}

interface MetricsDashboardProps {
  selectedDate: string;
}

const MetricsDashboard = ({ selectedDate }: MetricsDashboardProps) => {
  const [metrics, setMetrics] = useState<Metrics | null>(null);

  useEffect(() => {
    mockFetchMetrics(selectedDate).then((data) => {
      setMetrics(data);
    });
  }, [selectedDate]);

  if (!metrics) return <div>Loading…</div>;

  return (
    <div>
      <h2>Metrics for {selectedDate}</h2>
      <pre>{JSON.stringify(metrics, null, 2)}</pre>
    </div>
  );
};

const mockFetchMetrics = (date: string): Promise<Metrics> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        date,
        impressions: Math.floor(Math.random() * 10000),
        clicks: Math.floor(Math.random() * 5000),
      });
    }, 600);
  });
};

export default MetricsDashboard;
