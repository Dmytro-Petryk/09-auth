'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNote } from '@/lib/api';
import { useNoteStore } from '@/lib/store/noteStore';
import { useRouter } from 'next/navigation';
import css from './NoteForm.module.css';

type NoteFormProps = object;

export default function NoteForm({}: NoteFormProps) {
  const queryClient = useQueryClient();
  const { draft, setDraft, clearDraft } = useNoteStore();
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: (values: { title: string; content: string; tag: string }) =>
      createNote(values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      clearDraft();
      router.back();
    },
  });

  const handleSubmit = async (formData: FormData) => {
    const note = {
      title: formData.get('title') as string,
      content: formData.get('content') as string,
      tag: formData.get('tag') as string,
    };
    mutation.mutate(note);
  };

  return (
    <form className={css.form} action={handleSubmit}>
      <label>
        Title
        <input
          type="text"
          name="title"
          value={draft.title}
          onChange={(e) => setDraft({ ...draft, title: e.target.value })}
        />
      </label>

      <label>
        Content
        <textarea
          name="content"
          value={draft.content}
          onChange={(e) => setDraft({ ...draft, content: e.target.value })}
        />
      </label>

      <label>
        Tag
        <select
          name="tag"
          value={draft.tag}
          onChange={(e) => setDraft({ ...draft, tag: e.target.value })}
        >
          <option value="">Select tag</option>
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
      </label>

      <button type="button" onClick={() => router.back()}>
        Cancel
      </button>

      <button type="submit" disabled={mutation.isPending}>
        Create note
      </button>
    </form>
  );
}
