import { parseCatAttributes } from '../attr-util';

// required for local modules but for node_modules this stmt is not required
jest.mock('../attr-parser');

describe('cat_attrs_with(__mocks__)', () => {
  const catStarsAvailable = {
    affection_level: 4,
    adaptability: 3,
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

  const stars4 = ['★', '★', '★', '★'].join(' ');
  const stars3 = ['★', '★', '★'].join(' ');

  const parsedCatStars = {
    affectionLevel: stars4,
    adaptability: stars3,
    childFriendly: 'parseChildFriendly: CAT',
    dogFriendly: 'parseDogFriendly: CAT',
    energyLevel: 'parseEnergyLevel: CAT',
    grooming: 'parseGrooming: CAT',
    healthIssues: 'parseHealthIssues: CAT',
    intelligence: 'parseIntelligence: CAT',
    sheddingLevel: 'parseSheddingLevel: CAT',
    socialNeeds: 'parseSocialNeeds: CAT',
    strangerFriendly: 'parseStrangerFriendly: CAT',
    vocalisation: 'parseVocalisation: CAT',
  };

  it('should return data from __mock__', () => {
    const result = parseCatAttributes(catStarsAvailable);
    expect(result).toStrictEqual(parsedCatStars);
  });
});
