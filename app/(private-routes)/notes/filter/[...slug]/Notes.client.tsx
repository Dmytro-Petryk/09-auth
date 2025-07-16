'use client';
import { useQuery } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api/clientApi';
import NoteList from '@/components/NoteList/NoteList';
import Pagination from '@/components/Pagination/Pagination';
import SearchBox from '@/components/SearchBox/SearchBox';
import { Note } from '@/types/note';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

interface NotesClientProps {
  notes: Note[];
  tag?: string;
}

export default function NotesClient({ notes, tag }: NotesClientProps) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');

  const debouncedSearch = useDebounce(search, 300);

  const { data, isLoading, error } = useQuery<{
    notes: Note[];
    totalPages: number;
  }>({
    queryKey: ['notes', page, debouncedSearch, tag],
    queryFn: async () => {
      const currentTag = tag === 'All' ? undefined : tag;
      const result = await fetchNotes(page, currentTag, debouncedSearch);
      return {
        notes: result.notes,
        totalPages: result.totalPages,
      };
    },
    initialData: {
      notes: notes || [],
      totalPages: notes?.length ? Math.ceil(notes.length / 12) : 1,
    },
  });

  const handleSearchChange = (value: string) => {
    setPage(1);
    setSearch(value);
  };

  return (
    <>
      <SearchBox value={search} onChange={handleSearchChange} />
      <Link href="/notes/action/create">+ Create note</Link>
      {isLoading && <p>Loading, please wait...</p>}
      {error && <p>Something went wrong.</p>}
      {!isLoading && !error && (
        <>
          {Array.isArray(data?.notes) && data.notes.length > 0 && (
            <NoteList notes={data.notes} />
          )}
          {(data?.totalPages ?? 0) > 1 && (
            <Pagination
              currentPage={page}
              totalPages={data.totalPages}
              onPageChange={setPage}
            />
          )}
        </>
      )}
    </>
  );
}
