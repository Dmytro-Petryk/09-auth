import { fetchNotes } from '@/lib/api';
import NotesClient from './Notes.client';

export default async function NotesPage({
  params,
}: {
  params: { slug?: string[] };
}) {
  const slugArray = params?.slug ?? [];
  const tag = slugArray[0] ?? 'All';

  const validTags = ['All', 'Work', 'Personal', 'Shopping', 'Todo', 'Meeting'];
  const safeTag = validTags.includes(tag) ? tag : 'All';

  const res = await fetchNotes(1, '', 100, safeTag);
  const notes = res.data;

  return <NotesClient notes={notes} tag={safeTag} />;
}
