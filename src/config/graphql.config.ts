import { GqlModuleOptions } from '@nestjs/graphql';
import { join } from 'path';

const graphqlConfig: GqlModuleOptions = {
  typePaths: ['./**/*.graphql'],
  definitions: {
    path: join(process.cwd(), 'src/graphql.ts'),
    outputAs: 'interface',
  },
};

export default graphqlConfig;
