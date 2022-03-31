import Autosuggest from "react-autosuggest/dist/Autosuggest";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";

function DestinationInput({}) {
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  function escapeRegexCharacters(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  const getSuggestions = async (value) => {
    const escapedValue = escapeRegexCharacters(value.trim());

    if (escapedValue === "") {
      return [];
    }

    const des = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${value}.json?access_token=pk.eyJ1IjoiYXNsbmRza3ZucWRvZm1uIiwiYSI6ImNreWJyN3VkZzBpNnUydm4wcnJ5MmdvYm0ifQ.YNwpI3-HgF6nMhdaRRkKBg`
    ).then((res) => res.json());
    let lstPlace = [];
    des.features.map((f) => {
      lstPlace = [...lstPlace, f.place_name];
    });
    return lstPlace;
  };

  function getSuggestionValue(suggestion) {
    return suggestion;
  }

  function renderSuggestion(suggestion) {
    return <span>{suggestion}</span>;
  }
  const onChange = (event, { newValue, method }) => {
    setValue(newValue);
  };

  const onSuggestionsFetchRequested = async ({ value }) => {
    setSuggestions(await getSuggestions(value));
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const inputProps = {
    placeholder: "Entrez une destination",
    value,
    onChange,
  };

  return (
    <div style={{ display: "flex", flexDirection: "row", marginTop: 5 }}>
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
      />
      <FontAwesomeIcon
        icon={faPlusCircle}
        size="2x"
        onClick={() => goTo(value)}
        style={{ color: "#0d6efd", marginLeft: 5 }}
      />
    </div>
  );
}

export default DestinationInput;
