import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import FormControl from "react-bootstrap/FormControl";
import { useToken } from "../../context/userContext";
import { useUser } from "../../context/userContext";
import "../../style/profile.css";
import { fetchUser, updateUser } from "../../apiCaller";
import { toast } from "react-toastify";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Profile = () => {
    const { t } = useTranslation("translation",);
    const navigate = useNavigate();
    const [token, setToken] = useToken();
    const [user, setUser] = useUser();
    const [firstName, setFName] = useState("");
    const [lastName, setLName] = useState("");
    const [password, setPassword] = useState("");

    const queryClient = useQueryClient();
    const { isLoading: isLoadingUser, data: dataUser, } = useQuery(
        "user",
        () => fetchUser({ token, id: user }),
        {
            staleTime: 60 * 1000,
            onSettled: (data) => {
                setFName(data.firstName);
                setLName(data.lastName);
            },
        }
    );
    useEffect(() => {
        if (dataUser !== undefined) {
            setFName(dataUser.firstName);
            setLName(dataUser.lastName);
        }
    }, []);
    const mutationEditUser = useMutation(updateUser, {
        onSettled: () => {
            queryClient.invalidateQueries("user");
        },
        onSuccess: () => {
            toast.success(t(edit_user("success")))
        },
        onError: () => {
            toast.warning("Erreur s'est produit")
        }
    });

    const handleUpdate = async (event, t) => {
        mutationEditUser.mutate({ token, id: user, firstName, lastName });
    };



    return (
        <form>
            <h1 className="h1">{t("edit_user.profil")}</h1>
            <hr style={{ marginBottom: 5 + "px" }} />
            <div
                style={{
                    position: "relative",
                    display: "flex",
                    flexDirection: "column",
                }}
            >

                <label htmlFor="firstName" style={{ fontSize: 15 }}>
                    {t("create_account.first_name")}
                </label>
                <FormControl
                    value={firstName}
                    onChange={(e) => setFName(e.target.value)}
                    type="text"
                />
            </div>
            <div
                style={{
                    position: "relative",
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <label htmlFor="lastName" style={{ fontSize: 15 }}>
                    {t("create_account.last_name")}
                </label>
                <FormControl
                    value={lastName}
                    onChange={(e) => setLName(e.target.value)}
                    type="text"
                />
            </div>
            <hr style={{ marginBottom: 5 + "px" }} />
            <Button onClick={handleUpdate} style={{ backgroundColor: "#c50000" }}>{t("edit_user.edit")}</Button>
            <Button onClick={() => navigate(-1)} style={{ marginLeft: "5px" }}>{t("edit_user.back")}</Button>
        </form>

    )
}

export default Profile;