import { zCreateIdeaTrpcInput } from '@ideanick/backend/src/router/ideas/createIdea/input';
import Alert from '../../../components/alert';
import Button from '../../../components/button';
import FormItems from '../../../components/formItems';
import Input from '../../../components/input';
import Segment from '../../../components/segment/segment';
import Textarea from '../../../components/textarea';
import { UploadsToCloudinary } from '../../../components/uploadsToCloudinary';
import { useForm } from '../../../lib/form';
import { withPageWrapper } from '../../../lib/pageWrapper';
import { trpc } from '../../../lib/trpc';

const NewIdeaPage = withPageWrapper({
  authorizedOnly: true,
  title: 'New idea',
})(() => {
  const createIdea = trpc.createIdea.useMutation();

  const { formik, buttonProps, alertProps } = useForm({
    initialValues: {
      name: '',
      nick: '',
      description: '',
      text: '',
      images: [],
    },
    validationSchema: zCreateIdeaTrpcInput,
    onSubmit: async (values) => {
      await createIdea.mutateAsync(values);
      formik.resetForm();
    },
    successMessage: 'Idea created!',
    showValidationAlert: true,
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
          <UploadsToCloudinary
            label="Images"
            name="images"
            type="image"
            preset={'preview'}
            formik={formik}
          />
          <Alert {...alertProps} />

          <Button {...buttonProps}>Create idea</Button>
        </FormItems>
      </form>
    </Segment>
  );
});

export default NewIdeaPage;
