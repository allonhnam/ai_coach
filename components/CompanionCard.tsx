import Image from "next/image";
import Link from "next/link";
import { memo } from "react";

interface CompanioCardProps {
    id: string;
    name: string;
    topic: string;
    subject: string;
    duration: number;
    color: string;
}

const CompanionCard = memo(({ id, name, topic, subject, duration, color }:
    CompanioCardProps) => {
    return (
        <article className="companion-card">
            <div className="h-1 w-10 rounded-full mb-1" style={{ backgroundColor: color }} />
            <div className="flex justify-between items-center">
                <div className="subject-badge" style={{ backgroundColor: color, color: '#050818' }}>{subject}</div>
                <div className="size-8 flex items-center justify-center rounded-full" style={{ backgroundColor: color + '33' }}>
                    <Image src={`/icons/${subject}.svg`} alt={subject} width={18} height={18} />
                </div>
            </div>

            <h2 className="text-xl font-semibold text-foreground">{name}</h2>
            <p className="text-sm text-muted-foreground">{topic}</p>
            <div  className="flex items-center gap-2">
                <Image
                    src="/icons/clock.svg"
                    alt="duration"
                    width={13.5}
                    height={13.5}
                />
                <p className="text-sm text-muted-foreground">{duration} mins</p>
            </div>

            <Link href={`/companions/${id}`} className="w-full">
                <button className="btn-primary w-full justify-center">
                    Launch Sentinel
                </button>
            </Link>

        </article>
    )
});

CompanionCard.displayName = 'CompanionCard';

export default CompanionCard