import { Web3ReactProvider } from '@web3-react/core';

export default () => {
    function getLibrary(provider, connector) {
        return new Web3Provider(provider) // this will vary according to whether you use e.g. ethers or web3.js
    }

    return (
        <Web3ReactProvider getLibrary={getLibrary}>
            <section id="market" className="d-flex flex-column">

            </section>
        </Web3ReactProvider>
    );
}
