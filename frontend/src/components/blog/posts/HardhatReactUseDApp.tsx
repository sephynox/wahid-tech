import React from 'react';
import { CodeBlock, tomorrowNight } from 'react-code-blocks';
import { Alert } from 'react-bootstrap';
import { InTextCitations } from '../../../tools/Citation';

const codeInstallNpm = () => `# If npm is already installed, run the following to download the latest version.
npm install -g npm;

# For Windows users via chocolatey
choco install -y --force nodejs;

# For Linux users via nvm
# Note, apt-get and yum do not always provide the latest LTS version.
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh;
# It is always a good idea to inspect code from the internet prior to running.
bash install.sh;
source ~/.bashrc;
nvm install ;
nvm use ;

# For Mac OSX users via homebrew (you can also use nvm)
brew install node;
brew update;
brew upgrade node;
`;

const codeInitProject = () => `npx hardhat

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

const codeReactDeps = () => `# Yarn
yarn add -D hardhat ethers typescript ts-morph ts-node ts-generator typechain \\
    @symfoni/hardhat-react @ethersproject/bytes @ethersproject/providers \\
    @ethersproject/abi @ethersproject/hardware-wallets @typechain/ethers \\
    hardhat-typechain hardhat-deploy-ethers hardhat-deploy;

# NPM
npm install --save-dev hardhat ethers typescript ts-morph ts-node ts-generator \\
    typechain @symfoni/hardhat-react @ethersproject/bytes @ethersproject/providers \\
    @ethersproject/abi @ethersproject/hardware-wallets @typechain/ethers \\
    hardhat-typechain hardhat-deploy-ethers hardhat-deploy;
`;

const codeHardhatConfig = () => `# Add the following imports to the hardhat.config.ts
import "@typechain/ethers-v5";
import "@symfoni/hardhat-react";
`;

const codeReactFrontend = () => `# You can use either yarn, npm, or npx for this.

# Yarn
yarn create react-app frontend --template typescript;

# NPM
npm init react-app frontend --template typescript;

# NPX
npx create-react-app  frontend --template typescript;
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
            <p>
                <CodeBlock text={codeInstallNpm()} language="shell" showLineNumbers={true} theme={tomorrowNight} />
            </p>
        </section>
        <section>
            <h3 id="New-Hardhat-Project">New Hardhat Project</h3>
            <p>
                Once you have npm available, you can go ahead and create a new directory somewhere you want your project
                to exist and enter that directory. We can then get started with setting up a basic hardhat project using
                the <code>npx hardhat</code> command.
            </p>
            <p>
                <CodeBlock text={codeInitProject()} language="shell" showLineNumbers={true} theme={tomorrowNight} />
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
            <p>
                <CodeBlock text={codeReactDeps()} language="shell" showLineNumbers={true} theme={tomorrowNight} />
            </p>
            <p>
                After the dependencies are added, we will want to update our <code>hardhat.config.ts</code> file to
                import the following plugins into our project.
            </p>
            <p>
                <CodeBlock text={codeHardhatConfig()} language="jsx" showLineNumbers={true} theme={tomorrowNight} />
            </p>
        </section>
        <section>
            <h3 id="React-Frontend">React Frontend</h3>
            <p>
                Once the hardhat scaffolding is in place, we can move on to setting up our React frontend application.
            </p>
            <p>
                <CodeBlock text={codeReactFrontend()} language="shell" showLineNumbers={true} theme={tomorrowNight} />
            </p>
            <Alert variant="warning">
                Note: If you receive a <code>tar@2.2.2 deprecation warning</code>, simply run{' '}
                <code>npm install tar -g</code> to update it and try again.
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
