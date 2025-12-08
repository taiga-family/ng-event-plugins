import {readFile, writeFile} from 'node:fs/promises';

const pluginsPath = new URL('../dist/ng-event-plugins/', import.meta.url);
const webTypesPath = new URL('./web-types.json', pluginsPath);
const webTypes = await readFile(webTypesPath, {
    encoding: 'utf8',
});

const newWebTypes = webTypes.replaceAll(/"\.\/src\/([^"]+)\.ts"/g, (_, matched) => `"./${matched}.d.ts"`);

await writeFile(webTypesPath, newWebTypes);
