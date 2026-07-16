export default async function HealthPage() {
  // Test üçün açıq bir API-dan məlumat çəkirik
  const res = await fetch('https://jsonplaceholder.typicode.com/todos/1', { cache: 'no-store' });
  const data = await res.json();

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-green-600">Health Check Status: OK ✅</h1>
      <p className="mt-4 text-gray-700">Serverdən gələn test datası:</p>
      <pre className="bg-gray-100 p-4 rounded mt-2 border text-xs">
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
}