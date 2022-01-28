import * as Constants from '../../Constants';
import { Author } from '../../tools/Citation';
import { Image } from '../../tools/Lightbox';
import ImageXRPLRust from '../../resources/images/projects/xrpl-rust.png';

export type Project = {
    name: string;
    path: string;
    language: string;
    authors: Array<Author>;
    description: string;
    image: Image;
    repo_url: string;
    readme: string;
    tags: Array<string>;
    date: Date;
    modified?: Date;
    comments?: boolean;
};

const ProjectData: Record<string, Project> = {
    'xrpl-rust': {
        name: 'xrpl-rust',
        path: 'xrpl-rust',
        language: 'rust',
        authors: [Constants.AUTHOR_ME],
        description:
            'A pure Rust implementation for interacting with the XRP Ledger. The xrpl-rust crate simplifies the hardest parts of XRP Ledger interaction including serialization and transaction signing while providing idiomatic Rust functionality for XRP Ledger transactions and core server API (rippled) objects.',
        image: {
            url: ImageXRPLRust,
            alt: 'XRPL + Rust',
        },
        repo_url: 'https://github.com/589labs/xrpl-rust',
        readme: 'https://raw.githubusercontent.com/589labs/xrpl-rust/main/README.md',
        tags: ['dlt', 'blockchain', 'xrpl', 'rust'],
        date: new Date(2021, 9, 30, 0, 0, 0),
        comments: true,
    },
};

export const Projects: string[] = ['xrpl-rust'];

export default ProjectData;
