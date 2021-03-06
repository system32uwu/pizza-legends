<div align="center">
  <br/>
  <br/>
  <img src="./frontend/rpg/public/images/logo.png" alt="header" width="100" />

  <h1>Pizza Legends</h1>
  <br/>
</div>

This is a [Pizza Legends](https://www.youtube.com/watch?v=fyi4vfbKEeo) clone made with [TypeScript](https://www.typescriptlang.org/) and [Rollup](https://rollupjs.org) with ⚡️ lightning fast HMR through [Vite](https://vitejs.dev/).

## Available Commands

| Command          | Description                                              |
| ---------------- | -------------------------------------------------------- |
| `yarn install`   | Install project dependencies                             |
| `yarn rpg dev`   | Builds project and open web server, watching for changes |
| `yarn rpg build` | Builds code bundle with production settings              |
| `yarn rpg serve` | Run a web server to serve built code bundle              |
| `yarn api dev`   | Run a Nestjs api to save data, in dev mode               |
| `yarn api start` | Run a Nestjs api to save data in prod mode               |


## Development

After cloning the repo, run `yarn install` from your project directory. Then, you can start the local development
server by running `yarn dev` and navigate to <http://localhost:3000>.

## Production

After running `yarn build`, the files you need for production will be on the `dist` folder. To test code on your `dist` folder, run `yarn serve` and navigate to <http://localhost:5000>

## Credits

- [geocine/phaser3-rollup-typescript](https://github.com/geocine/phaser3-rollup-typescript)
- [Drew Conley - Pizza Legends](https://www.youtube.com/watch?v=fyi4vfbKEeo&list=PLcjhmZ8oLT0r9dSiIK6RB_PuBWlG1KSq_)