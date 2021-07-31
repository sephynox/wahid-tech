import { Web3ReactProvider } from '@web3-react/core';
//import { Symfoni } from "./hardhat/SymfoniContext";

export default () => {
    function getLibrary(provider, connector) {
        return new Web3Provider(provider);
    }

    return (
        <Web3ReactProvider getLibrary={getLibrary}>
            <section id="market" className="d-flex flex-column">

            </section>
        </Web3ReactProvider>
    );
};
