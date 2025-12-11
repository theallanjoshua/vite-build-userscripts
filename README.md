# vite-build-userscripts

A minimal setup for building userscripts using Vite. This project provides a simple Vite-based workflow to author, develop and bundle userscripts (Tampermonkey / Greasemonkey / Violentmonkey) with modern tooling.

## Features
- Type safe userscript headers
- Bundles implementation into a single *.user.js file
- Auto injects userscript headers as comments on top of the *.user.js file

## Installation
```sh
npm install vite-build-userscripts
# or
yarn add vite-build-userscripts
# or
pnpm add vite-build-userscripts
```

## Usage

```ts
import { buildUserscripts } from 'vite-build-userscripts'

await buildUserscripts({
  scripts: [
    {
      entry: 'src/path/to/my-script.ts',
      outDir: 'dist',
      outFileName: 'script.user.js'
      headers: {
        name: 'My Userscript',
        version: '1.0.0',
        description: 'A description of my userscript',
      }
    }
  ]
})
```

## API Reference: `buildUserscripts`

`buildUserscripts(options: BuildUserscriptsOptions): Promise<void>`

#### Parameters

| Option         | Type                                   | Required | Description                                                                                     |
|----------------|----------------------------------------|----------|-------------------------------------------------------------------------------------------------|
| `plugins`      | `Plugin[]`                            | No       | Array of Vite plugins to include in the build process.                                          |
| `scripts`      | `Array<Script>`                 | Yes      | Array of script configurations. Each configuration defines how a userscript should be built.   |

#### `Script` Properties

| Property       | Type                                   | Required | Description                                                                                     |
|----------------|----------------------------------------|----------|-------------------------------------------------------------------------------------------------|
| `headers`      | `UserscriptHeaders`                   | Yes      | Metadata for the userscript, such as name, version, and description.                           |
| `entry`        | `string`                              | Yes      | Path to the script source file.                                                                |
| `outDir`       | `string`                              | Yes      | Output directory where the bundled userscript will be saved.                                   |
| `outFileName`  | `string`                              | No       | Final bundle filename. Defaults to `script.user.js`.                                           |

#### `UserscriptHeaders` Properties

The `UserscriptHeaders` type defines the metadata fields for the userscript. These fields are used to generate the userscript header comment. Below is a detailed list of all available fields:

| Field             | Type                                   | Required | Description                                                                                     |
|-------------------|----------------------------------------|----------|-------------------------------------------------------------------------------------------------|
| `name`            | `string`                              | Yes      | The name of the userscript.                                                                    |
| `description`     | `string`                              | Yes      | A short description of the userscript.                                                        |
| `version`         | `string`                              | Yes      | The version of the userscript.                                                                |
| `namespace`       | `string`                              | No       | A unique namespace to avoid conflicts with other scripts.                                      |
| `icon`            | `string`                              | No       | URL to the icon for the userscript.                                                           |
| `include`         | `string \| RegExp \| (string \| RegExp)[]` | No       | URLs or patterns where the script should run.                                                 |
| `exclude`         | `string \| RegExp \| (string \| RegExp)[]` | No       | URLs or patterns where the script should not run.                                             |
| `match`           | `string \| RegExp \| (string \| RegExp)[]` | No       | More specific URLs or patterns where the script should run.                                   |
| `exclude-match`   | `string \| RegExp \| (string \| RegExp)[]` | No       | More specific URLs or patterns where the script should not run.                               |
| `require`         | `string \| string[]`                   | No       | External scripts to load before running the userscript.                                       |
| `resource`        | `Record<string, string>`              | No       | External resources (e.g., images, files) to include in the script.                            |
| `noframes`        | `boolean`                             | No       | If `true`, prevents the script from running in iframes.                                       |
| `copyright`       | `string`                              | No       | Copyright information for the script.                                                         |
| `author`          | `string`                              | No       | The author of the userscript.                                                                 |
| `homepage`        | `string`                              | No       | URL to the homepage of the script.                                                            |
| `homepageURL`     | `string`                              | No       | Alternative URL to the homepage of the script.                                                |
| `website`         | `string`                              | No       | URL to the website of the script.                                                             |
| `source`          | `string`                              | No       | URL to the source code of the script.                                                         |
| `iconURL`         | `string`                              | No       | URL to the icon for the script.                                                               |
| `defaulticon`     | `string`                              | No       | Default icon URL for the script.                                                              |
| `icon64`          | `string`                              | No       | URL to a 64x64 icon for the script.                                                           |
| `icon64URL`       | `string`                              | No       | Alternative URL to a 64x64 icon for the script.                                               |
| `updateURL`       | `string`                              | No       | URL to check for script updates.                                                              |
| `downloadURL`     | `string`                              | No       | URL to download the script.                                                                   |
| `supportURL`      | `string`                              | No       | URL for user support.                                                                         |
| `connect`         | `string \| string[]`                   | No       | Domains the script is allowed to connect to.                                                  |
| `tag`             | `string \| string[]`                   | No       | Tags for categorizing the script.                                                             |
| `run-in`          | `string \| string[]`                   | No       | Specifies the context in which the script should run.                                         |
| `sandbox`         | `'raw' \| 'JavaScript' \| 'DOM'`        | No       | Specifies the sandbox environment for the script.                                             |
| `unwrap`          | `boolean`                             | No       | If `true`, unwraps the script from the sandbox.                                               |
| `inject-into`     | `'page' \| 'content' \| 'auto'`         | No       | Specifies where the script should be injected.                                                |
| `license`         | `string`                              | No       | License information for the script.                                                           |
| `contributionURL` | `string`                              | No       | URL for contributions or donations.                                                           |
| `contributionAmount` | `string`                           | No       | Suggested contribution amount.                                                                |
| `compatible`      | `string`                              | No       | Specifies compatible browsers or environments.                                                |
| `incompatible`    | `string`                              | No       | Specifies incompatible browsers or environments.                                              |
| `run-at`          | `'document-start' \| 'document-end' \| 'document-idle' \| 'document-body' \| 'context-menu'` | No | Specifies when the script should run.                     |
| `grant`           | `string[]`                           | No       | Permissions granted to the script (e.g., GM functions).                                       |

