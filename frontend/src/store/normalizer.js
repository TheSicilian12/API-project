//normalizer (array to obj. uses id as the key for the obj)
// const state = {};

export default function normalizeIdArrToObj(array) {
    const newObj = {};
    array.map((e) => newObj[e.id] = e)
    return newObj;
};
