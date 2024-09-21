"use client"
import React from "react";
import Finals from "../../Finals";
import { useParams } from "next/navigation";

function Page() {
    const { id } = useParams();

    const resolvedId = Array.isArray(id) ? id[0] : id;

    return (
        <div>
            <Finals id={resolvedId} />
        </div>
    );
}

export default Page;
