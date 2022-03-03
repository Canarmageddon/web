import Autosuggest from "react-autosuggest/dist/Autosuggest";
import { useState } from "react";



function DestinationInput({ addLocation }) {
    const [value, setValue] = useState("")
    const [suggestions, setSuggestions] = useState([])
    function escapeRegexCharacters(str) {
        return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    const getSuggestions = async (value) => {
        const escapedValue = escapeRegexCharacters(value.trim());

        if (escapedValue === '') {
            return [];
        }

        const des = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${value}.json?access_token=pk.eyJ1IjoiYXNsbmRza3ZucWRvZm1uIiwiYSI6ImNreWJyN3VkZzBpNnUydm4wcnJ5MmdvYm0ifQ.YNwpI3-HgF6nMhdaRRkKBg`).then(res => res.json())
        let lstPlace = []
        des.features.map(f => {
            lstPlace = [...lstPlace, f.place_name]
        })
        console.log(lstPlace)
        return lstPlace;
    }

    function getSuggestionValue(suggestion) {
        return suggestion;
    }

    function renderSuggestion(suggestion) {
        return (
            <span>{suggestion}</span>
        );
    }
    const onChange = (event, { newValue, method }) => {
        setValue(newValue)
    };

    const onSuggestionsFetchRequested = async ({ value }) => {

        setSuggestions(await getSuggestions(value))
    };

    const onSuggestionsClearRequested = () => {
        setSuggestions([])
    };


    const inputProps = {
        placeholder: "Entrez une destination",
        value,
        onChange
    };
    const handleClick = () => {
        addLocation(value)
        setValue("")
    }
    return (<>
        <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={onSuggestionsFetchRequested}
            onSuggestionsClearRequested={onSuggestionsClearRequested}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            inputProps={inputProps} />
        <button onClick={handleClick}>search</button>

    </>
    );

}

export default DestinationInput