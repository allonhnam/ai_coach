import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { cn, getSubjectColor } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface CompanionsListProps {
    title: string;
    companions?: Companion[];
    classNames?: string;
}

const CompanionsList = ({ title, companions, classNames }: CompanionsListProps) => {
    return (
        <article className={cn('companion-list', classNames)}>
            <h2 className="font-semibold text-xl text-foreground">{title}</h2>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-xs uppercase tracking-wide text-muted-foreground w-2/3">Lessons</TableHead>
                        <TableHead className="text-xs uppercase tracking-wide text-muted-foreground">Subject</TableHead>
                        <TableHead className="text-xs uppercase tracking-wide text-muted-foreground text-right">Duration</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {companions?.map(({ id, subject, name, topic, duration }) => (
                        <TableRow key={id}>
                            <TableCell>
                                <Link href={`/companions/${id}`}>
                                    <div className="flex items-center gap-3">
                                        <div className="size-14 flex items-center justify-center rounded-lg max-md:hidden"
                                            style={{ backgroundColor: getSubjectColor(subject) }}
                                        >
                                            <Image
                                                src={`/icons/${subject}.svg`}
                                                alt={subject}
                                                width={28}
                                                height={28}
                                            />
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <p className="font-semibold text-base text-foreground">
                                                {name}
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                {topic}
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            </TableCell>
                            <TableCell>
                                <div className="subject-badge w-fit">
                                    {subject}
                                </div>
                                <div className="flex items-center justify-center rounded-lg w-fit p-2 md:hidden"
                                    style={{ backgroundColor: getSubjectColor(subject) }}
                                >
                                    <Image
                                        src={`/icons/${subject}.svg`}
                                        alt={subject}
                                        width={18}
                                        height={18}
                                    />
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className="flex items-center gap-2 w-full justify-end">
                                    <p className="text-sm font-medium text-foreground">
                                        {duration} {' '}
                                        <span className="max-md:hidden text-muted-foreground font-normal">mins</span>
                                    </p>
                                    <Image
                                        src="/icons/clock.svg"
                                        alt="minutes"
                                        width={14}
                                        height={14}
                                        className="md:hidden"
                                    />

                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </article>
    )
}

export default CompanionsList