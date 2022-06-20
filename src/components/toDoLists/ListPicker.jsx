import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleLeft } from "@fortawesome/free-solid-svg-icons";
import { faAngleDoubleRight } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";

const ListPicker = ({
  currentIndex,
  setCurrentIndex,
  listTitle,
  listLength,
}) => {
  const { t } = useTranslation("translation", { keyPrefix: "list_picker" });
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 10,
        minHeight: 80,
      }}
    >
      {listLength > 0 && (
        <FontAwesomeIcon
          icon={faAngleDoubleLeft}
          size={"2x"}
          onClick={() =>
            setCurrentIndex((oldIndex) =>
              currentIndex === 0 ? 0 : oldIndex - 1
            )
          }
          style={{ color: "var(--primary)" }}
        />
      )}
      <h4
        style={{
          marginLeft: 10,
          marginRight: 10,
          maxWidth: 350,
          minWidth: 350,
          userSelect: "none",
          color: "var(--primary)",
        }}
      >
        {listLength > 0 ? listTitle : t("fist_list")}
      </h4>
      {listLength > 0 && (
        <FontAwesomeIcon
          icon={faAngleDoubleRight}
          size={"2x"}
          onClick={() =>
            setCurrentIndex((oldIndex) =>
              currentIndex === listLength - 1 ? currentIndex : oldIndex + 1
            )
          }
          disabled={currentIndex === listLength - 1}
          style={{ color: "var(--primary)" }}
        />
      )}
    </div>
  );
};

export default ListPicker;
