import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"



class HousesService {
    async updateHouse(houseId, userId, houseData) {
        const houseToBeUpdated = await this.getHouseById(houseId)
        if (houseToBeUpdated.creatorId.toString() != userId) {
            throw new Forbidden('Like I said, do not try it. Seriously.')
        }
        houseToBeUpdated.bedrooms = houseData.bedrooms || houseToBeUpdated.bedrooms
        houseToBeUpdated.bathrooms = houseData.bathrooms || houseToBeUpdated.bathrooms
        houseToBeUpdated.price = houseData.price != undefined ? houseData.price : houseToBeUpdated.price
        await houseToBeUpdated.save()
        return houseToBeUpdated
    }
    async destroyHouse(houseId, userId) {
        const houseToBeDestroyed = await this.getHouseById(houseId)
        if (houseToBeDestroyed.creatorId.toString() != userId) {
            throw new Forbidden('Do not even try it')
        }
        await houseToBeDestroyed.remove()
        return houseToBeDestroyed
    }
    async getHouseById(houseId) {
        const house = await dbContext.Houses.findById(houseId)
        if (!house) {
            throw new BadRequest('this is not a valid id')
        }
        return house
    }
    async createHouse(houseData) {
        const house = await dbContext.Houses.create(houseData)
        return house
    }
    async getHouses() {
        const houses = await dbContext.Houses.find()
        return houses
    }

}

export const housesService = new HousesService()