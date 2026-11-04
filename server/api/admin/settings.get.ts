import { getSupabaseAdmin, localContentOverrides } from '~/server/utils/admin'
import { eventConfig } from '~/config/event'

export default defineEventHandler(async (event) => {
  const supabase = getSupabaseAdmin(event)
  if (supabase) {
    try {
      const { data } = await supabase.from('site_settings').select('*').eq('id', 'default').maybeSingle()
      if (data) return { data }
    } catch {}
  }

  const fallback = localContentOverrides['settings'] || {
    id: 'default',
    group_name: eventConfig.groupName,
    tagline: eventConfig.tagline,
    hashtag: eventConfig.hashtag,
    logo_url: eventConfig.logo,
    logo_alt: eventConfig.logoAlt,
    church_full_name: eventConfig.churchFullName,
    parent_church_name: eventConfig.parentChurchName,
    parent_region: eventConfig.parentRegion,
    sold_out_badge: eventConfig.soldOutBadge,
    about_church: eventConfig.aboutChurch,
    footer_blessing: 'May God bless and protect you and your loved ones this week. Wherever life finds you right now, remember that you have a seat at our table and brothers and sisters who care.',
    seo_title: eventConfig.seo.title,
    seo_description: eventConfig.seo.description,
    seo_og_image: eventConfig.seo.ogImage,
    canonical_url: eventConfig.seo.canonicalUrl,
    brand_colors: { primary: '#0F1B26', accent: '#F59E0B' }
  }

  return { data: fallback }
})

