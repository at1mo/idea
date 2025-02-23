import { useFormik } from 'formik';
import { withZodSchema } from 'formik-validator-zod';
import { z } from 'zod';
import Input from '../../components/input';
import Segment from '../../components/segment/segment';
import Textarea from '../../components/textarea';

const NewIdeaPage = () => {
  const formik = useFormik({
    initialValues: {
      name: '',
      nick: '',
      description: '',
      text: '',
    },
    validate: withZodSchema(
      z.object({
        name: z.string().min(2),
        nick: z
          .string()
          .min(2)
          .regex(
            /^[a-z0-9-]+$/,
            'Nick may contain only lowercase letters, numbers and dashes'
          ),
        description: z.string().min(2),
        text: z.string().min(50, 'Text should be at least 50 characters long'),
      })
    ),
    onSubmit: (values) => {
      console.info('Submitted', values);
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
