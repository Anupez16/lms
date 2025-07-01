"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn, getSubjectColor } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { BookmarkButton } from "@/components/BookmarkButton";

interface Companion {
  id: string;
  subject: string;
  name: string;
  topic: string;
  duration: number;
  color?: string;
  bookmarked?: boolean;
}

interface CompanionsListProps {
  title: string;
  companions?: Companion[];
  classNames?: string;
}

const CompanionsList = ({
  title,
  companions = [],
  classNames,
}: CompanionsListProps) => {
  const [uniqueCompanions, setUniqueCompanions] = useState<Companion[]>([]);

  useEffect(() => {
    const deduped = [...new Map(companions.map((c) => [c.id, c])).values()];
    setUniqueCompanions(deduped);

    const ids = companions.map((c) => c.id);
    const duplicates = ids.filter((id, index) => ids.indexOf(id) !== index);
    if (duplicates.length > 0) {
      console.warn("Duplicate companion IDs detected:", [...new Set(duplicates)]);
    }
  }, [companions]);

  return (
    <article className={cn("companion-list", classNames)}>
      <h2 className="font-bold text-3xl mb-4">{title}</h2>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-lg w-2/3">Lessons</TableHead>
            <TableHead className="text-lg">Subject</TableHead>
            <TableHead className="text-lg text-right">Duration</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {uniqueCompanions.map(({ id, subject, name, topic, duration, bookmarked }) => (
            <TableRow key={id}>
              <TableCell>
                <div className="flex items-center gap-2 justify-between">
                  <Link href={`/companions/${id}`} className="flex-1">
                    <div className="flex items-center gap-2">
                      <div
                        className="size-[72px] flex items-center justify-center rounded-lg max-md:hidden"
                        style={{ backgroundColor: getSubjectColor(subject) }}
                      >
                        <Image
                          src={`/icons/${subject}.svg`}
                          alt={subject}
                          width={35}
                          height={35}
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <p className="font-bold text-2xl">{name}</p>
                        <p className="text-lg text-muted-foreground">{topic}</p>
                      </div>
                    </div>
                  </Link>

                  <BookmarkButton
                    id={id}
                    initialBookmarked={bookmarked ?? false}
                    path="/my-journey"
                  />
                </div>
              </TableCell>

              <TableCell>
                <div className="subject-badge w-fit max-md:hidden">{subject}</div>
                <div
                  className="flex items-center justify-center rounded-lg w-fit p-2 md:hidden"
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
                  <p className="text-2xl">
                    {duration} <span className="max-md:hidden">mins</span>
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
  );
};

export default CompanionsList;
