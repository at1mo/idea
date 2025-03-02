import { zSignInTrpcInput } from '@ideanick/backend/src/router/signIn/input';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import Alert from '../../components/alert';
import Button from '../../components/button';
import FormItems from '../../components/formItems';
import Input from '../../components/input';
import Segment from '../../components/segment/segment';
import { useForm } from '../../lib/form';
import { getAllIdeasRoute } from '../../lib/routes';
import { trpc } from '../../lib/trpc';

export const SignInPage = () => {
  const navigate = useNavigate();
  const trpcUtils = trpc.useContext();
  const signIn = trpc.signIn.useMutation();
  const { formik, buttonProps, alertProps } = useForm({
    initialValues: {
      nick: '',
      password: '',
    },
    validationSchema: zSignInTrpcInput,
    onSubmit: async (values) => {
      const { token } = await signIn.mutateAsync(values);
      Cookies.set('token', token, { expires: 99999 });
      void trpcUtils.invalidate();
      void navigate(getAllIdeasRoute());
    },
    resetOnSuccess: false,
  });

  return (
    <Segment title="Sign In">
      <form onSubmit={formik.handleSubmit}>
        <FormItems>
          <Input label="Nick" name="nick" formik={formik} />
          <Input
            label="Password"
            name="password"
            type="password"
            formik={formik}
          />
          <Alert {...alertProps} />
          <Button {...buttonProps}>Sign In</Button>
        </FormItems>
      </form>
    </Segment>
  );
};
