import { zCreateIdeaTrpcInput } from '@ideanick/backend/src/router/createIdea/input';
import { useFormik } from 'formik';
import { withZodSchema } from 'formik-validator-zod';
import { useState } from 'react';
import Alert from '../../components/alert';
import Button from '../../components/button';
import FormItems from '../../components/formItems';
import Input from '../../components/input';
import Segment from '../../components/segment/segment';
import Textarea from '../../components/textarea';
import { trpc } from '../../lib/trpc';

const NewIdeaPage = () => {
  const [successMsgVisible, setSuccessMsgVisible] = useState(false);
  const [submittingError, setSubmittingError] = useState<string | null>(null);
  const createIdea = trpc.createIdea.useMutation();

  const formik = useFormik({
    initialValues: {
      name: '',
      nick: '',
      description: '',
      text: '',
    },
    validate: withZodSchema(zCreateIdeaTrpcInput),
    onSubmit: async (values) => {
      try {
        await createIdea.mutateAsync(values);
        formik.resetForm();
        setSuccessMsgVisible(true);
        setTimeout(() => {
          setSuccessMsgVisible(false);
        }, 3000);
      } catch (error: any) {
        setSubmittingError(error.message);
        setTimeout(() => {
          setSubmittingError(null);
        }, 3000);
      }
    },
  });

  return (
    <Segment title="New Idea">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          formik.handleSubmit();
        }}
      >
        <FormItems>
          <Input label="Name" name="name" formik={formik} />
          <Input label="Nick" name="nick" formik={formik} />
          <Input
            label="Description"
            name="description"
            formik={formik}
            maxWidth={500}
          />
          <Textarea label="Text" name="text" formik={formik} />

          {!formik.isValid && !!formik.submitCount && (
            <div style={{ color: 'red' }}>Some fields are invalid</div>
          )}

          {successMsgVisible && <Alert color="green">Idea created</Alert>}
          {submittingError && <Alert color="red">{submittingError}</Alert>}

          <Button loading={formik.isSubmitting}>Create idea</Button>
        </FormItems>
      </form>
    </Segment>
  );
};

export default NewIdeaPage;
