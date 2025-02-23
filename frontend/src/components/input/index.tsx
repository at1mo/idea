import { type FormikProps } from 'formik';
import { type CSSProperties, type FC } from 'react';

type IPropsInput = {
  name: string;
  label: string;
  formik: FormikProps<any>;
  style?: CSSProperties;
};

const Input: FC<IPropsInput> = ({ label, name, style = undefined, formik }) => {
  const value = formik.values[name];
  const errorText = formik.errors[name] as string | undefined;
  const touched = formik.touched[name];

  return (
    <div style={style}>
      <label htmlFor={name}>{label}</label>
      <br />
      <input
        type="text"
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
      />
      {!!touched && !!errorText && (
        <div style={{ color: 'red' }}>{errorText}</div>
      )}
    </div>
  );
};

export default Input;
