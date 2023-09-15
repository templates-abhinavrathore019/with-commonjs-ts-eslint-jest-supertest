import { parseCatAttributes } from '../attr-util';

describe('cat_attrs_with(actual-fn)', () => {
  const catStarsAvailable = {
    affection_level: 5,
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

  const catStarsMixed = {
    affection_level: 5,
    adaptability: 4,
    child_friendly: 3,
    dog_friendly: undefined,
    energy_level: null,
    grooming: '',
    health_issues: 4.3,
    intelligence: 'undefined',
    shedding_level: -5,
    social_needs: 0,
    stranger_friendly: NaN,
    vocalisation: '_',
  };

  const stars5 = ['★', '★', '★', '★', '★'].join(' ');
  const stars4 = ['★', '★', '★', '★'].join(' ');
  const stars3 = ['★', '★', '★'].join(' ');
  const stars2 = ['★', '★'].join(' ');
  const stars1 = ['★'].join(' ');

  const parsedCatStars = {
    affectionLevel: stars5,
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

  const parsedCatStarsMixed = {
    affectionLevel: stars5,
    adaptability: stars4,
    childFriendly: stars3,
    dogFriendly: '',
    energyLevel: '',
    grooming: '',
    healthIssues: stars4,
    intelligence: '',
    sheddingLevel: '',
    socialNeeds: '',
    strangerFriendly: '',
    vocalisation: '',
  };

  const parsedCatNull = {
    affectionLevel: '',
    adaptability: '',
    childFriendly: '',
    dogFriendly: '',
    energyLevel: '',
    grooming: '',
    healthIssues: '',
    intelligence: '',
    sheddingLevel: '',
    socialNeeds: '',
    strangerFriendly: '',
    vocalisation: '',
  };

  it('should return all cat attributes with stars', () => {
    const result = parseCatAttributes(catStarsAvailable);
    expect(result).toStrictEqual(parsedCatStars);
  });

  it('should return all cat attributes with empty string for invalid datatypes', () => {
    const result = parseCatAttributes(catStarsMixed);
    expect(result).toStrictEqual(parsedCatStarsMixed);
  });

  it('should handle null cat', () => {
    const result = parseCatAttributes(null);
    expect(result).toStrictEqual(parsedCatNull);
  });
});
