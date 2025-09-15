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

export const ROLES = [
  {
    name: 'developer',
    url: 'software-developer'
  },
  {
    name: 'data architect',
    url: 'data-architect'
  },
  {
    name: 'technical architect',
    url: 'technical-architect'
  },
  {
    name: 'data engineer',
    url: 'data-engineer'
  }
];