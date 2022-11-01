import {makeAutoObservable} from "mobx";

export default class DeviceStore {
    constructor() {
        this._types = []
        this._brands = []
        this._categories = []
        this._devices = []
        this._selectedType = {}
        this._selectedBrand = {}
        this._selectedCategory = {}
        this._page = 1
        this._totalCount = 0
        this._limit = 5
        makeAutoObservable(this)
    }

    setTypes(types) {
        this._types = types
    }
    setBrands(brands) {
        this._brands = brands
    }
    setCategories(categories) {
        this._categories = categories
    }
    setDevices(devices) {
        this._devices = devices
    }

    setSelectedType(type) {
        this.setPage(1)
        this._selectedType = type
    }
    
    setSelectedBrand(brand) {
        this.setPage(1)
        this._selectedBrand = brand
    }

    setSelectedCategory(category) {
        this.setPage(1)
        this._selectedCategory = category
        console.log(category)
    }

    setPage(page) {
        this._page = page
    }
    setTotalCount(count) {
        this._totalCount = count
    }

    get types() {
        return this._types
    }
    get brands() {
        return this._brands
    }

    get categories() {
        return this._categories
    }

    get devices() {
        return this._devices
    }
    get selectedType() {
        return this._selectedType
    }
    get selectedBrand() {
        return this._selectedBrand
    }

    get selectedCategory() {
        return this._selectedCategory
    }

    get totalCount() {
        return this._totalCount
    }
    get page() {
        return this._page
    }
    get limit() {
        return this._limit
    }
}
