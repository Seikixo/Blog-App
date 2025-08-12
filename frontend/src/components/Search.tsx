import { TextInput } from "flowbite-react";
import React from "react";
import { HiMagnifyingGlass } from "react-icons/hi2";

interface SearchProps {
    onChange: (text: string) => void;
}

function Search({ onChange }: SearchProps) {

    return(
        <TextInput id="search" icon={HiMagnifyingGlass} name="search" type="text" placeholder="Search"  onChange={(e) => onChange(e.target.value)}></TextInput>
    )
    
}

export default React.memo(Search);