'use client';
import { useState, FormEvent } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNote } from '@/lib/api';
import { useNoteStore } from '@/lib/store/noteStore';
import css from './NoteForm.module.css';

type NoteFormProps = object;

export default function NoteForm({}: NoteFormProps) {
  const queryClient = useQueryClient();
  const { draft, setDraft, clearDraft } = useNoteStore();

  const [title, setTitle] = useState(draft.title);
  const [content, setContent] = useState(draft.content);
  const [tag, setTag] = useState(draft.tag);

  const mutation = useMutation({
    mutationFn: (values: { title: string; content: string; tag: string }) =>
      createNote(values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      clearDraft();
    },
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    mutation.mutate({ title, content, tag });
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <label>
        Title
        <input
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            setDraft({ title: e.target.value });
          }}
        />
      </label>

      <label>
        Content
        <textarea
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
            setDraft({ content: e.target.value });
          }}
        />
      </label>

      <label>
        Tag
        <select
          value={tag}
          onChange={(e) => {
            setTag(e.target.value);
            setDraft({ tag: e.target.value });
          }}
        >
          <option value="">Select tag</option>
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
      </label>

      <button type="submit" disabled={mutation.isPending}>
        Create note
      </button>
    </form>
  );
}
