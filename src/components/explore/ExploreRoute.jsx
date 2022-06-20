import { useState } from "react";
import { Outlet } from "react-router-dom";

export default function ExploreRoute() {
    const [currentPage, setCurrentPage] = useState(1)
    return <Outlet context={[currentPage, setCurrentPage]} />
}