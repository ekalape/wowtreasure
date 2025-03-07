
'use client';
import React, { useState } from 'react'
import styles from './dropdown.module.css'
import clsx from 'clsx';
import { AnimatePresence, motion } from 'motion/react';


type DropDownMenuProps = {
    options: string[],
    checked: string,
    setChecked: (selected: string) => void
}

export default function DropDownMenu({ options, checked, setChecked }: DropDownMenuProps) {
    const [isOpen, setIsOpen] = useState(false);

    const onSelect = (e: React.MouseEvent) => {
        e.stopPropagation();

        const target = e.target as HTMLElement;
        if (target.tagName === 'LABEL') {
            setChecked(target.getAttribute('data-txt') as string)
            setIsOpen(false)
        }
        if (target.tagName === 'INPUT') {
            setChecked((target as HTMLInputElement).value)
            setIsOpen(false)
        }
    }

    return (
        <div className={styles.select}>
            <div
                className={styles.selected} onClick={() => setIsOpen(prev => !prev)} >
                <span>{checked ? checked : 'Select a class'}</span>
                <motion.svg
                    animate={{ rotate: isOpen ? 0 : -90 }} transition={{ duration: 0.2 }}
                    xmlns="http://www.w3.org/2000/svg"
                    height="1em"
                    viewBox="0 0 512 512"
                    className={styles.arrow}                >
                    <path
                        d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"
                    ></path>
                </motion.svg>
            </div>
            <AnimatePresence>
                {isOpen && <motion.div animate={{ opacity: 1, top: '0px' }} initial={{ opacity: 0, top: '-200px' }} exit={{ opacity: 0.6, top: '-300px' }}
                    transition={{ duration: 0.3 }}
                    className={clsx(styles.options)} >
                    {options.map((option) => (
                        <motion.div
                            whileHover={{ scale: 1.1 }}
                            title={option} key={option} onClick={onSelect}>
                            <input id={option} name="option" type="radio" defaultValue={option}
                            />
                            <label className={styles.option} htmlFor={option} data-txt={option}></label>
                        </motion.div>
                    ))}

                </motion.div>}</AnimatePresence>
        </div>
    )
}
