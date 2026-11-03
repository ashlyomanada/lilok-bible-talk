-- Supabase Seed Data for Lilok Bible Talk
-- Populated from existing config/event.ts and component templates

-- 1. SITE SETTINGS
INSERT INTO public.site_settings (
  id, group_name, tagline, hashtag, logo_url, logo_alt,
  church_full_name, parent_church_name, parent_region, sold_out_badge,
  about_church, footer_blessing, seo_title, seo_description, seo_og_image, canonical_url
) VALUES (
  'default',
  'Lilok Bible Talk',
  'Welcome to the family.',
  '#AngSarapMagingDisciple',
  '/images/mnl-logo.png',
  'Manila International Christian Church MNL logo',
  'Metro Manila International Christian Church (MMICC)',
  'Manila International Christian Church (MICC)',
  'Central Region',
  'A Member of the Soldout Family of Churches',
  'Welcome to the Metro Manila International Christian Church. We are part of a worldwide movement of sold-out disciples with the vision to evangelize the nations in this generation.',
  'May God bless and protect you and your loved ones this week. Wherever life finds you right now, remember that you have a seat at our table and brothers and sisters who care.',
  'You''re invited to Lilok Bible Talk | MICC Central Region',
  'You''re warmly invited to Lilok Bible Talk every Thursday! Friendly community, open Bible discussion, uplifting message, and food & fellowship. Manila International Christian Church (MICC) Central Region. Welcome to the family.',
  '/images/mnl-logo.png',
  'https://micc.church'
) ON CONFLICT (id) DO UPDATE SET
  group_name = EXCLUDED.group_name,
  tagline = EXCLUDED.tagline,
  hashtag = EXCLUDED.hashtag,
  updated_at = NOW();

-- 2. EVENTS
INSERT INTO public.events (
  id, title, subtitle, one_line_welcome, no_pressure_line, reassurance_chips,
  recurrence_weekday, recurrence_hour, recurrence_minute, recurrence_duration_minutes, recurrence_timezone,
  doors_open_time, venue_name, venue_room, venue_address, venue_city_state_zip, venue_map_url, venue_notes,
  speaker_name, speaker_title, speaker_bio, countdown_enabled
) VALUES (
  'current',
  'Come as You Are',
  'An open, heartwarming evening of real conversations, uplifting scripture, friendly community, and delicious treats.',
  'No matter who you are or where you are in life, you have a seat at our table.',
  'No pressure, just come as you are.',
  '["Free", "All are welcome", "Bring a friend", "Come as you are"]'::jsonb,
  4, 19, 0, 180, 'Asia/Manila',
  '6:30 PM',
  'YMCA Makati',
  'Main Gathering Area',
  'Bonifacio Global City / Makati area (Exact venue TBA)',
  'Metro Manila, Philippines',
  'https://maps.google.com/?q=Metro+Manila+Philippines',
  'Location announced in our group chat and Instagram stories. Message @lilok.bt or chat with us on Messenger for exact landmark and parking directions!',
  'Lilok Bible Talk Leaders & Friends',
  'Central Region Disciples',
  'Young professionals, students, and disciple leaders sharing real stories of life transformation, faith, and unconditional family.',
  true
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  updated_at = NOW();

-- 3. CONTACTS & SOCIAL
INSERT INTO public.contacts_social (
  id, messenger_url, facebook_url, facebook_page_name,
  instagram_url, instagram_handle, micc_instagram_url, micc_instagram_handle,
  youtube_url, youtube_handle, email, phone, display_phone, connect_copy
) VALUES (
  'default',
  'https://m.me/manilaicc',
  'https://www.facebook.com/manilaicc',
  'facebook.com/manilaicc',
  'https://instagram.com/lilok.bt',
  '@lilok.bt',
  'https://instagram.com/manilaicc',
  '@manilaicc',
  'https://youtube.com/@ManilaICC',
  '@ManilaICC',
  'central@micc.church',
  '+639000000000',
  '+63 (TBA)',
  'Get in touch for worship services, Bible studies, baptism, or any questions you may have.'
) ON CONFLICT (id) DO UPDATE SET
  messenger_url = EXCLUDED.messenger_url,
  updated_at = NOW();

-- 4. SUNDAY SERVICES
INSERT INTO public.sunday_services (
  id, day_and_time, title, message, note, messenger_url
) VALUES (
  'default',
  'Every Sunday at 10:00 AM',
  'MICC Sunday Worship Service',
  'Worship with us every Sunday! Send us a message and we will connect you to the location nearest you.',
  'Locations change periodically as our ministries expand. Message us anytime for current Sunday service venues and rideshares!',
  'https://m.me/manilaicc'
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  updated_at = NOW();

-- 5. SUNDAY VENUES
DELETE FROM public.sunday_venues;
INSERT INTO public.sunday_venues (city, venue_name, address, status, notes, sort_order, published)
VALUES
  ('Makati', 'Central Makati Service (TBA)', 'Makati Central Business District, Metro Manila', 'TBA', 'Contact us via Messenger for current hall details and Sunday parking info.', 1, true),
  ('Taguig / BGC', 'Taguig & BGC Fellowship (TBA)', 'Bonifacio Global City, Taguig, Metro Manila', 'TBA', 'Accessible by BGC Bus and ride-hailing services. Message for room number.', 2, true),
  ('Muntinlupa', 'Muntinlupa / Alabang Gathering (TBA)', 'Alabang, Muntinlupa City, Metro Manila', 'TBA', 'Serving South Metro Manila disciples and guests.', 3, true);

-- 6. HOMEPAGE SECTIONS
INSERT INTO public.sections (id, name, title, subtitle, sort_order, is_visible)
VALUES
  ('hero', 'Hero Banner', 'Lilok Bible Talk', 'Come as You Are', 1, true),
  ('countdown', 'Countdown Strip', 'Countdown', 'Next Session Countdown', 2, true),
  ('welcome', 'Warm Welcome', 'Welcome to the Family', 'About Lilok BT', 3, true),
  ('expect', 'What to Expect', 'What to Expect', 'Practical & Warm', 4, true),
  ('verse', 'Scripture Highlight', 'Scripture Highlight', 'Matthew 11:28–29', 5, true),
  ('details', 'Event Details', 'Event Details', 'Ticket & Directions', 6, true),
  ('sunday', 'Sunday Worship', 'Join Us on Sunday', '10AM Every Sunday', 7, true),
  ('gallery', 'Photo Gallery', 'Moments of Grace', 'Austin Stone Editorial Grid', 8, true),
  ('share', 'Bring a Friend', 'Share the Invitation', 'Bring a Friend Band', 9, true),
  ('upload', 'Share Your Moment', 'Share Your Moment', 'Photo & Story Upload', 10, true),
  ('connect', 'Connect With Us', 'Connect With Us', 'Big Stacked Link Rows', 11, true)
ON CONFLICT (id) DO UPDATE SET
  sort_order = EXCLUDED.sort_order,
  is_visible = EXCLUDED.is_visible;

-- 7. EXPECT CARDS (Bento Grid)
DELETE FROM public.expect_cards;
INSERT INTO public.expect_cards (card_id, title, tagline, description, icon, badge, span, sort_order, published)
VALUES
  ('come-as-you-are', 'Come As You Are', 'No dress codes, no expectations', 'Wear whatever you feel comfortable in. Whether it is casual t-shirts and jeans or work attire, you are welcomed warmly just the way you are.', 'heart', 'Everyone Welcome', 'col-span-1 md:col-span-2', 1, true),
  ('free', '100% Free', 'Always our guest', 'No entrance fees, no hidden obligations, and no financial collections or tithes requested from our guests. Ever.', 'sparkles', 'Zero Cost', 'col-span-1', 2, true),
  ('bring-friend', 'Bring a Friend', 'Faith is better together', 'Invite your friends, campus classmates, colleagues, or family. The more, the merrier at our table!', 'users', 'Plus Ones Encouraged', 'col-span-1', 3, true),
  ('food-fellowship', 'Food & Fellowship', 'Great food, great people', 'Enjoy delicious refreshments, light snacks, coffee, and plenty of laughs and genuine conversation after our discussion.', 'coffee', 'Complimentary Treats', 'col-span-1 md:col-span-2', 4, true),
  ('uplifting-message', 'Uplifting Message', 'Real answers for real life', 'A practical, encouraging look at God’s Word tailored for everyday struggles, healing, purpose, and peace.', 'book-open', 'Practical Scripture', 'col-span-1', 5, true),
  ('open-discussion', 'Open Bible Discussion', 'Ask questions freely', 'A relaxed circle where curiosities, questions, and personal thoughts are valued and respectfully explored.', 'messages-square', 'Interactive', 'col-span-1', 6, true);

-- 8. VERSE
INSERT INTO public.verse (id, text, reference, translation, reflection_note)
VALUES (
  'default',
  '“Come to me, all you who are weary and burdened, and I will give you rest. Take my yoke upon you and learn from me, for I am gentle and humble in heart, and you will find rest for your souls.”',
  'Matthew 11:28–29',
  'NIV',
  'No matter how heavy your week has been, you can find genuine rest, true brothers and sisters, and peace in Christ.'
) ON CONFLICT (id) DO UPDATE SET
  text = EXCLUDED.text,
  updated_at = NOW();

-- 9. GALLERY IMAGES
DELETE FROM public.gallery_images;
INSERT INTO public.gallery_images (image_url, alt_text, title, subtitle, span, sort_order, published)
VALUES
  ('/images/gallery-1.jpg', 'Open Bible illuminated by gentle morning light', 'Truth & Direction', 'Studying the scriptures together for real life guidance', 'col-span-1 md:col-span-2 aspect-[16/10]', 1, true),
  ('/images/gallery-3.jpg', 'Friends enjoying conversations over coffee and snacks', 'Table Fellowship', 'Deep laughter, coffee, and authentic friendships', 'col-span-1 md:col-span-1 aspect-[4/5]', 2, true),
  ('/images/gallery-4.jpg', 'Hands held in prayer and mutual encouragement', 'Prayer & Brotherhood', 'Standing together as disciples in every season', 'col-span-1 md:col-span-1 aspect-[4/5]', 3, true),
  ('/images/gallery-2.jpg', 'Acoustic worship and heartfelt praise', 'Acoustic Fellowship', 'Heartfelt songs of praise and quiet reflection', 'col-span-1 md:col-span-2 aspect-[16/10]', 4, true),
  ('/images/gallery-5.jpg', 'Sunrise breaking over the horizon with hope', 'Fresh Hope', 'Walking in the freedom and peace of Jesus', 'col-span-1 md:col-span-2 aspect-[16/10]', 5, true),
  ('/images/gallery-6.jpg', 'Warm discipleship gathering around a table', 'Family in Christ', 'A place where you belong from day one', 'col-span-1 md:col-span-1 aspect-[4/5]', 6, true);

