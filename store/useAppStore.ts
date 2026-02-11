/**
 * @responsibility Shared Store (Usable by B, C, D, E)
 * @description Central source of truth for the planet's appearance and state.
 */
import { create } from 'zustand';

interface PlanetState {
  // 3D Visuals
  color: string;
  surfaceType: 'clay' | 'moss' | 'sand' | 'lavender';
  hasRings: boolean;
  hasMoons: boolean;
  description: string; // 添加这个字段
  setPlanetDescription: (desc: string) => void; // 给参数 desc 指定类型为 string

  // Cozy Vibe
  isPulsing: boolean;
  bobbingIntensity: number;
  rotationLevel: number; // 0 to 10
  
  // Actions
  setColor: (color: string) => void;
  setSurfaceType: (type: 'clay' | 'moss' | 'sand' | 'lavender') => void;
  toggleRings: () => void;
  toggleMoons: () => void;
  setRotationLevel: (level: number) => void;
}

export const useAppStore = create<PlanetState>((set) => ({
  // Defaults - Warm and Cozy
  color: '#FFB7B2', // Soft Peach
  description: '',
  surfaceType: 'clay',
  hasRings: false,
  hasMoons: false,
  isPulsing: true,
  bobbingIntensity: 1,
  rotationLevel: 2,

  setColor: (color) => set({ color }),
  setSurfaceType: (surfaceType) => set({ surfaceType }),
  toggleRings: () => set((state) => ({ hasRings: !state.hasRings })),
  toggleMoons: () => set((state) => ({ hasMoons: !state.hasMoons })),
  setRotationLevel: (rotationLevel) => set({ rotationLevel }),
  setPlanetDescription: (desc:string) => set({ description: desc}),
}));
