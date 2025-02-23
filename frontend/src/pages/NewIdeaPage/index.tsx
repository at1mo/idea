import { zCreateIdeaTrpcInput } from '@ideanick/backend/src/router/createIdea/input';
import { useFormik } from 'formik';
import { withZodSchema } from 'formik-validator-zod';
import Input from '../../components/input';
import Segment from '../../components/segment/segment';
import Textarea from '../../components/textarea';
import { trpc } from '../../lib/trpc';

const NewIdeaPage = () => {
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
      await createIdea.mutateAsync(values);
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
        <Input
          style={{ marginBottom: 10 }}
          label="Name"
          name="name"
          formik={formik}
        />

        <Input
          style={{ marginBottom: 10 }}
          label="Nick"
          name="nick"
          formik={formik}
        />

        <Input
          style={{ marginBottom: 10 }}
          label="Description"
          name="description"
          formik={formik}
        />

        <Textarea
          style={{ marginBottom: 10 }}
          label="Text"
          name="text"
          formik={formik}
        />

        {!formik.isValid && !!formik.submitCount && (
          <div style={{ color: 'red' }}>Some fields are invalid</div>
        )}

        <button type="submit">Create Idea</button>
      </form>
    </Segment>
  );
};

export default NewIdeaPage;
