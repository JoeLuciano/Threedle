import { motion } from 'framer-motion';

export default function Info({ gameState }) {
  return (
    <motion.div className='react-container'>
      <motion.h1>{gameState}</motion.h1>
    </motion.div>
  );
}
