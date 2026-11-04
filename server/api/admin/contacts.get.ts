import { getSupabaseAdmin, localContentOverrides } from '~/server/utils/admin'
import { eventConfig } from '~/config/event'

export default defineEventHandler(async () => {
  const supabase = getSupabaseAdmin()
  if (supabase) {
    try {
      const { data } = await supabase.from('contacts_social').select('*').eq('id', 'default').maybeSingle()
      if (data) return { data }
    } catch {}
  }

  const fallback = localContentOverrides['contacts'] || {
    id: 'default',
    messenger_url: eventConfig.contact.messengerUrl,
    facebook_url: eventConfig.contact.facebookUrl,
    facebook_page_name: eventConfig.contact.facebookPageName,
    instagram_url: eventConfig.contact.instagramUrl,
    instagram_handle: eventConfig.instagramHandle,
    micc_instagram_url: eventConfig.contact.miccInstagramUrl,
    micc_instagram_handle: eventConfig.contact.miccInstagramHandle,
    youtube_url: eventConfig.contact.youtubeUrl,
    youtube_handle: eventConfig.contact.youtubeHandle,
    email: eventConfig.contact.email,
    phone: eventConfig.contact.phone,
    display_phone: eventConfig.contact.displayPhone,
    connect_copy: eventConfig.connectCopy
  }

  return { data: fallback }
})

