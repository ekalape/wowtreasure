import React from 'react'
import styles from './dropdown.module.css'

type DropDownMenuProps = {
    options: string[],
    checked: string,
    setChecked: (selected: string) => void
}

export default function DropDownMenu({ options, checked, setChecked }: DropDownMenuProps) {
    return (
        <div className={styles.select}>
            <div
                className={styles.selected}
            >
                <span>{checked ? checked : 'Select a class'}</span>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="1em"
                    viewBox="0 0 512 512"
                    className={styles.arrow}
                >
                    <path
                        d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"
                    ></path>
                </svg>
            </div>
            <div className={styles.options} >
                {options.map((option) => (
                    <div title={option} key={option}>
                        <input id={option} name="option" type="radio" value={option} checked={checked === option}
                            onChange={(e) => setChecked((e.target as HTMLInputElement).value)} />
                        <label className={styles.option} htmlFor={option} data-txt={option}></label>
                    </div>
                ))}

            </div></div>
    )
}
