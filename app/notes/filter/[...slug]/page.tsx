import { fetchNotes } from '@/lib/api';
import NotesClient from './Notes.client';

export async function generateMetadata({ params }: Props) {
  const tag = (await params).slug?.[0] || 'All';
  const title = `Notes with tag: ${tag} - NoteHub`;
  const description = `View notes filtered by tag: ${tag}.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://your-deployed-url.vercel.app/notes/filter/${tag}`,
      images: ['https://ac.goit.global/fullstack/react/notehub-og-meta.jpg'],
    },
  };
}
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
  const res = await fetchNotes(1, safeTag === 'All' ? undefined : safeTag);
  const notes = res.data;

  return <NotesClient notes={notes} tag={safeTag} />;
}
