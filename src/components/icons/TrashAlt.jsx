import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

export default function TrashAlt(handleDelete, data) {
    return <FontAwesomeIcon
        icon={faTrashAlt}
        size="2x"
        onClick={(e) => handleDelete(e, data)}
        style={{
            color: "#dc3545",
            cursor: "pointer",
        }}
    />
}