import { Nft } from "../../actions/OpenSea";

// TODO Get OpenSea API approval
const Data: Record<string, Nft> = {
    'beached-whale': {
        id: 41578729,
        token_id: "5320",
        num_sales: 0,
        top_bid: 1,
        image_url: "/images/nfts/beached-whale.png",
        listing_date: new Date(2021, 8, 21, 19, 28, 18, 679839),
        name: "Beached Whale",
        description: "Among the vast ocean that is the mempool, the dark forest of cyberspace, there exist hidden paradises of boundless treasure lost in time. These caches of riches washed up upon shores long forgotten yet they remain untouched, beached whales. Photo Credit: Foundry Co (Pixaby)",
        external_link: "https://wahid.eth/",
        owner: {
            user: {
                username: "twahid"
            },
            profile_img_url: "",
            address: "",
            config: ""
        },
        creator: {
            user: {
                username: "twahid"
            },
            profile_img_url: "",
            address: "",
            config: ""
        },
        asset_contract: {
            address: "0x15533781a650f0c34f587cdb60965cdfd16ff624",
            asset_contract_type: "non-fungible",
            created_date: new Date(2021, 8, 21, 19, 28, 18, 679839),
            name: "BlockchainBikers",
            nft_version: "3.0",
            owner: 65289622,
            schema_name: "ERC721",
            symbol: "BIKERS",
            total_supply: 1,
            description: "Welcome to the hottest Bikes and Bikers on the Ethereum Highways!\n\nMint a biker today on our site for a chance @ the rarest of em all. 1/1, your Biker will come with a Bike as well.\n\nSimulator to come with P2E experience. You're not going to want to miss THIS ride.\n\nOnly 11,111 bikers will ever be minted, are you going to be ONE?\n\nAll artwork officially done by @c_reu_d.\n\nVisit bikersNFT.com to learn more!",
            external_link: "http://bikersnft.com",
            image_url: "https://lh3.googleusercontent.com/sD4kKN2TG7JO4DNg4e8WK13lBkr9xa9wTBrBXchNXsCmd2NlBnZiMT9u4zaQ_OzmVeElw3XikRvYyxE2JCiaX5UMi6VBw6MT2ejN64o=s120",
            default_to_fiat: false,
            dev_buyer_fee_basis_points: 0,
            dev_seller_fee_basis_points: 500,
            only_proxied_transfers: false,
            opensea_buyer_fee_basis_points: 0,
            opensea_seller_fee_basis_points: 250,
            buyer_fee_basis_points: 0,
            seller_fee_basis_points: 750,
            payout_address: "0x7c7844d8dae8e1f1631bddc6a1b6b8200ad6e334"
        },
        permalink: "https://opensea.io/assets/0x15533781a650f0c34f587cdb60965cdfd16ff624/5320",
        collection: {
            banner_image_url: "https://lh3.googleusercontent.com/p-vzW7lclNDzTzjy1XBC7zLEWRmrvOsQIcDmdBybvAyiHzxZ2jwubhYqolyuCkmGKOxfQcWC33we4HUltdJEkz_97RRaL6y8ZVjp=s2500",
            chat_url: null,
            created_date: new Date(2021, 8, 21, 19, 28, 18, 679839),
            default_to_fiat: false,
            description: "Welcome to the hottest Bikes and Bikers on the Ethereum Highways!\n\nMint a biker today on our site for a chance @ the rarest of em all. 1/1, your Biker will come with a Bike as well.\n\nSimulator to come with P2E experience. You're not going to want to miss THIS ride.\n\nOnly 11,111 bikers will ever be minted, are you going to be ONE?\n\nAll artwork officially done by @c_reu_d.\n\nVisit bikersNFT.com to learn more!",
            dev_buyer_fee_basis_points: 0,
            dev_seller_fee_basis_points: 500,
            discord_url: "https://discord.gg/yP8tHhVbjR",
            display_data: {
                card_display_style: "contain"
            },
            external_url: "http://bikersnft.com",
            featured: false,
            hidden: false,
            safelist_request_status: "not_requested",
            image_url: "https://lh3.googleusercontent.com/sD4kKN2TG7JO4DNg4e8WK13lBkr9xa9wTBrBXchNXsCmd2NlBnZiMT9u4zaQ_OzmVeElw3XikRvYyxE2JCiaX5UMi6VBw6MT2ejN64o=s120",
            is_subject_to_whitelist: false,
            name: "BlockchainBikers",
            only_proxied_transfers: false,
            opensea_buyer_fee_basis_points: 0,
            opensea_seller_fee_basis_points: 250,
            payout_address: "0x7c7844d8dae8e1f1631bddc6a1b6b8200ad6e334",
            require_email: false,
            "short_description": "",
            slug: "blockchainbikers",
            twitter_username: "bikersnft",
        },
        traits: [],
        is_presale: false,
    }
};

export const Nfts: string[] = ['beached-whale'];

export default Data;
