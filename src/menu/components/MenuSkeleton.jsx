import { Skeleton } from "@mui/material";
import React from "react";

export default function MenuSkeleton({height}) {
    return (
        <Skeleton
        animation="wave"
        height={height}
        style={{ marginBottom: 6 }}
      />
    )
}