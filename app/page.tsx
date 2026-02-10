/**
 * @responsibility Project Lead / Developer A
 * @description Landing Page & Entry Point for the Galaxy Experience.
 */
import Link from 'next/link';
import { Rocket } from 'lucide-react';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-[#0a0a0a] text-white">
      <h1 className="text-6xl font-bold tracking-tighter mb-8">Galaxy Communities</h1>
      <div className="flex gap-4">
        <Link 
          href="/create" 
          className="bg-white text-black px-8 py-4 rounded-full font-bold flex items-center gap-2 hover:bg-opacity-90 transition-all"
        >
          <Rocket size={20} />
          Launch Your Planet
        </Link>
        <Link 
          href="/galaxy" 
          className="border border-white/20 bg-white/5 px-8 py-4 rounded-full font-bold hover:bg-white/10 transition-all"
        >
          Explore Galaxy
        </Link>
      </div>
    </main>
  );
}
