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
        <article className="companion-card" style={{ borderColor: color }}>
            <div className="flex justify-between items-center">
                <div className="subject-badge" style={{ backgroundColor: color, color: '#050818' }}>{subject}</div>
                <div className="size-8 flex items-center justify-center" style={{ color: color }}>
                    <Image src={`/icons/${subject}.svg`} alt={subject} width={24} height={24} />
                </div>
            </div>

            <h2 className="text-2xl font-bold text-foreground">{name}</h2>
            <p className="text-sm text-foreground">{topic}</p>
            <div  className="flex items-center gap-2">
                <Image 
                    src="/icons/clock.svg" 
                    alt="duration"
                    width={13.5}
                    height={13.5}
                />
                <p className="text-sm text-foreground">{duration} mins</p>
            </div>

            <Link href={`/companions/${id}`} className="w-full">
                <button className="btn-primary w-full justify-center" style={{ backgroundColor: color, color: '#050818' }}>
                    Launch Sentinel
                </button>
            </Link>

        </article>
    )
});

CompanionCard.displayName = 'CompanionCard';

export default CompanionCard