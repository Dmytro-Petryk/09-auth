'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { createNote } from '@/lib/api';
import css from './NoteForm.module.css';

type NoteFormProps = {
  onClose: () => void;
};

const validationSchema = Yup.object({
  title: Yup.string().required('Title is required'),
  content: Yup.string(),
  tag: Yup.string().required('Tag is required'),
});

export default function NoteForm({ onClose }: NoteFormProps) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (values: { title: string; content: string; tag: string }) =>
      createNote(values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      onClose();
    },
  });

  return (
    <Formik
      initialValues={{ title: '', content: '', tag: '' }}
      validationSchema={validationSchema}
      onSubmit={(values: { title: string; content: string; tag: string }) =>
        mutation.mutate(values)
      }
    >
      <Form className={css.form}>
        <label>
          Title
          <Field type="text" name="title" />
          <ErrorMessage name="title" component="div" className={css.error} />
        </label>

        <label>
          Content
          <Field as="textarea" name="content" />
          <ErrorMessage name="content" component="div" className={css.error} />
        </label>

        <label>
          Tag
          <Field as="select" name="tag">
            <option value="">Select tag</option>
            <option value="work">Work</option>
            <option value="personal">Personal</option>
            <option value="other">Other</option>
          </Field>
          <ErrorMessage name="tag" component="div" className={css.error} />
        </label>

        <button type="submit" disabled={mutation.isPending}>
          Add Note
        </button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </Form>
    </Formik>
  );
}
