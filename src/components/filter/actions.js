import { FILTER_TYPES} from "./actiionTypes";

export function getFilterData(data) {
    return {
        type: FILTER_TYPES.GET_FILTERS_DATA,
        filters: data
    }
}