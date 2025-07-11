'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { fetchNoteById } from '@/lib/api';
import Modal from '@/components/Modal/Modal';
import css from './NotePreview.module.css';

export default function NotePreview() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id;

  const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(Number(id)),
    enabled: !!id,
    refetchOnMount: false,
  });

  if (isLoading)
    return (
      <Modal onClose={() => router.back()}>
        <p>Loading note...</p>
      </Modal>
    );

  if (error)
    return (
      <Modal onClose={() => router.back()}>
        <p>Error loading note.</p>
      </Modal>
    );

  if (!note)
    return (
      <Modal onClose={() => router.back()}>
        <p>Note not found.</p>
      </Modal>
    );

  return (
    <Modal onClose={() => router.back()}>
      <div className={css.wrapper}>
        <h2 className={css.title}>{note.title}</h2>
        <p className={css.content}>{note.content}</p>
        <p className={css.tag}>Tag: {note.tag}</p>
        <button className={css.closeBtn} onClick={() => router.back()}>
          Close
        </button>
      </div>
    </Modal>
  );
}
