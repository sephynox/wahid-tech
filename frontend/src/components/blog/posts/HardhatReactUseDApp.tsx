import React from 'react';
import { Alert } from 'react-bootstrap';
import Code from '../../Code';
import { InTextCitations } from '../../../tools/Citation';

const codeInstallNpm = () =>
    `# If npm is already installed, run the following to download the latest version.
npm install -g npm;

# For Windows users via chocolatey
choco install -y --force nodejs;

# For Linux users via nvm
# Note, apt-get and yum do not always provide the latest LTS version.
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh;
# It is always a good idea to inspect code from the internet prior to running.
bash install.sh;
source ~/.bashrc;
nvm install --lts;
nvm use --lts;

# For Mac OSX users via homebrew (you can also use nvm)
brew install node;
brew update;
brew upgrade node;
`;

const codeInitProject = () =>
    `npx hardhat

# You will receive the following prompt:
# 
# 888    888                      888 888               888
# 888    888                      888 888               888
# 888    888                      888 888               888
# 8888888888  8888b.  888d888 .d88888 88888b.   8888b.  888888
# 888    888     "88b 888P"  d88" 888 888 "88b     "88b 888
# 888    888 .d888888 888    888  888 888  888 .d888888 888
# 888    888 888  888 888    Y88b 888 888  888 888  888 Y88b.
# 888    888 "Y888888 888     "Y88888 888  888 "Y888888  "Y888
# 
# Welcome to Hardhat v2.8.3
# 
# ? What do you want to do? … 
# ▸ Create a basic sample project
#   Create an advanced sample project
#   Create an advanced sample project that uses TypeScript
#   Create an empty hardhat.config.js
#   Quit
`;

const codeReactDeps = () =>
    `# Yarn
yarn add -D hardhat hardhat-deploy hardhat-deploy-ethers \\
    hardhat-typechain hardhat-typechain ts-morph ts-node \\
    typescript ts-generator typechain@^7.0.0 @typechain/ethers-v5 \\
    @ethersproject/bytes@^5.0.0 @ethersproject/providers@^5.0.0 \\
    @ethersproject/abi@^5.0.0 @ethersproject/hardware-wallets@^5.0.14 \\
    @symfoni/hardhat-react lodash@^4.17.15;

# NPM
npm install --save-dev hardhat hardhat-deploy hardhat-deploy-ethers \\
    hardhat-typechain hardhat-typechain ts-morph ts-node \\
    typescript ts-generator typechain@^7.0.0 @typechain/ethers-v5 \\
    @ethersproject/bytes@^5.0.0 @ethersproject/providers@^5.0.0 \\
    @ethersproject/abi@^5.0.0 @ethersproject/hardware-wallets@^5.0.14 \\
    @symfoni/hardhat-react lodash@^4.17.15;
`;

const codeHardhatConfig = () =>
    `import * as dotenv from "dotenv";
...
// Add the following imports to the hardhat.config.ts
+ import "@typechain/ethers-v5";
+ import "@symfoni/hardhat-react";

...

// We also want to add the hardhat network in the HardhatUserConfig
const config: HardhatUserConfig = {
    solidity: "0.8.4",
    networks: {
     + hardhat: {
     +   chainId: 1337,
     + },
...
`;

const codeReactFrontend = () =>
    `# You can use either yarn, npm, or npx for this.

# Yarn
yarn create react-app frontend --template typescript;

# NPM
npm init react-app frontend --template typescript;

# NPX
npx create-react-app  frontend --template typescript;
`;

const codeReactFrontendDeps = () =>
    `# Yarn
yarn add -D @testing-library/dom@^7.21.4 \\
    @babel/core@^7.0.0-0 \\
    @babel/plugin-syntax-flow@^7.14.5 \\
    @babel/plugin-transform-react-jsx@^7.14.9 \\
    @types/express@^4.17.13 \\
    postcss@^8.1.0 autoprefixer@^10.0.2;

# NPM
npm install --save-dev @testing-library/dom@^7.21.4 \\
    @babel/core@^7.0.0-0 \\
    @babel/plugin-syntax-flow@^7.14.5 \\
    @babel/plugin-transform-react-jsx@^7.14.9 \\
    @types/express@^4.17.13 \\
    postcss@^8.1.0 autoprefixer@^10.0.2;
`;

const codeReactFrontendUsedapp = () =>
    `# Yarn
yarn add @usedapp/core;

# NPM
npm install yarn add @usedapp/core;
`;

const codeReactFrontendConfigFile = () =>
    `// ../frontend/src/Config.tsx
import { Mainnet, Config, ChainId } from "@usedapp/core";

const CONFIG: Config = "production" !== process.env.NODE_ENV
    ? {
        multicallAddresses: {
            [ChainId.Localhost]: process.env.REACT_APP_MULTICALL_ADDRESS ?? "",
        },
        readOnlyUrls: {
            [ChainId.Localhost]: "http://127.0.0.1:8545",
        },
    }
    : { networks: [Mainnet] };
export default CONFIG;
`;

const codeReactFrontendDappContext = () =>
    `// ../frontend/src/index.tsx
import React from 'react';
...
+ import { DAppProvider } from "@usedapp/core";
+ import config from "./Config";

ReactDOM.render(
    <React.StrictMode>
      + <DAppProvider config={config}>
      <App />
      + </DAppProvider>
    </React.StrictMode>,
    document.getElementById('root')
  );
`;

const codeReactFrontendWalletConnect = () =>
    `// ../frontend/src/App.tsx
import React from 'react';
+ import { useEtherBalance, useEthers } from "@usedapp/core";
+ import { formatEther } from "@ethersproject/units";

function App() {
    + const { activateBrowserWallet, account } = useEthers();
    + const etherBalance = useEtherBalance(account);
    
    return (
        <div className="App">
          + <button onClick={() => activateBrowserWallet()}>Connect</button>
          + {account && <p>Account: {account}</p>}
          + {etherBalance && <p>Balance: {formatEther(etherBalance)}</p>}
        </div>
    );
}

export default App;
`;

const codeStartingProcesses = () =>
    `# Start the hardhat node by running the following in the hardhat project root:
npx hardhat node

# Start the local development server from the frontend project root:
yarn start
`;

const HardhatReactUseDApp = ({ r }: InTextCitations): JSX.Element => (
    <>
        <section>
            <h3 id="Introduction">Introduction</h3>
            <p>
                Development in any ecosystem or technology can be greatly impacted by a single metric known as the
                &ldquo;Time to Hello, World!&rdquo; The easier it is to get started with a new technology, the more
                likely it will be adopted into the mainstream. This concept is particularly valuable in API development
                as the easier it is to get started with an API, the more likely it is to be utilized. However, the real
                value in this concept is not how fast you can print out &ldquo;Hello World!&rdquo; but rather, how
                quickly a new developer can achieve a minimal useful result. For dapps, this would be getting a local
                development environment working and being able to connect to it with a wallet like Metamask.
            </p>
        </section>
        <section>
            <h3>Versions</h3>
            <p>This guide was written using the following versions of key dependencies.</p>
            <dl>
                <dt>Hardhat</dt>
                <dd>
                    <code>hardhat@2.8.3</code>
                </dd>
                <dt>React</dt>
                <dd>
                    <code>react@17.0.2</code>
                </dd>
                <dt>useDapp</dt>
                <dd>
                    <code>@usedapp/core@0.9.1</code>
                </dd>
            </dl>
        </section>
        <section>
            <h3 id="Getting-Started">Getting Started</h3>
            <p>
                The first thing you will need is to have <code>npm</code> available as the majority of dapp development
                takes place within the nodejs ecosystem. If you already have <code>npm</code> and Node.js 12.x+
                installed, you can skip this step. Otherwise, see{' '}
                <a href="https://nodejs.org/en/download" target="_blank" rel="noreferrer">
                    nodejs.org
                </a>{' '}
                for additional installtion instructions.
            </p>
            <h4 id="Getting-Started-NPM">Installing NPM</h4>
            <p>
                <Code text={codeInstallNpm()} language="shell" showLineNumbers={true} />
            </p>
        </section>
        <section>
            <h3 id="Hardhat-Project">Hardhat Project</h3>
            <p>
                Once you have npm available, you can go ahead and create a new directory somewhere you want your project
                to exist and enter that directory. We can then get started with setting up a basic hardhat project using
                the <code>npx hardhat</code> command.
            </p>
            <h4 id="Hardhat-Project-NPX-Hardhat">NPX Hardhat</h4>
            <p>
                <Code text={codeInitProject()} language="shell" showLineNumbers={true} />
            </p>
            <p>
                Feel free to choose the type of project you would like to start with. For beginners, creating one of the
                two sample projects is a good way to get kickstarted. Otherwise, creating a standard{' '}
                <code>hardhat.config.js</code> (or <code>hardhat.config.ts</code> for Typescript) file works as well.
                For the purposes of this guide, let us select &ldquo;Create an advanced sample project that uses
                TypeScript&rdquo; to get started with a Typescript dapp. You will then be prompted for a project root,
                whether or not to create a <code>.gitignore</code> file, and install dependencies. You can simply hit
                enter for each to select the default options which is what we want here.
            </p>
            <Alert variant="warning">
                Note: You may see several deprecation warnings. This is unfortunately, normal and until various project
                maintainers can address them, we will simply have to let them be--or contribute.
            </Alert>
            <p>
                Once this process is complete, you should have your basic sample application and some sample contracts
                available to you. From here, we will want to install the <code>hardhat-react</code> plugin in the base
                project as well as its peer dependencies.
            </p>
            <h4 id="Hardhat-Project-Hardhat-Peer-Dependencies">Peer Dependencies</h4>
            <p>
                <Code text={codeReactDeps()} language="shell" showLineNumbers={true} />
            </p>
            <p>
                After the dependencies are added, we will want to update our <code>hardhat.config.ts</code> file to
                import the following plugins into our project. Additionally, we will add a network configuration for
                hardhat.
            </p>
            <h4 id="Hardhat-Project-Hardhat-Plugis">Plugins</h4>
            <p>
                <Code text={codeHardhatConfig()} language="jsx" showLineNumbers={true} />
            </p>
        </section>
        <section>
            <h3 id="React-Frontend">React Frontend</h3>
            <p>
                Once the hardhat scaffolding is in place, we can move on to setting up our React frontend application.
            </p>
            <h4 id="React-Frontend-Create">Create</h4>
            <p>
                <Code text={codeReactFrontend()} language="shell" showLineNumbers={true} />
            </p>
            <Alert variant="warning">
                Note: If you receive a <code>tar@2.2.2 deprecation warning</code>, simply run{' '}
                <code>npm install tar -g</code> to update it and try again.
            </Alert>
            <p>
                Now that the scaffolding for our frontend application is in, let us add the development peer
                dependencies for the project.
            </p>
            <h4 id="React-Frontend-Peer-Dependencies">Peer Dependencies</h4>
            <p>
                <Code text={codeReactFrontendDeps()} language="shell" showLineNumbers={true} />
            </p>
            <p>
                Once that is complete, we can go ahead and add <code>useDapp</code>
            </p>
            <h4 id="React-Frontend-Install-Usedapp">Install useDapp</h4>
            <p>
                <Code text={codeReactFrontendUsedapp()} language="shell" showLineNumbers={true} />
            </p>
            <p>
                Next, let us go ahead and create a simple configuration file which we will later pass into the{' '}
                <code>DAppProvider</code>. We can place this file within the <code>src</code> directory of the frontend
                project with a name of <code>Config.tsx</code>. Note: You can also handle this your own way if you
                prefer.
            </p>
            <h4 id="React-Frontend-Configure-Usedapp">Configure useDapp</h4>
            <p>
                <Code text={codeReactFrontendConfigFile()} language="jsx" showLineNumbers={true} />
            </p>
            <Alert variant="info">
                Note: You can also handle this your own way if you prefer. Additionally, you can set your local
                milticall address using a React <code>.env</code> variable.
            </Alert>
            <p>
                Once we have a configuration file we can use, we can go ahead and setup the context for the dapp. For
                this tutorial, we will simply be wrapping the <code>{`<App />`}</code> with a{' '}
                <code>{`<DAppProvider />`}</code>. However, you can use the provider with any React component so sites
                with both web2 and web3 functionality can be containerized.
            </p>
            <h4 id="React-Frontend-Dapp-Context">DAppProvider Context</h4>
            <p>
                <Code text={codeReactFrontendDappContext()} language="jsx" showLineNumbers={true} />
            </p>
            <p>
                Lastly, with everything in place, we can use <code>useEthers</code> to activate the browser wallet such
                as MetaMask. Update the <code>App.tsx</code> file in the <code>src</code> directory of the frontend
                project with the following modificiations:
            </p>
            <h4 id="React-Frontend-Wallet-Connect">Wallet Connect</h4>
            <p>
                <Code text={codeReactFrontendWalletConnect()} language="jsx" showLineNumbers={true} />
            </p>
        </section>
        <section>
            <h3 id="Finishing-Up">Finishing Up</h3>
            <p>
                That is all that is needed. You can now go ahead and run the following commands (I would suggest opening
                separate terminals for each so you can monitor their respective outputs):
            </p>
            <p>
                <Code text={codeStartingProcesses()} language="shell" showLineNumbers={true} />
            </p>
            <p>
                You are now ready to build your dapp and are equipped with virtually everything you need to do so.
                Ensure your Metamask is set to the Localhost 8545 network and that your hardhat node is running in order
                to connect.
            </p>
            <Alert variant="danger">
                Warning: Never send assets from mainnet to your test accounts. This can result in the permanenet loss of
                such assets. Always use test accounts when testing and ensure your Metamask network is properly set.
            </Alert>
        </section>
        <section>
            <h3 id="TLDR">TL;DR</h3>
            <p>
                For those looking for a more direct approach, you can check out my gist here:{' '}
                <a
                    href="https://gist.github.com/sephynox/90f31b7ed9557c017a13d12b492078cc"
                    target="_blank"
                    rel="noreferrer"
                >
                    tthw-dapp.sh
                </a>{' '}
                This bash script will automate the entire process we discussed in this article. It will provide you the
                opportunity to configure your project and hardhat settings step-by-step.
            </p>
        </section>
    </>
);

export default HardhatReactUseDApp;
