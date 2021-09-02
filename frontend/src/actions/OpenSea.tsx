import { ERCTypes, Fungibility } from '../tools/ContractData';

export enum Network {
    ETHEREUM = 'https://etherscan.io/address/',
    POLYGON = 'https://polygonscan.com/address/',
}

export type OSUser = {
    user?: {
        username: string
    },
    profile_img_url: string,
    address: string,
    config: string
};

export type NftContract = {
    network: Network,
    address: string,
    asset_contract_type: Fungibility,
    total_supply: number,
    created_date?: Date,
    name?: string,
    nft_version?: string,
    owner?: number,
    schema_name?: ERCTypes,
    symbol?: string,
    description?: string,
    external_link?: string,
    image_url?: string,
    default_to_fiat?: false,
    dev_buyer_fee_basis_points?: number,
    dev_seller_fee_basis_points?: number,
    only_proxied_transfers?: boolean,
    opensea_buyer_fee_basis_points?: number,
    opensea_seller_fee_basis_points?: number,
    buyer_fee_basis_points?: number,
    seller_fee_basis_points?: number,
    payout_address?: string,
    opensea_version?: string,
};

export type Nft = {
    id: number,
    name: string,
    description: string,
    token_id: number | string,
    num_sales: number,
    image_url: string,
    permalink: string,
    is_presale: boolean,
    listing_date: Date,
    owner: OSUser,
    creator: OSUser,
    asset_contract: NftContract,
    collection?: NftCollection,
    background_color?: string,
    image_preview_url?: string,
    image_thumbnail_url?: string,
    image_original_url?: string,
    animation_url?: string,
    animation_original_url?: string,
    external_link?: string,
    decimals?: number,
    traits?: Array<string>,
    last_sale?: Date,
    top_bid?: number,
    transfer_fee_payment_token?: number,
    transfer_fee?: number,
};

export type NftCollection = {
    name: string,
    image_url: string,
    banner_image_url: string,
    created_date: Date,
    description: string,
    payout_address: string,
    safelist_request_status: string,
    featured: boolean,
    hidden: boolean,
    require_email: boolean,
    default_to_fiat: boolean,
    only_proxied_transfers: boolean,
    is_subject_to_whitelist: boolean,
    opensea_seller_fee_basis_points: number,
    opensea_buyer_fee_basis_points: number,
    dev_buyer_fee_basis_points: number,
    dev_seller_fee_basis_points: number,
    slug?: string,
    chat_url?: null,
    discord_url?: string,
    external_url?: string,
    featured_image_url?: string,
    large_image_url?: string,
    medium_username?: string,
    short_description?: string,
    telegram_url?: string,
    twitter_username?: string,
    instagram_username?: string,
    wiki_url?: string,
    display_data?: {
        card_display_style: string
    },
};
