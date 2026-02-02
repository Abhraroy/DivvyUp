import { NextResponse } from 'next/server'
// The client you created from the Server-Side Auth instructions
import { createClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  // if "next" is in param, use it as the redirect URL
  let next = searchParams.get('next') ?? '/'
  if (!next.startsWith('/')) {
    // if "next" is not a relative URL, use the default
    next = '/'
  }

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {

      const {data:{user},error} = await supabase.auth.getUser()
      if(user?.role !== "authenticated"){
        await supabase.auth.signOut()
        return NextResponse.redirect(`${origin}/signin`)
      }

      const {data:profile,error:profileError} = await supabase.from("profiles")
      .select("first_time")
      .eq("user_id",user.id)
      .single()

      let redirectPath = '/console'

      if (!profile) {
        const {data:newProfile,error:newProfileError} = await supabase.from('profiles').insert({
          user_id: user.id,
          name:user.user_metadata.full_name,
          email: user.email,
          first_time: true,
        }).select()
        console.log(newProfile)
        if(!newProfile && newProfileError){
          console.log(newProfileError)
          return NextResponse.redirect(`${origin}/signin`)
        }
        redirectPath = '/console'
      }

      if(profile?.first_time){
        redirectPath = '/console'
      }


      const forwardedHost = request.headers.get('x-forwarded-host') // original origin before load balancer
      const isLocalEnv = process.env.NODE_ENV === 'development'
      if (isLocalEnv) {
        // we can be sure that there is no load balancer in between, so no need to watch for X-Forwarded-Host
        return NextResponse.redirect(`${origin}${redirectPath}`)
      } else if (forwardedHost) {
        return NextResponse.redirect(`https://${forwardedHost}${redirectPath}`)
      } else {
        return NextResponse.redirect(`${origin}${redirectPath}`)
      }
    }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/auth/auth-code-error`)
}