import { zUpdateIdeaTrpcInput } from '@ideanick/backend/src/router/ideas/updateIdea/input';
import { canEditIdea } from '@ideanick/backend/src/utils/can';
import pick from 'lodash/pick';
import { useNavigate } from 'react-router-dom';
import Alert from '../../../components/alert';
import Button from '../../../components/button';
import FormItems from '../../../components/formItems';
import Input from '../../../components/input';
import Segment from '../../../components/segment/segment';
import Textarea from '../../../components/textarea';
import { useForm } from '../../../lib/form';
import { withPageWrapper } from '../../../lib/pageWrapper';
import { getEditIdeaRoute, getViewIdeaRoute } from '../../../lib/routes';
import { trpc } from '../../../lib/trpc';

export const EditIdeaPage = withPageWrapper({
  authorizedOnly: true,
  useQuery: () => {
    const { ideaNick } = getEditIdeaRoute.useParams();
    return trpc.getIdea.useQuery({
      ideaNick,
    });
  },
  setProps: ({ queryResult, ctx, checkExists, checkAccess }) => {
    const idea = checkExists(queryResult.data.idea, 'Idea not found');
    checkAccess(
      canEditIdea(ctx.me, idea),
      'An idea can only be edited by the author'
    );
    return {
      idea,
    };
  },
  title: ({ idea }) => `Edit Idea "${idea.name}"`,
})(({ idea }) => {
  const navigate = useNavigate();
  const updateIdea = trpc.updateIdea.useMutation();
  const { formik, buttonProps, alertProps } = useForm({
    initialValues: pick(idea, ['name', 'nick', 'description', 'text']),
    validationSchema: zUpdateIdeaTrpcInput.omit({ ideaId: true }),
    onSubmit: async (values) => {
      await updateIdea.mutateAsync({ ideaId: idea.id, ...values });
      void navigate(getViewIdeaRoute({ ideaNick: values.nick }));
    },
    resetOnSuccess: false,
    showValidationAlert: true,
  });

  return (
    <Segment title={`Edit Idea: ${idea.nick}`}>
      <form onSubmit={formik.handleSubmit}>
        <FormItems>
          <Input label="Name" name="name" formik={formik} />
          <Input label="Nick" name="nick" formik={formik} />
          <Input
            label="Description"
            name="description"
            maxWidth={500}
            formik={formik}
          />
          <Textarea label="Text" name="text" formik={formik} />
          <Alert {...alertProps} />
          <Button {...buttonProps}>Update Idea</Button>
        </FormItems>
      </form>
    </Segment>
  );
});
