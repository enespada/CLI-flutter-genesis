export const constants = (capitalized: string, lowercased: string) => `
import { ${capitalized} } from '@domain/${lowercased}/entities/${lowercased}.entity';


export const default${capitalized}Values: Array<Partial<${capitalized}>> = [];
`;
