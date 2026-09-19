import { create } from 'zustand';

/**
 * useMuseumStore — Central state for The Hall of Thinkers
 *
 * Responsibilities:
 * - activeSculptureId: which sculpture is open in the Chamber (null = Gallery)
 * - activeHotspot: currently open hotspot data (null = closed)
 * - body overflow is synced here to prevent gallery scroll bleeding into chamber
 */
const useMuseumStore = create((set) => ({
  activeSculptureId: null,
  activeHotspot: null,

  setActiveSculpture: (id) => {
    // Sync body scroll mode
    document.body.setAttribute('data-mode', id ? 'chamber' : 'gallery');
    set({ activeSculptureId: id, activeHotspot: null });
  },

  clearActiveSculpture: () => {
    document.body.setAttribute('data-mode', 'gallery');
    set({ activeSculptureId: null, activeHotspot: null });
  },

  setHotspot: (hotspot) => set({ activeHotspot: hotspot }),

  clearHotspot: () => set({ activeHotspot: null }),
}));

export default useMuseumStore;
