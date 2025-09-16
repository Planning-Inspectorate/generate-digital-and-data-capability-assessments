export const BASE_URL = 'https://ddat-capability-framework.service.gov.uk';

export const GRADES = {
  EO: 'EO',
  HEO: 'HEO',
  SEO: 'SEO',
  G7: 'G7',
  G6: 'G6'
};

// number of skills the template is setup for
export const TEMPLATE_MAX_SKILLS = 15;
export const NO_PREFIX = Symbol();
export const NO_GRADE = Symbol("NO GRADE");

/**
 * default grade map, varies by role and can be overridden in ROLE_CONFIG
 * @type {GradeMap}
 */
export const DEFAULT_GRADE_MAP = {
  'junior': GRADES.EO,
  [NO_PREFIX]: GRADES.HEO,
  'senior': GRADES.SEO,
  'lead': GRADES.G7,
  'principal': GRADES.G6
};

/**
 * Fetch and generate templates for each of these roles
 * @type {RoleConfig[]}
 */
export const ROLE_CONFIG = [
  {
    name: 'developer',
    url: 'software-developer',
    title: 'Software Developer'
  },
  {
    name: 'devops engineer',
    url: 'development-operations-devops-engineer',
    title: 'DevOps Engineer',
    gradeMap: {
      'senior': GRADES.SEO
    }
  },
  {
    name: 'data architect',
    url: 'data-architect',
    title: 'Data Architect',
    gradeMap: {
      'senior': GRADES.G7
    }
  },
  {
    name: 'technical architect',
    url: 'technical-architect',
    title: 'Technical Architect',
    gradeMap: {
      [NO_PREFIX]: GRADES.SEO,
      'lead': GRADES.G7
    }
  },
  {
    name: 'data engineer',
    url: 'data-engineer',
    title: 'Data Engineer'
  },
  {
    name: 'data scientist',
    url: 'data-scientist',
    title: 'Data Scientist',
    gradeMap: {
      'principal': GRADES.SEO,
      'lead': GRADES.G7
    }
  },
  {
    name: 'infrastructure operations engineer',
    url: 'infrastructure-operations-engineer',
    title: 'Infrastructure Operations Engineer',
    gradeMap: {
      'senior': GRADES.SEO
    }
  },
  {
    name: 'security architect',
    url: 'security-architect',
    title: 'Security Architect',
    gradeMap: {
      'lead': GRADES.G7
    }
  },
  {
    name: 'test engineer',
    url: 'test-engineer',
    title: 'Test Engineer'
  }
];