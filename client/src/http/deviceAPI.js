import { $authHost, $host } from "./index";

export const createType = async (type) => {
    const { data } = await $authHost.post('api/type', type)
    return data
}

export const fetchTypes = async () => {
    const { data } = await $host.get('api/type')
    return data
}

export const createBrand = async (brand, typeId) => {
    const { data } = await $authHost.post('api/breed', brand, typeId)
    return data
}

export const fetchBrands = async () => {
    const { data } = await $host.get('api/breed',)
    return data
}

export const fetchTyBrands = async (typeId) => {
    const { data } = await $host.get('api/breed/byType/' + typeId)
    return data
}

export const createCategory = async (category) => {
    const { data } = await $authHost.post('api/category', category)
    return data
}

export const fetchCategories = async () => {
    const { data } = await $host.get('api/category',)
    return data
}

export const createDevice = async (device) => {
    const { data } = await $authHost.post('api/animal', device)
    console.log(data)
    return data
}

export const fetchDevices = async (categoryId, typeId, breedId, page, limit = 5) => {
    const { data } = await $host.get('api/animal', {
        params: {
            categoryId, typeId, breedId, page, limit
        }
    })

    return data
}

export const fetchOneDevice = async (id) => {
    const { data } = await $host.get('api/animal/' + id)
    return data
}

export const fetchComments = async (id) => {
    const { data } = await $host.get('api/comment/' + id)
    console.log(data)
    return data
}

export const createComment = async (comment) => {
    const { data } = await $authHost.post('api/comment', comment)
    return data
}

