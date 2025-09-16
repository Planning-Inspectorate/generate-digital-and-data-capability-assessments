A small program to generate capability assessment templates (in Excel format) from the Government Digital and Data Profession Capability Framework website.

To use, check the configured roles in `src/config.js`, and the prefix to grade mappings for each role. Then run `npm run run <output-dir>` to generate the templates.

The skills required for each role, as well as the skill descriptions, are fetched from [Government Digital and Data Profession Capability Framework
](https://ddat-capability-framework.service.gov.uk).