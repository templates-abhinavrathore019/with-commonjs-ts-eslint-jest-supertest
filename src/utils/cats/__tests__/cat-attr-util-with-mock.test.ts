// should be at top
jest.mock('../attr-parser', () => {
  const originalModule = jest.requireActual('../attr-parser');

  return {
    ...originalModule,
    parseAffectionLevel: jest.fn(() => {
      // redefining because mock cannot access outside variable
      return 'jest.mock: CAT';
    }),
  };
});

import { parseCatAttributes } from '../attr-util';

describe('cat_attrs_with(jest-mock)', () => {
  const catStarsAvailable = {
    affection_level: 1,
    adaptability: 4,
    child_friendly: 3,
    dog_friendly: 5,
    energy_level: 4,
    grooming: 3,
    health_issues: 5,
    intelligence: 4,
    shedding_level: 3,
    social_needs: 2,
    stranger_friendly: 1,
    vocalisation: 0,
  };

  const stars5 = ['★', '★', '★', '★', '★'].join(' ');
  const stars4 = ['★', '★', '★', '★'].join(' ');
  const stars3 = ['★', '★', '★'].join(' ');
  const stars2 = ['★', '★'].join(' ');
  const stars1 = ['★'].join(' ');

  const parsedCatStars = {
    affectionLevel: 'jest.mock: CAT',
    adaptability: stars4,
    childFriendly: stars3,
    dogFriendly: stars5,
    energyLevel: stars4,
    grooming: stars3,
    healthIssues: stars5,
    intelligence: stars4,
    sheddingLevel: stars3,
    socialNeeds: stars2,
    strangerFriendly: stars1,
    vocalisation: '',
  };

  it('should return parseAffectionLevel with [ jest.mock: CAT ]', () => {
    const result = parseCatAttributes(catStarsAvailable);
    expect(result).toStrictEqual(parsedCatStars);
  });
});
