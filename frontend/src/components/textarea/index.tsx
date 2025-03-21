import cn from 'classnames';
import { type FormikProps } from 'formik';
import { type CSSProperties, type FC } from 'react';
import styles from './index.module.scss';

type IPropsTextarea = {
  name: string;
  label: string;
  formik: FormikProps<any>;
  style?: CSSProperties;
};

const Textarea: FC<IPropsTextarea> = ({ label, name, formik, style }) => {
  const value = formik.values[name];
  const errorText = formik.errors[name] as string | undefined;
  const touched = formik.touched[name];
  const disabled = formik.isSubmitting;
  const invalid = !!touched && !!errorText;

  return (
    <div
      className={cn({
        [styles.field]: true,
        [styles.disabled]: disabled,
      })}
      style={style}
    >
      <label className={styles.label} htmlFor={name}>
        {label}
      </label>
      <textarea
        className={cn({
          [styles.input]: true,
          [styles.invalid]: invalid,
        })}
        onChange={(e) => {
          void formik.setFieldValue(name, e.target.value);
        }}
        onBlur={() => {
          void formik.setFieldTouched(name);
        }}
        value={value}
        name={name}
        id={name}
        autoComplete="off"
        disabled={disabled}
      />
      {invalid && <div className={styles.error}>{errorText}</div>}
    </div>
  );
};

export default Textarea;
