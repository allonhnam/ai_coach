import CompanionForm from "@/components/CompanionForm";
import {auth} from "@clerk/nextjs/server";
import {redirect} from "next/navigation";

export const dynamic = 'force-dynamic';

const NewCompanion = async () => {
    const { userId } = await auth();
    if(!userId) redirect('/sign-in');

    return (
        <main className="lg:w-1/3 md:w-2/3 items-center justify-center">
            <article className="w-full gap-6 flex flex-col max-w-2xl">
                <div className="mb-2">
                    <h1>Meet your new AI Coach</h1>
                    <p className="subtitle mt-2">Customize your AI Coach to match your learning style and goals</p>
                </div>

                <CompanionForm />
            </article>
        </main>
    )
}

export default NewCompanion
