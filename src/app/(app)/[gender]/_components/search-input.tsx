"use client";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export function SearchInput() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const q = searchParams.get("q") ?? "";

  const [value, setValue] = useState(q);

  useEffect(() => {
    setValue(q);
  }, [q]);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        router.push(`/search?q=${value}`);
      }}
    >
      <div className="relative w-full md:w-48 rounded-2xl border border-input focus-visible:ring focus-visible:ring-ring">
        <Search className="size-4 absolute left-2 top-1/2 -translate-y-1/2 pointer-events-none" />
        <Input
          placeholder="Search"
          name="q"
          required
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="border-none rounded-2xl w-full pl-10 focus-visible:ring-0"
        />
      </div>
    </form>
  );
}
