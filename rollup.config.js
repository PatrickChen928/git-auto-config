import clear from 'rollup-plugin-clear'
import dts from 'rollup-plugin-dts'
import esbuild from 'rollup-plugin-esbuild'
import json from '@rollup/plugin-json'

const esbuildPlugin = esbuild({
  target: 'es2020',
})

module.exports = [
  {
    input: 'src/index.ts',
    output: [
      {
        file: 'dist/index.mjs',
        format: 'es',
      },
      {
        file: 'dist/index.cjs',
        format: 'cjs',
      }
    ],
    plugins: [
      clear({
        targets: ['./dist']
      }),
      esbuildPlugin
    ]
  },
  {
    input: 'src/cli.ts',
    output: [
      {
        file: 'dist/cli.mjs',
        format: 'es',
      },
      {
        file: 'dist/cli.cjs',
        format: 'cjs',
      }
    ],
    plugins: [
      json(),
      clear({
        targets: ['./dist']
      }),
      esbuildPlugin
    ]
  },
  {
    input: './src/index.ts',
    output: [{ file: 'dist/index.d.ts', format: 'es' }],
    plugins: [dts()]
  }
]
