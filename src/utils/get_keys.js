import getDictionary from "./get_dictionary";

const getKeys = async () => {
    const dictionary = await getDictionary();
    if (Object.keys(dictionary).length !== 0) {
        return Object.keys(dictionary);
    }
    else {
        return [];
    }
}

export default getKeys;