import { rootReducer } from '../services/store';
import { expect, test, describe, jest } from '@jest/globals';
import { BurgerConstructor } from '@components';
import {
  addIngredient,
  constructorSlice,
  moveIngredient,
  removeIngredient
} from '../services/slices/constructorSlice';
import { ingredientsSlice } from '../services/slices/ingredientsSlice';
import { fetchIngredients } from '../services/slices/ingredientsSlice';

export const mockIngredientsWithId = [
  {
    id: '1',
    _id: '61c0c5a71d1f82001bdaaa6d',
    name: 'Флюоресцентная булка R2-D3',
    type: 'bun',
    proteins: 44,
    fat: 26,
    carbohydrates: 85,
    calories: 643,
    price: 988,
    image: 'https://code.s3.yandex.net/react/code/bun-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png',
    __v: 0
  },
  {
    id: '2',
    _id: '61c0c5a71d1f82001bdaaa6f',
    name: 'Мясо бессмертных моллюсков Protostomia',
    type: 'main',
    proteins: 433,
    fat: 244,
    carbohydrates: 33,
    calories: 420,
    price: 1337,
    image: 'https://code.s3.yandex.net/react/code/meat-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-02-large.png',
    __v: 0
  },
  {
    id: '3',
    _id: '61c0c5a71d1f82001bdaaa70',
    name: 'Говяжий метеорит (отбивная)',
    type: 'main',
    proteins: 800,
    fat: 800,
    carbohydrates: 300,
    calories: 2674,
    price: 3000,
    image: 'https://code.s3.yandex.net/react/code/meat-04.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-04-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-04-large.png',
    __v: 0
  }
];

export const mockIngredients = [
  {
    _id: '61c0c5a71d1f82001bdaaa6d',
    name: 'Флюоресцентная булка R2-D3',
    type: 'bun',
    proteins: 44,
    fat: 26,
    carbohydrates: 85,
    calories: 643,
    price: 988,
    image: 'https://code.s3.yandex.net/react/code/bun-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png',
    __v: 0
  },
  {
    _id: '61c0c5a71d1f82001bdaaa6f',
    name: 'Мясо бессмертных моллюсков Protostomia',
    type: 'main',
    proteins: 433,
    fat: 244,
    carbohydrates: 33,
    calories: 420,
    price: 1337,
    image: 'https://code.s3.yandex.net/react/code/meat-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-02-large.png',
    __v: 0
  },
  {
    _id: '61c0c5a71d1f82001bdaaa70',
    name: 'Говяжий метеорит (отбивная)',
    type: 'main',
    proteins: 800,
    fat: 800,
    carbohydrates: 300,
    calories: 2674,
    price: 3000,
    image: 'https://code.s3.yandex.net/react/code/meat-04.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-04-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-04-large.png',
    __v: 0
  }
];

test('Проверка правильной инициализации rootReducer', () => {
  const state = rootReducer(undefined, { type: '@@INIT' });
  expect(state).toBeDefined();
});

describe('Проверка редьюсера слайса burgerConstructor', () => {
  const initialState = {
    bun: null,
    ingredients: mockIngredientsWithId
  };

  const ingredient = {
    _id: '61c0c5a71d1f82001bdaaa76',
    name: 'Хрустящие минеральные кольца',
    type: 'main',
    proteins: 808,
    fat: 689,
    carbohydrates: 609,
    calories: 986,
    price: 300,
    image: 'https://code.s3.yandex.net/react/code/mineral_rings.png',
    image_mobile:
      'https://code.s3.yandex.net/react/code/mineral_rings-mobile.png',
    image_large:
      'https://code.s3.yandex.net/react/code/mineral_rings-large.png',
    __v: 0
  };

  test('Обработка экшена добавления ингредиента', () => {
    const newState = constructorSlice.reducer(
      initialState,
      addIngredient(ingredient)
    );
    const { ingredients } = newState;
    expect(ingredients[ingredients.length - 1]).toMatchObject(ingredient);
    expect(ingredients[ingredients.length - 1]).toHaveProperty('id');
  });

  test('Обработка экшена удаления ингредиента', () => {
    const newState = constructorSlice.reducer(
      initialState,
      removeIngredient('1')
    );
    const { ingredients } = newState;
    expect(newState.ingredients).toHaveLength(2);
    expect(ingredients).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ id: '2' }),
        expect.objectContaining({ id: '3' })
      ])
    );
  });

  test('Обработка экшена изменения порядка ингредиентов в начинке', () => {
    const newState = constructorSlice.reducer(
      initialState,
      moveIngredient({ from: 0, to: 1 })
    );
    const { ingredients } = newState;
    expect(ingredients[0]).toMatchObject(mockIngredientsWithId[1]);
    expect(ingredients[1]).toMatchObject(mockIngredientsWithId[0]);
  });
});

describe('Проверка редьюсеров слайса ingredients', () => {
  test('Обработка fetchIngredients.pending', () => {
    const action = { type: fetchIngredients.pending.type };

    const state = ingredientsSlice.reducer(undefined, action);

    expect(state.isLoading).toBe(true);
  });

  test('Обработка fetchIngredients.fulfilled', () => {
    const action = {
      type: fetchIngredients.fulfilled.type,
      payload: mockIngredients
    };

    const state = ingredientsSlice.reducer(undefined, action);

    expect(state.isLoading).toBe(false);
    expect(state.data).toEqual(mockIngredients);
    expect(state.error).toBeNull();
  });

  test('Обработка fetchIngredients.rejected', () => {
    const mockError = {
      name: 'Error',
      message: 'Failed to fetch'
    };

    const action = {
      type: fetchIngredients.rejected.type,
      error: mockError
    };

    const state = ingredientsSlice.reducer(undefined, action);

    expect(state.isLoading).toBe(false);
    expect(state.error).toEqual(mockError);
  });
});
