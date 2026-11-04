import { getSupabaseAdmin, localContentOverrides } from '~/server/utils/admin'

const defaultCards = [
  { id: '1', card_id: 'come-as-you-are', title: 'Come As You Are', tagline: 'No dress codes, no expectations', description: 'Wear whatever you feel comfortable in. Whether it is casual t-shirts and jeans or work attire, you are welcomed warmly just the way you are.', icon: 'heart', badge: 'Everyone Welcome', span: 'col-span-1 md:col-span-2', sort_order: 1, published: true },
  { id: '2', card_id: 'free', title: '100% Free', tagline: 'Always our guest', description: 'No entrance fees, no hidden obligations, and no financial collections or tithes requested from our guests. Ever.', icon: 'sparkles', badge: 'Zero Cost', span: 'col-span-1', sort_order: 2, published: true },
  { id: '3', card_id: 'bring-friend', title: 'Bring a Friend', tagline: 'Faith is better together', description: 'Invite your friends, campus classmates, colleagues, or family. The more, the merrier at our table!', icon: 'users', badge: 'Plus Ones Encouraged', span: 'col-span-1', sort_order: 3, published: true },
  { id: '4', card_id: 'food-fellowship', title: 'Food & Fellowship', tagline: 'Great food, great people', description: 'Enjoy delicious refreshments, light snacks, coffee, and plenty of laughs and genuine conversation after our discussion.', icon: 'coffee', badge: 'Complimentary Treats', span: 'col-span-1 md:col-span-2', sort_order: 4, published: true },
  { id: '5', card_id: 'uplifting-message', title: 'Uplifting Message', tagline: 'Real answers for real life', description: 'A practical, encouraging look at God’s Word tailored for everyday struggles, healing, purpose, and peace.', icon: 'book-open', badge: 'Practical Scripture', span: 'col-span-1', sort_order: 5, published: true },
  { id: '6', card_id: 'open-discussion', title: 'Open Bible Discussion', tagline: 'Ask questions freely', description: 'A relaxed circle where curiosities, questions, and personal thoughts are valued and respectfully explored.', icon: 'messages-square', badge: 'Interactive', span: 'col-span-1', sort_order: 6, published: true }
]

export default defineEventHandler(async () => {
  const supabase = getSupabaseAdmin(event)
  if (supabase) {
    try {
      const { data } = await supabase.from('expect_cards').select('*').order('sort_order', { ascending: true })
      if (data && data.length > 0) {
        return { data }
      }
    } catch {}
  }

  const fallback = localContentOverrides['expect_cards'] || defaultCards
  return { data: fallback }
})

