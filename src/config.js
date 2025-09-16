export const BASE_URL = 'https://ddat-capability-framework.service.gov.uk';

export const GRADES = {
  EO: 'EO',
  HEO: 'HEO',
  SEO: 'SEO',
  G7: 'G7',
  G6: 'G6'
};

export const NO_PREFIX = Symbol();
export const NO_GRADE = Symbol("NO GRADE");

export const DEFAULT_GRADE_MAP = {
  'junior': GRADES.EO,
  [NO_PREFIX]: GRADES.HEO,
  'senior': GRADES.SEO,
  'lead': GRADES.G7,
  'principal': GRADES.G6
};

/**
 * @type {RoleConfig[]}
 */
export const ROLE_CONFIG = [
  {
    name: 'developer',
    url: 'software-developer',
    title: 'Software Developer'
  },
  {
    name: 'data architect',
    url: 'data-architect',
    title: 'Data Architect'
  },
  {
    name: 'technical architect',
    url: 'technical-architect',
    title: 'Technical Architect'
  },
  {
    name: 'data engineer',
    url: 'data-engineer',
    title: 'Data Engineer'
  }
];