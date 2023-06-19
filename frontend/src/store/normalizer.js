//normalizer (array to obj. uses id as the key for the obj)
// const state = {};

export default function normalizeIdArrToObj(array) {
    // console.log('list: ', array)
    const newObj = {};
    array.map((e) => newObj[e.id] = e)
    // console.log('allGroups: ', allGroups)
    return newObj;
};
