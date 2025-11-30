import CompanionForm from "@/components/CompanionForm";
import {auth} from "@clerk/nextjs/server";
import {redirect} from "next/navigation";
import {newCompanionPermissions} from "@/lib/actions/companion.actions";
import Image from "next/image";
import Link from "next/link";

const NewCompanion = async () => {
    const { userId } = await auth();
    if(!userId) redirect('/sign-in');

    const canCreateCompanion = await newCompanionPermissions();

    return (
        <main className="min-lg:w-1/3 min-md:w-2/3 items-center justify-center">
            {canCreateCompanion ? (
                <article className="w-full gap-6 flex flex-col max-w-2xl">
                    <div className="mb-2">
                        <h1>Create Your Learning Companion</h1>
                        <p className="subtitle mt-2">Customize your AI tutor to match your learning style and goals</p>
                    </div>

                    <CompanionForm />
                </article>
                ) : (
                    <article className="companion-limit">
                        <Image src="/images/limit.svg" alt="Companion limit reached" width={360} height={230} />
                        <div className="cta-badge">
                            Upgrade your plan
                        </div>
                        <h1>You've Reached Your Companion Limit</h1>
                        <p className="text-foreground/80">Unlock unlimited companions and access premium features to enhance your learning experience.</p>
                        <Link href="/subscription" className="btn-primary w-full justify-center mt-4" >
                            Upgrade My Plan
                        </Link>
                    </article>
                )}
        </main>
    )
}

export default NewCompanion
