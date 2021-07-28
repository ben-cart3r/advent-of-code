import { difference, intersect, union, unique} from "../helpers";

type Food = {
    ingredients: Array<string>
    allergens: Array<string>
}

const parse = (input: string): Array<Food> => {
    return input.split("\n").map((food) => {
        const [ingredients, allergens] = food.split(" (contains ");

        return {
            ingredients: ingredients.split(" "),
            allergens: allergens.substr(0, allergens.length - 1).split(", ")
        }
    });
};

const getUniqueAllergens = (foods: Array<Food>): Array<string> => {
    return unique(foods.reduce((acc, food) => [...acc, ...food.allergens], []));
}

const getAllIngredients = (foods: Array<Food>): Array<string> => {
    return foods.reduce((acc, food) => [...acc, ...food.ingredients], []);
}

const getHarmfulIngredients = (foods: Array<Food>, allergens: Array<string>): Array<string> => {
    let potentiallyHarmful = allergens.map((allergen) => {
        return foods.reduce((acc, food) => {
            if (food.allergens.includes(allergen)) {
                if (acc == null) {
                    acc = new Set(food.ingredients);
                }
                else {
                    acc = intersect(acc, new Set(food.ingredients));
                }
            }
            return acc;
        }, null as Set<string>); 
    });

    for (let i = 0; i < potentiallyHarmful.length; ++i) {
        if ([...potentiallyHarmful[i]].length == 1) {
            potentiallyHarmful = potentiallyHarmful.map((s, j) => {
                if (i == j) {
                    return s;
                }
                else {
                    return difference(s, potentiallyHarmful[i]);
                }
            });
        }
    }    

    const harmfulIngredients = union(...potentiallyHarmful);

    return [...harmfulIngredients];
}

const solver1 = (input: string): number => {

    const foods = parse(input);
    const uniqueAllergens = getUniqueAllergens(foods);
    const allIngredients = getAllIngredients(foods);

    let potentialIngredients = uniqueAllergens.map((allergen) => {
        return foods.reduce((acc, food) => {
            if (food.allergens.includes(allergen)) {
                if (acc == null) {
                    acc = new Set(food.ingredients);
                }
                else {
                    acc = intersect(acc, new Set(food.ingredients));
                }
            }
            return acc;
        }, null as Set<string>)
    });

    for (let i = 0; i < potentialIngredients.length; ++i) {
        if ([...potentialIngredients[i]].length == 1) {
            potentialIngredients = potentialIngredients.map((s, j) => {
                if (i == j) {
                    return s;
                }
                else {
                    return difference(s, potentialIngredients[i]);
                }
            });
        }
    }    

    const harmfulIngredients = union(...potentialIngredients);
    const result = allIngredients.filter((item) => !harmfulIngredients.has(item)).length;

   return result;
}

const solver2 = (input: string): string => {

    const foods = parse(input);
    const uniqueAllergens = getUniqueAllergens(foods);
    const harmfulIngredients = getHarmfulIngredients(foods, uniqueAllergens);

    const allegrenIngredientMap = uniqueAllergens.map((allergen, i) => ({
        allergen,
        ingredient: harmfulIngredients[i]
    }));

    allegrenIngredientMap.sort((a, b) => {
        return a.allergen > b.allergen ? 1 : b.allergen > a.allergen ? -1 : 0;
    });

    const result = allegrenIngredientMap.map((a) => a.ingredient).join(",");

    return result;
}

export { solver1, solver2 };

export default (input: string): string => {
    const result1 = solver1(input);
    const result2 = solver2(input);

    return `\t Part 1 result: ${result1}
    \t Part 2 result: ${result2}`;
};