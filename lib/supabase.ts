import {createClient} from "@supabase/supabase-js";
import {auth} from "@clerk/nextjs/server";

export const createSupabaseClient = () => {
    return createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
            async accessToken() {
                try {
                    const authResult = await auth();
                    return authResult?.getToken() || null;
                } catch (error) {
                    // Return null if auth is not available (e.g., during static generation)
                    return null;
                }
            }
        }
    )
}