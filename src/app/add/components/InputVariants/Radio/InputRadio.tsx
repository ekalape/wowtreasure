import { FRACTION_OPTIONS } from '../InputVariantsConstToUse';
import horde_img from '@/assets/horde-icon.png';
import alliance_img from '@/assets/aliance-icon.png';
import styles from './radio.module.css';
import Image from 'next/image';

type InputRadioProps = {
  fractionChecked: string;
  setFractionChecked: (fraction: string) => void;
};

export default function InputRadio({ fractionChecked, setFractionChecked }: InputRadioProps) {
  return (
    <div className='flex gap-4 items-center justify-center'>
      <label htmlFor={styles.hordeRadio}>
        <input
          type='radio'
          id={styles.hordeRadio}
          className={styles.radioInput}
          value={FRACTION_OPTIONS.HORDE}
          checked={fractionChecked === FRACTION_OPTIONS.HORDE}
          name='fraction'
          onChange={() => setFractionChecked(FRACTION_OPTIONS.HORDE)}
        />
        <span className={styles.radioTile}>
          <Image
            width={40}
            height={40}
            className={styles.radioIcon}
            src={horde_img.src}
            alt='Fraction: Horde'></Image>
          <span className={styles.radioLabel}>Horde</span>
        </span>
      </label>

      <label htmlFor={styles.allianceRadio}>
        <input
          type='radio'
          id={styles.allianceRadio}
          className={styles.radioInput}
          value={FRACTION_OPTIONS.ALLIANCE}
          checked={fractionChecked === FRACTION_OPTIONS.ALLIANCE}
          name='fraction'
          onChange={() => setFractionChecked(FRACTION_OPTIONS.ALLIANCE)}
        />
        <span className={styles.radioTile}>
          <Image
            width={40}
            height={40}
            className={styles.radioIcon}
            src={alliance_img.src}
            alt='Fraction: alliance'></Image>
          <span className={styles.radioLabel}>Alliance</span>
        </span>
      </label>
    </div>
  );
}
