import { getSupabaseAdmin, localContentOverrides } from '~/server/utils/admin'

const defaultGallery = [
  { id: '1', image_url: '/images/gallery-1.jpg', alt_text: 'Open Bible illuminated by gentle morning light', title: 'Truth & Direction', subtitle: 'Studying the scriptures together for real life guidance', span: 'col-span-1 md:col-span-2 aspect-[16/10]', sort_order: 1, published: true },
  { id: '2', image_url: '/images/gallery-3.jpg', alt_text: 'Friends enjoying conversations over coffee and snacks', title: 'Table Fellowship', subtitle: 'Deep laughter, coffee, and authentic friendships', span: 'col-span-1 md:col-span-1 aspect-[4/5]', sort_order: 2, published: true },
  { id: '3', image_url: '/images/gallery-4.jpg', alt_text: 'Hands held in prayer and mutual encouragement', title: 'Prayer & Brotherhood', subtitle: 'Standing together as disciples in every season', span: 'col-span-1 md:col-span-1 aspect-[4/5]', sort_order: 3, published: true },
  { id: '4', image_url: '/images/gallery-2.jpg', alt_text: 'Acoustic worship and heartfelt praise', title: 'Acoustic Fellowship', subtitle: 'Heartfelt songs of praise and quiet reflection', span: 'col-span-1 md:col-span-2 aspect-[16/10]', sort_order: 4, published: true },
  { id: '5', image_url: '/images/gallery-5.jpg', alt_text: 'Sunrise breaking over the horizon with hope', title: 'Fresh Hope', subtitle: 'Walking in the freedom and peace of Jesus', span: 'col-span-1 md:col-span-2 aspect-[16/10]', sort_order: 5, published: true },
  { id: '6', image_url: '/images/gallery-6.jpg', alt_text: 'Warm discipleship gathering around a table', title: 'Family in Christ', subtitle: 'A place where you belong from day one', span: 'col-span-1 md:col-span-1 aspect-[4/5]', sort_order: 6, published: true }
]

export default defineEventHandler(async (event) => {
  const supabase = getSupabaseAdmin(event)
  if (supabase) {
    try {
      const { data } = await supabase.from('gallery_images').select('*').order('sort_order', { ascending: true })
      if (data && data.length > 0) {
        return { data }
      }
    } catch {}
  }

  const fallback = localContentOverrides['gallery'] || defaultGallery
  return { data: fallback }
})

