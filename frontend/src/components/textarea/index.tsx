import { type FormikProps } from 'formik';
import { type CSSProperties, type FC } from 'react';

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

  return (
    <div style={style}>
      <label htmlFor={name}>{label}</label>
      <br />
      <textarea
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

export default Textarea;
