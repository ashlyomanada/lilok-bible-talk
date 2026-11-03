import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL || process.env.NUXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY

async function createAdmin() {
  const args = process.argv.slice(2)
  const emailArg = args.find(a => a.startsWith('--email='))?.split('=')[1]
  const passArg = args.find(a => a.startsWith('--password='))?.split('=')[1]

  const email = emailArg || process.env.ADMIN_EMAIL || 'admin@micc.church'
  const password = passArg || process.env.ADMIN_PASSWORD || 'LilokAdmin2026!'

  console.log(`🔐 Provisioning admin user: ${email}...`)

  if (!supabaseUrl || !supabaseServiceKey) {
    console.error('❌ Missing SUPABASE_URL or SUPABASE_SERVICE_KEY environment variables.')
    process.exit(1)
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey, {
    auth: { autoRefreshToken: false, persistSession: false }
  })

  // 1. Create or fetch user in auth.users
  const { data: userData, error: createError } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { full_name: 'Lilok Administrator' }
  })

  let userId: string | undefined

  if (createError) {
    if (createError.message.includes('already exists') || createError.message.includes('unique')) {
      console.log('ℹ️  User already exists in auth.users, looking up user ID...')
      const { data: usersData, error: listError } = await supabase.auth.admin.listUsers()
      if (listError) {
        console.error('Failed to list users:', listError.message)
        process.exit(1)
      }
      const existingUser = usersData.users.find(u => u.email === email)
      if (!existingUser) {
        console.error('Could not find existing user ID')
        process.exit(1)
      }
      userId = existingUser.id
    } else {
      console.error('❌ Failed to create user:', createError.message)
      process.exit(1)
    }
  } else {
    userId = userData.user.id
  }

  // 2. Ensure profile exists with role 'admin'
  const { error: profileError } = await supabase.from('profiles').upsert({
    id: userId,
    email,
    full_name: 'Lilok Administrator',
    role: 'admin'
  })

  if (profileError) {
    console.error('❌ Failed to assign admin role in profiles:', profileError.message)
    process.exit(1)
  }

  console.log(`✅ Admin user successfully created & assigned 'admin' role!`)
  console.log(`Email: ${email}`)
}

createAdmin().catch(console.error)

