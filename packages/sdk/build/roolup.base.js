import typescript from 'rollup-plugin-typescript2';
import commonjs from '@rollup/plugin-commonjs';
// const extensions = ['.ts'];

export const plugins = [typescript(), commonjs()];
