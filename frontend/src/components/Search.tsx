import { TextInput } from "flowbite-react";
import React from "react";

interface SearchProps {
    onChange: (text: string) => void;
}

function Search({ onChange }: SearchProps) {

    return(
        <TextInput id="search" name="search" type="text" placeholder="Search"  onChange={(e) => onChange(e.target.value)}></TextInput>
    )
    
}

export default React.memo(Search);