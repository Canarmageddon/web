import { useEffect } from "react";
import { useQuery } from "react-query";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { checkLink } from "../../apiCaller";

export default function CheckLink() {
    const navigate = useNavigate()
    const { id, link } = useParams()
    const { isLoading } = useQuery(["unregistered", id, link], () => checkLink(id, link), {
        retry: false,
        onError: () => {
            navigate("/")
        },
    })
    if (isLoading) return <p>Loading</p>
    return <Outlet />
}