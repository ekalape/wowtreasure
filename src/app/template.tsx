'use client';


import { motion } from 'motion/react';


export default function Template({ children }: { children: React.ReactNode }) {

    return (
        <motion.div
            initial={{ opacity: 0, rotateY: -200, backfaceVisibility: 'hidden' }}
            animate={{ opacity: 1, rotateY: 0 }}
            exit={{ opacity: 0, rotateY: -200, backfaceVisibility: 'hidden' }}
            transition={{ duration: 0.3 }}
        >
            {children}
        </motion.div>
    );
}