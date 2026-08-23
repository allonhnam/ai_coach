import {getCompanion} from "@/lib/actions/companion.actions";
import {currentUser} from "@clerk/nextjs/server";
import {redirect} from "next/navigation";
import {getSubjectColor} from "@/lib/utils";
import Image from "next/image";
import CompanionComponent from "@/components/CompanionComponent";

export const dynamic = 'force-dynamic';

interface CompanionSessionPageProps {
    params: Promise<{ id: string}>;
}

const CompanionSession = async ({ params }: CompanionSessionPageProps) => {
    const { id } = await params;
    const user = await currentUser();

    if(!user) redirect('/sign-in');

    const companion = await getCompanion(id);

    if(!companion) redirect('/companions');

    const { name, subject, topic, duration } = companion;

    if(!name) redirect('/companions')

    return (
        <main>
            <article className="flex rounded-border justify-between items-center p-6 max-md:flex-col max-md:items-start max-md:gap-4">
                <div className="flex items-center gap-3">
                    <div className="size-14 flex items-center justify-center rounded-lg max-md:hidden" style={{ backgroundColor: getSubjectColor(subject)}}>
                        <Image src={`/icons/${subject}.svg`} alt={subject} width={28} height={28} />
                    </div>

                    <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                            <p className="font-semibold text-xl text-foreground">
                                {name}
                            </p>
                            <div className="subject-badge max-sm:hidden">
                                {subject}
                            </div>
                        </div>
                        <p className="text-sm text-muted-foreground">{topic}</p>
                    </div>
                </div>
                <div className="items-start text-base font-medium max-md:hidden text-muted-foreground">
                    {duration} mins
                </div>
            </article>

            <CompanionComponent
                {...companion}
                companionId={id}
                userName={user.firstName!}
                userImage={user.imageUrl!}
            />
        </main>
    )
}

export default CompanionSession
