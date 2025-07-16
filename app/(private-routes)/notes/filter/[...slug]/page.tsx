import type { Metadata } from 'next';
import { fetchNotes } from '@/lib/api/clientApi';
import NotesClient from './Notes.client';

type Props = {
  params: { slug?: string[] };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const tag = Array.isArray(params.slug) ? params.slug[0] : 'All';
  const title = `Notes with tag: ${tag} - NoteHub`;
  const description = `View notes filtered by tag: ${tag}.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://your-deployed-url.vercel.app/notes/filter/${tag}`,
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        },
      ],
    },
  };
}

export default async function NotesPage({ params }: Props) {
  const slugArray = Array.isArray(params.slug) ? params.slug : [];
  const tag = slugArray[0] ?? 'All';

  const validTags = ['All', 'Work', 'Personal', 'Shopping', 'Todo', 'Meeting'];
  const safeTag = validTags.includes(tag) ? tag : 'All';
  const res = await fetchNotes(1, safeTag === 'All' ? undefined : safeTag);
  const notes = res.data;

  return <NotesClient notes={notes} tag={safeTag} />;
}
