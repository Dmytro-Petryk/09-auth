import { fetchNotes } from '@/lib/api';
import NotesClient from './Notes.client';
type Props = {
  params: Promise<{ slug: string[] }>;
};
export default async function NotesPage({ params }: Props) {
  const slugArray = Array.isArray((await params).slug)
    ? (await params).slug
    : [];
  const tag = slugArray[0] ?? 'All';

  const validTags = ['All', 'Work', 'Personal', 'Shopping', 'Todo', 'Meeting'];
  const safeTag = validTags.includes(tag) ? tag : 'All';
  const res = await fetchNotes(
    1,
    '',
    100,
    safeTag === 'All' ? undefined : safeTag
  );
  const notes = res.data;

  return <NotesClient notes={notes} tag={safeTag} />;
}
