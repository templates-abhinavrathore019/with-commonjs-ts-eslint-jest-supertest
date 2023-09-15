const originalModule = jest.requireActual<typeof import('../attr-parser')>('../attr-parser');
const { parseAffectionLevel, parseAdaptability } = originalModule;

const parseChildFriendly = jest.fn(() => {
  return 'parseChildFriendly: CAT';
});
const parseDogFriendly = jest.fn(() => {
  return 'parseDogFriendly: CAT';
});
const parseEnergyLevel = jest.fn(() => {
  return 'parseEnergyLevel: CAT';
});
const parseGrooming = jest.fn(() => {
  return 'parseGrooming: CAT';
});
const parseHealthIssues = jest.fn(() => {
  return 'parseHealthIssues: CAT';
});
const parseIntelligence = jest.fn(() => {
  return 'parseIntelligence: CAT';
});
const parseSheddingLevel = jest.fn(() => {
  return 'parseSheddingLevel: CAT';
});
const parseSocialNeeds = jest.fn(() => {
  return 'parseSocialNeeds: CAT';
});
const parseStrangerFriendly = jest.fn(() => {
  return 'parseStrangerFriendly: CAT';
});
const parseVocalisation = jest.fn(() => {
  return 'parseVocalisation: CAT';
});

export {
  parseAffectionLevel,
  parseAdaptability,
  parseChildFriendly,
  parseDogFriendly,
  parseEnergyLevel,
  parseGrooming,
  parseHealthIssues,
  parseIntelligence,
  parseSheddingLevel,
  parseSocialNeeds,
  parseStrangerFriendly,
  parseVocalisation,
};
