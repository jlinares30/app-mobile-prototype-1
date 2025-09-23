import Ingredient from '../models/Ingredient.js'

export const getAllIngredients = async (req, res)=>{
    try {
        const ingredients = await Ingredient.find()
        res.status(200).json(ingredients);
    } catch (error) {
        res.status(500).json({message: 'Error fetching ingredients'})
    }
}
