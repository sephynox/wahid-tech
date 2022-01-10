import { Network, Nft } from '../../actions/OpenSea';
import ImageBeachedWhale from '../../resources/images/nfts/beached-whale.png';
import ImageFTDF51PercentAttack from '../../resources/images/nfts/ftdf-51-percent-attack.png';
import ImageOTEOEMana from '../../resources/images/nfts/mana.png';

// TODO Get OpenSea API approval
const Data: Record<string, Nft> = {
    'beached-whale': {
        id: 41578729,
        token_id: '5320',
        num_sales: 0,
        top_bid: 1,
        image_url: ImageBeachedWhale,
        listing_date: new Date(2021, 7, 29, 19, 28, 18),
        name: 'Beached Whale',
        description:
            'Among the vast ocean that is the mempool, the dark forest of cyberspace, there exist hidden paradises of boundless treasure lost in time. These caches of riches washed up upon shores long forgotten yet they remain untouched, beached whales. Photo Credit: Foundry Co (Pixaby)',
        external_link: 'https://wahid.eth/',
        owner: {
            user: {
                username: 'twahid',
            },
            profile_img_url: '',
            address: '',
            config: '',
        },
        creator: {
            user: {
                username: 'twahid',
            },
            profile_img_url: '',
            address: '',
            config: '',
        },
        asset_contract: {
            network: Network.ETHEREUM,
            address: '0x495f947276749Ce646f68AC8c248420045cb7b5e',
            asset_contract_type: 'non-fungible',
            total_supply: 1,
        },
        permalink:
            'https://opensea.io/assets/0x495f947276749ce646f68ac8c248420045cb7b5e/70166210179675030937276227931482602363625572420758951884515941330389498331137',
        traits: [],
        is_presale: false,
    },
    'ftdf-51-percent-attack': {
        id: 70166210179675030937276227931482602363625572420758951884515941330389498331146,
        token_id: '5320',
        num_sales: 0,
        top_bid: 1,
        image_url: ImageFTDF51PercentAttack,
        listing_date: new Date(2021, 7, 29, 19, 28, 18),
        name: '51% Attack',
        description:
            'Royal Rare - 1st Edition - 51% Attack - There is no entity, no system, no world that cannot succumb to an immeasurable barrage of computational power.',
        external_link: 'https://wahid.eth/',
        owner: {
            user: {
                username: 'twahid',
            },
            profile_img_url: '',
            address: '',
            config: '',
        },
        creator: {
            user: {
                username: 'twahid',
            },
            profile_img_url: '',
            address: '',
            config: '',
        },
        asset_contract: {
            network: Network.POLYGON,
            address: '0x2953399124f0cbb46d2cbacd8a89cf0599974963',
            asset_contract_type: 'semi-fungible',
            total_supply: 10,
        },
        permalink:
            'https://opensea.io/assets/matic/0x2953399124f0cbb46d2cbacd8a89cf0599974963/70166210179675030937276227931482602363625572420758951884515941330389498331146',
        traits: [],
        is_presale: false,
    },
    'oteoe-at-the-heart-of-existence': {
        id: 70166210179675030937276227931482602363625572420758951884515941331489009958913,
        token_id: '70166210179675030937276227931482602363625572420758951884515941331489009958913',
        num_sales: 0,
        top_bid: 1,
        image_url: ImageOTEOEMana,
        listing_date: new Date(2022, 1, 5, 15, 39, 0),
        name: 'At The Heart of Existence',
        description:
            'Fern Stem at 100x via 10x UPlanFL N - "There exists a force within where the lines of possibility and reality become blurred. This realm is that where which reality is born and from it, we exist."',
        external_link: 'https://wahid.eth/',
        owner: {
            user: {
                username: 'twahid',
            },
            profile_img_url: '',
            address: '',
            config: '',
        },
        creator: {
            user: {
                username: 'twahid',
            },
            profile_img_url: '',
            address: '',
            config: '',
        },
        asset_contract: {
            network: Network.POLYGON,
            address: '0x2953399124f0cbb46d2cbacd8a89cf0599974963',
            asset_contract_type: 'non-fungible',
            total_supply: 1,
        },
        permalink:
            'https://opensea.io/assets/matic/0x2953399124f0cbb46d2cbacd8a89cf0599974963/70166210179675030937276227931482602363625572420758951884515941331489009958913',
        traits: [],
        is_presale: false,
    },
};

export const Nfts: string[] = ['oteoe-at-the-heart-of-existence', 'ftdf-51-percent-attack', 'beached-whale'];

export default Data;
