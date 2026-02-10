/**
 * @responsibility Developer C (Community Detail)
 * @description Individual community page showing specific content for a planet.
 */
export default function Page({ params }: { params: { id: string } }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white bg-slate-900">
      <h1 className="text-4xl font-bold">Community: {params.id}</h1>
      <p className="mt-4 text-slate-400">Developer C is building this magic.</p>
    </div>
  );
}
