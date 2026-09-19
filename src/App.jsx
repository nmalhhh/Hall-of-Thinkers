import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import useMuseumStore from './store/useMuseumStore';
import GrandHallGallery from './components/gallery/GrandHallGallery';
import SculptureChamber from './components/viewer/SculptureChamber';

const PAGE_VARIANTS = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
  exit:    { opacity: 0, y: -16, transition: { duration: 0.35, ease: 'easeIn' } },
};

export default function App() {
  const activeSculptureId = useMuseumStore((s) => s.activeSculptureId);

  // Set initial body mode on mount
  useEffect(() => {
    document.body.setAttribute('data-mode', 'gallery');
  }, []);

  return (
    <AnimatePresence mode="wait">
      {activeSculptureId === null ? (
        <motion.div
          key="gallery"
          variants={PAGE_VARIANTS}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <GrandHallGallery />
        </motion.div>
      ) : (
        <motion.div
          key={`chamber-${activeSculptureId}`}
          variants={PAGE_VARIANTS}
          initial="initial"
          animate="animate"
          exit="exit"
          style={{ position: 'fixed', inset: 0, zIndex: 10 }}
        >
          <SculptureChamber />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
