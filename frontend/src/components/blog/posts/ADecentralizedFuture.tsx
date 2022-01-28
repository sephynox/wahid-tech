import React from 'react';
import { Figure } from 'react-bootstrap';
import Quote from '../../../tools/Quote';
import LightBox from '../../../tools/Lightbox';
import { InTextCitations } from '../../../tools/Citation';
import { APAInline } from '../../../tools/APACitation';

const ADecentralizedFuture = ({ r }: InTextCitations): JSX.Element => (
    <>
        <section>
            <h3 id="Introduction">Introduction</h3>
            <p>
                The internet is arguably one of the most important innovations in our modern times. I remember the
                internet&apos;s &ldquo;Netscape moment&rdquo; though I was only a child at the time. As an engineer and
                technologist, I would have been ecstatic to live through the Netscape moment with what I know today.
                However, as we know&mdash;at least, for now&mdash;we cannot go back in time. Although, history has an
                interesting habit of rhyming, and we may very well be experiencing the next technological breakthrough
                of our time which might once again redefine the way we interact in our societies.
            </p>
            <p>
                What many do not realize today is that the internet was met with a surprising amount of skepticism and
                at one point considered a &ldquo;passing fad&rdquo; by newspaper outlets like the Daily Mail. Quite
                frankly, it is easy to forget such things&mdash;when was the last time you questioned the importance of
                electricity? However, not unlike others throughout history who felt threatened by innovative
                technologies, the Daily Mail made statements that today would be considered absurd. One may even argue
                that today&apos;s pundits may be tomorrow&apos;s fools and to support that point, we need only to look
                back in history.
            </p>
        </section>
        <section>
            <Figure>
                <img src="/images/blog/internet-a-fad.webp" alt="Daily Mail Internet a Fad Article" />
                <figcaption>
                    Afshar, V. @ValaAfshar. (2018, April 18).{' '}
                    <cite>Internet ‘may be just a passing fad as millions give up on it&apos;</cite>, December 2000.{' '}
                    <a
                        target="_blank"
                        href="https://web.archive.org/web/20210523195547/https://twitter.com/ValaAfshar/status/1383904613598859270"
                        rel="noreferrer"
                    >
                        Twitter
                    </a>
                    .
                </figcaption>
            </Figure>
            <h3 id="Yesterdays-Experts">Yesterday&apos;s Experts</h3>
            <Quote
                quote="The truth is no online database will replace your daily newspaper, no CD-ROM can take the place 
                       of a competent teacher and no computer network will change the way government works"
                author="Clifford Stoll"
            />
            <p>
                The Daily Mail also was not the only critic of the internet. Even prominent computer scientists like
                Clifford Stoll were unable to see the internet&apos;s potential. In 1995, Stoll wrote a piece in
                Newsweek that aged quite poorly. He stated &ldquo;Visionaries see a future of telecommuting workers,
                interactive libraries and multimedia classrooms. They speak of electronic town meetings and virtual
                communities. Commerce and business will shift from offices and malls to networks and modems. And the
                freedom of digital networks will make government more democratic. Baloney. Do our computer pundits lack
                all common sense? The truth is no online database will replace your daily newspaper, no CD-ROM can take
                the place of a competent teacher and no computer network will change the way government works&rdquo;{' '}
                <APAInline r={r['citation-stoll-1995']} />. The irony is that essentially everything Stoll said would
                not come to pass did happen and more. The man literally says &ldquo;Bah&rdquo; to the prospect of
                computer-aided education&mdash;something not only common practice today but essentially mandatory if you
                are to survive in the modern age.
            </p>
            <Quote
                quote="iPhone is nothing more than a luxury bauble that will appeal to a few gadget freaks."
                author="Matthew Lynn"
            />
            <p>
                While the internet is the obvious example, the further back in time we go, the more ridiculous the
                statements begin to sound. Some of us may be aware of Steve Balmer&apos;s now famous criticisms of the
                device that changed mobile phones forever of which he stated, &ldquo;I said that is the most expensive
                phone in the world and it doesn&apos;t appeal to business customers because it doesn&apos;t have a
                keyboard which makes it not a very good email machine.&rdquo; Although that was not the only criticism
                as others like Matthew Lynn declared that the &ldquo;iPhone is nothing more than a luxury bauble that
                will appeal to a few gadget freaks&rdquo; or &ldquo;John Dvorak&apos;s predication that there was
                &ldquo;no likelihood&rdquo; Apple could succeed in the phone business&rdquo;{' '}
                <APAInline r={r['citation-weissmann-2012']} />. Today, the iPhone is arguably the most successful
                electronic device ever conceived.
            </p>
            <p>
                While a keyboard-less smartphone may be more understandable in recent times, one example that I always
                like to fall back on was the original skepticism that the first automobiles faced in America. Alexander
                Winton, a pioneer of the automotive industry was once told that &ldquo;You&apos;re crazy if you think
                this fool contraption you&apos;ve been wasting your time on will ever displace the horse.&rdquo;
                Although, it is truly inspiring that the horseless carriage was &ldquo;such an amazing production that
                no one believed it&rdquo; <APAInline r={r['citation-winton-2017']} />. It was this disbelief and utter
                lack of imagination to the possibilities for the technology that left critics making statements which
                never aged well. However, true futurists such as Thomas Edison saw the potential stating &ldquo;Talking
                of horseless carriage suggests to my mind that the horse is doomed. The bicycle, which, 10 years ago,
                was a curiosity, is now a necessity. It is found everywhere. Ten years from now you will be able to buy
                a horseless vehicle for what you would pay today for a wagon and a pair of horses.&rdquo;{' '}
                <APAInline r={r['citation-winton-2017']} />.
            </p>
            <Quote
                quote="Printed books will never equal scribed books, especially because the spelling and ornamentation 
                       of some printed books is often neglected."
                author="Johannes Trithemius"
            />
            <p>
                Which brings us to our final stop in history: the printing press. The printing press is arguably the
                most important technological innovation in human history. It was here that information society took its
                first steps toward the decentralization of information starting with the authority built up around the
                Catholic Church. The printing press was a splash that caused ripples throughout the world leading to
                entirely new fields of study that could be printed and shared in a fungible manner. Despite this, the
                experts of the day had a different and exceedingly laughable interpretation. One example is Johannes
                Trithemius, a well-known German scribe known for writing the book &ldquo;Steganographia,&rdquo; a book
                on steganography written in 1499 who once wrote &ldquo;Printed books will never equal scribed books,
                especially because the spelling and ornamentation of some printed books is often neglected&rdquo;{' '}
                <APAInline r={r['citation-chenoweth-2019']} /> believing the device would never replace the art of the
                scribe. Such a statement is absurd, and history is littered with these examples as the same
                narrow-minded and short-sighted statements are still made by pundits today about emerging technologies.
            </p>
        </section>
        <section>
            <h3 id="Distributed-Ledger-Technology">Distributed Ledger Technology</h3>
            <Quote
                quote="You must remember that every invention of this kind which is made adds to the general wealth 
                       by introducing a new system of greater economy of force. A great invention which facilitates 
                       commerce, enriches a country just as much as the discovery of vast hoards of gold."
                author="Alexander Winton"
            />
            <p>
                The phrase &ldquo;blockchain&rdquo; has been used a number of times to explain how cryptocurrencies
                operate however, the word &ldquo;blockchain&rdquo; is a bit of a misnomer itself. Some networks like
                Hedera Hashgraph utilize a directed acyclic graph (DAG) instead of a blockchain. A blockchain in its
                most simple form is just a sequential database. While Bitcoin is credited as the first blockchain, there
                was one that predated it and has been published in the New York Times since 1995{' '}
                <APAInline r={r['citation-oberhaus-2018']} />
                &mdash;a fitting harbinger of the technology given 1995 was the Internet&apos;s Netscape moment. The
                true innovation is the consensus derived distributed ledger technology (DLT). Not all cryptocurrencies
                utilize blockchain and cryptocurrencies are not the only applications for DLT. Instead, cryptocurrency
                is the first successful proof-of-concept for DLT with applications in every possible field.
            </p>
            <Figure>
                <img src="/images/blog/blockchain-diagram.png" alt="A diagram of a simple blockchain" />
                <figcaption>A Simple Blockchain</figcaption>
            </Figure>
            <p>
                How exactly does a <i>simple</i> blockchain-powered distributed ledger work? A distributed ledger system
                is comprised of three main components: the database (a blockchain or other method), a network, and the
                application. The image above is a blockchain in its simplest form. A blockchain is an ordered, and
                incremental database with each block (or state) having a sequential block number that contains an index,
                a timestamp, a one-way cryptographic hash of the block before it, and any data. The cryptographic hash
                is a string of characters which will always be the same so long as the data being hashed remains
                constant. If the data changes in any way, the hash will be completely different. So, what is the deal
                with Merkle trees? A Merkle Tree allows for quicker, more efficient verification of the chain but also
                as a measure to conserve space, memory, and CPU usage as &ldquo;old blocks can then be compacted by
                stubbing off branches of the tree&rdquo; <APAInline r={r['citation-nakamoto-2009']} />. Essentially, the
                integrity of the entire chain can be ensured by verifying the top hash (or Merkle Root) instead of
                having to verify every transaction and every block which would be time consuming. The diagram below
                demonstrates a Merkle Tree and how blocks can be compacted to a top hash by pairs. In the case of an odd
                number, the remainder is copied and paired with itself.
            </p>
            <Figure>
                <img src="/images/blog/merkle-tree-example.png" alt="An Example of Merkle Tree" />
                <figcaption>
                    An Example of Merkle Tree.{' '}
                    <a target="_blank" href="https://en.wikipedia.org/wiki/Merkle_tree" rel="noreferrer">
                        Wikipedia
                    </a>
                    .
                </figcaption>
            </Figure>
            <p>
                But what of the others? We have heard the phrase &ldquo;decentralized&rdquo; and
                &ldquo;distributed&rdquo; to describe these networks but what do they actually mean? A distributed
                network is one that spreads a task load across multiple interconnected nodes in order to achieve a
                common goal and each node can communicate with one another to facilitate that goal but operates as a
                single system. As such, these networks can very well be governed under a single authority like a
                content-driven network (CDN). In a decentralized network, each node operates with only the information
                it has also known as information locality in order to accomplish its goal. This is how networks like
                Bitcoin, Ethereum, XRP, etc. work. A rudimentary example of a decentralized network is a polygyne ant
                colony (or a colony with multiple queens). Such colonies are decentralized as each ant operates on local
                information to perform its tasks and each ant may be conducting a different task but if one queen (or
                colony) were to die, other queens and colonies would still continue to operate.
            </p>
            <p>
                There are some explanations that state that distributed networks are geographically dispersed. This is
                not entirely accurate as distributed computing systems can be physically close together although such a
                configuration would reduce fault tolerance. The key takeaway is that a distributed network distributes a
                task load across multiples nodes which work together toward a common goal. A decentralized network
                consists of multiple nodes that operate independently as their own authority using local information to
                accomplish their goals. The differences lay in their intricacies as all decentralized networks are
                distributed but not all distributed networks are decentralized. Although, the words distributed and
                decentralized can be applied to more than just computer networks, the current scope focuses on computer
                networks.
            </p>
            <p>
                So, how does a decentralized network operate on a distributed ledger? A distributed ledger system can
                utilize a database such as a blockchain and distribute that database across multiple nodes in the
                network. As the ledgers should all be the same and the instruction set is provided by the application
                which acts as the single system, the ledgers are distributed. However, the application and the method
                for establishing consensus are decentralized as the application cannot be unilaterally modified and each
                node is operating on information locality to determine the next block. So, as the ledger is the same and
                spread across multiple nodes but controlled by the application, it is distributed. As the application
                cannot be modified by singular source and each node is its own authority, the application is
                decentralized. OK, then where does this local information used by the decentralized nodes come from? The
                mempool.
            </p>
            <p>
                Sigh, what is the mempool? The mempool is an often-unnoticed part of DLT and can go by different names
                such as a transaction pool, queue, etc. Since the entire premise of DLT is to create a permanent record
                of transactions, transactions must first exist somewhere prior to being recorded in the ledgers. This is
                not unlike how information is stored in a computer&apos;s volatile memory prior to being committed to
                non-volatile storage (i.e., RAM vs. hard drive). Each node has its own mempool which it attempts to
                synchronize with other nodes. When a transaction is signed, the DApp, wallet, etc. being used sends the
                transaction to a gateway node which will verify if the transaction is well-formed and valid before
                adding it to its mempool. The node will then broadcast its transactions to other nodes on the network
                which will receive the transactions and also validate them prior to adding them to their own mempool and
                further broadcasting until the pool is replicated network-wide. From here, miners or validators can pull
                transactions from the mempool and add them to blocks.
            </p>
            <p>
                Thus, DLT and other blockchain technologies <i>can</i> create immutable records (though current
                implementations are not entirely immutable) of events that cannot be doctored or as Casey and Vigna put
                it, a &ldquo;Truth Machine&rdquo; <APAInline r={r['citation-casey-vigna-2018']} />. As a result, the
                applications for the technology are immeasurable and it is often mistakenly considered a new asset class
                for this reason. The <i>truth</i> is, it is not a new asset class but rather, it can very well be all
                asset classes as all things can be tokenized. In addition, we are beginning to change the paradigm of
                how we build software as often important elements of software such as security, interoperability, and
                privacy are no longer tacked-on afterthoughts but foundational layers of a platform. Moreover, solving
                the issues of trust can open up an unimaginable amount of opportunities as trust is a foundational
                problem that has existed in our societies since the very beginning.
            </p>
        </section>
        <section>
            <Figure>
                <img
                    src="/images/blog/crowe-fraud-small.png"
                    alt="Crowe - Global losses of fraud equate to USD 5.127 trillion"
                />
                <figcaption>
                    CroweGlobal @CroweGlobal. (2019, July 11).{' '}
                    <cite>
                        Report reveals #fraud costs the global economy $5.127 trillion with losses rising by 56% in the
                        past decade.
                    </cite>{' '}
                    <a
                        target="_blank"
                        href="https://web.archive.org/web/20210816045808/https://twitter.com/croweglobal/status/1149375727042777088"
                        rel="noreferrer"
                    >
                        Twitter
                    </a>
                    .
                </figcaption>
            </Figure>
            <h3 id="Issues-of-Trust">Issues of Trust</h3>
            <Quote
                quote="The root problem with conventional currency is all the trust that's required to make it work."
                author="Satoshi Nakamoto"
            />
            <p>
                Over five-hundred years ago, Fra Luca Bartolomeo de Pacioli published the famous book, &ldquo;Summa de
                arithmetica&rdquo; with the help of the printing press. This book was known for describing the
                principles of double-entry bookkeeping&mdash;principles which are largely unchanged to this
                day&mdash;and if cryptocurrencies are an evolution of money, then DLT can be seen as an evolution of
                accounting. This earned Pacioli the moniker of &ldquo;The Father of Accounting and Bookkeeping.&rdquo;
                Unfortunately, a problem with this system was that it required trust in the bookkeeper. Even in modern
                times, this failure of trust has been felt in examples such as Enron, WorldCom, Tyco, Freddie Mac, AIG,
                Lehman Brothers, Bernie Madoff, and many others. Yet, instances of fraud can be seen throughout all of
                history with the first record of fraud occurring in 300 B.C. when a Greek merchant attempted to commit
                insurance fraud but instead drowned when he was caught in the act{' '}
                <APAInline r={r['citation-beattie-2019']} />.
            </p>
            <p>
                However, fraud has not subsided over time but instead, accelerated to numbers that are incomprehensible.
                According to Crowe Global, a network of separate and independent accounting and consulting firms,
                &ldquo;fraud losses equate to a shocking US$5.127 trillion each year, which represents almost 70% of the
                $7.442 trillion which world spends on healthcare each year&rdquo;{' '}
                <APAInline r={r['citation-crowe-2019']} />. This is clearly not sustainable and is a major concern for
                our economic and financial systems. Moreover, if this were not troubling enough, one of the major
                enablers of this systematic problem is the same group expected to ensure it does not occur: banks.
            </p>
            <Figure>
                <LightBox
                    imageLight={'/images/blog/top-5-banks-fincen-files.png'}
                    imageDark={'/images/blog/top-5-banks-fincen-files-dark.png'}
                    imageAlt="Chart displaying the Top 5 banks in FinCen files by amount"
                />
                <figcaption>
                    [Data] ICIJ. (2020, September 20).{' '}
                    <i>
                        <cite>Global banks defy U.S. crackdowns by serving oligarchs, criminals and terrorists.</cite>
                    </i>{' '}
                    <a
                        target="_blank"
                        href="https://web.archive.org/web/20210630030416/https://www.icij.org/investigations/fincen-files/global-banks-defy-u-s-crackdowns-by-serving-oligarchs-criminals-and-terrorists"
                        rel="noreferrer"
                    >
                        ICIJ
                    </a>
                    .
                </figcaption>
            </Figure>
            <p>
                In 2020 while the world was being ravaged by the Coronavirus, the International Consortium of
                Investigative Journalists (ICIJ), the same group famously known for the Panama Papers, released a
                damning report on the international banking system. The report exposed &ldquo;more than $2 trillion in
                transactions between 1999 and 2017 that were flagged by financial institutions&apos; internal compliance
                officers&rdquo; with that number considered &ldquo;just a drop in a far larger flood of dirty money
                gushing through banks around the world&rdquo; <APAInline r={r['citation-icij-2020']} />. This same
                report is now a Pulitzer Prize finalist <APAInline r={r['citation-hudson-2021']} />. However, this
                should not come as a shock as big banks were largely responsible for the 2008 sub-prime mortgage
                crisis&mdash;after having been enabled by the government&mdash;which thrust the world into a global
                recession. The same crisis which led to statements such as banks being &ldquo;too big to fail.&rdquo; In
                reality, banks that are too big to fail are too big to exist for the simple reason that they have become
                a single point of failure and single points of failure are security risks in any critical
                infrastructure. Furthermore, despite their central role in the disaster, their punishment was to receive
                billions of dollars in emergency bailout money while average Americans lost their homes.
            </p>
            <p>
                The scandals from large banks never end as the latest (as of this writing) being the anti-trust lawsuit
                filed by the New Mexico State Investment Council &ldquo;claiming Bank of America Corporation, Citigroup
                Inc., Goldman Sachs Group Inc., and other top financial institutions rigged the credit default swap
                market by manipulating a key benchmark&rdquo; <APAInline r={r['citation-swfi-2021']} />. Prior to that,
                there was Wells Fargo&apos;s fake account scandal which the bank opened fraudulent accounts for millions
                of customers without their knowledge <APAInline r={r['citation-flitter-2020']} />. There was also JP
                Morgan&apos;s manipulation of precious-metals and treasury markets which resulted in a Racketeer
                Influenced and Corrupt Organizations (RICO) case with multiple individuals indicted and a near
                billion-dollar fine <APAInline r={r['citation-economist-2020']} />. U.S. Banks are not the only bad
                actors either with investigations into Australia&apos;s biggest banks having &ldquo;revealed rampant
                wrongdoing across the industry, including fees charged to the accounts of dead people and bribes paid to
                win mortgage business&rdquo; <APAInline r={r['citation-schroeder-2019']} />. This was all just in the
                last few years.
            </p>
            <p>
                Of course, what would the banking system be without organizations like Deutsche Bank. From helping
                pillage the Jewish people on behalf of the Nazis and lending the money to build Auschwitz{' '}
                <APAInline r={r['citation-perryer-2019']} /> to facilitating over a trillion dollars of suspect
                transactions including allegedly to the Russian mafia and terrorists{' '}
                <APAInline r={[r['citation-icij-2020'], r['citation-flitter-2021']]} /> the bank has a rap sheet as long
                as it gets. However, after the ICIJ report the bank stated &ldquo;We are a different bank now&rdquo; as
                a response. Have they changed? You decide, as recently the bank has been accused of misleading investors
                about ESG standards <APAInline r={r['citation-kowsmann-brown-2021']} />; been put on notice for
                continuing to fail to address money laundering controls{' '}
                <APAInline r={r['citation-kowsmann-strasburg-2021']} />; continuing to be embroiled in scandals such as
                being accused of engaging in practices like mis-selling foreign exchange derivatives in Spain;
                &ldquo;turning a blind eye to a years-long Ponzi scheme that involved fraudulent investments in
                Florida&rdquo; <APAInline r={r['citation-arons-2021']} />; and of course, paying millions in fines for
                having &ldquo;engaged in a criminal scheme to conceal payments to so-called consultants worldwide who
                served as conduits for bribes to foreign officials and others so that they could unfairly obtain and
                retain lucrative business projects&rdquo; <APAInline r={r['citation-doj-2021']} />.
            </p>
        </section>
        <section>
            <Figure>
                <img src="/images/blog/cryptocurrencies.png" alt="Various cryptocurrencies" />
                <figcaption>
                    Various cryptocurrencies. Image credit designwebjae,{' '}
                    <a target="_blank" href="https://pixabay.com/users/designwebjae-1753371/" rel="noreferrer">
                        Pixaby
                    </a>
                </figcaption>
            </Figure>
            <h3 id="Cryptocurrencies">Cryptocurrencies</h3>
            <Quote quote="Anyone could create money; the problem is to get it accepted." author="Hyman Minsky" />
            <p>
                One of the most subtle differences that is lost on many individuals in regard to cryptocurrencies is
                that with traditional payment methods, what is actually occurring is the <i>communication</i> of the
                transfer of value. With cryptocurrencies, what you have is the <i>actual transfer of value</i>. This
                goes back to the history of the internet and the original dilemma of the ability to transfer value over
                the internet. This problem was eventually tackled head on in 1994 just prior to the internet&apos;s
                Netscape moment by Pizza Hut with the release of &ldquo;PizzaNet.&rdquo; The service allowed people to
                order pizzas online <APAInline r={r['citation-schrage-1994']} />. While there are many stories of what
                the first actual commercial transaction over the internet was, Pizza Hut gets the widest recognition for
                being one of the first commercial operations online. Unsurprisingly, the approach was still somewhat
                mocked, considered &ldquo;half-baked&rdquo; and geeky at the time, but more importantly, the system did
                not facilitate the transfer of value over the net as payment was made upon delivery.
            </p>
            <p>
                This tradition was continued as history tends to rhyme. On May 22, 2010, an individual used bitcoin to
                pay for pizza in what is widely regarded as the first use of cryptocurrency in a commercial transaction{' '}
                <APAInline r={r['citation-moore-2020']} />. Laszlo Hanyecz paid 10,000 bitcoin for his pizzas which
                using today&apos;s value sits at around $483,784,000. However, this begs the question about what the
                value of cryptocurrencies should be. The truth is, they are worth whatever we as a society believe they
                are worth as everything is a speculative asset including land and gold. The only reason gold has value
                is because we deem it so and other mediums such as cowry shells and sticks have also been used in the
                past as money. Furthermore, the notion that gold has intrinsic value because it is tangible is absurd as
                any company can tell you that intangible things like intellectual property do indeed have immense value.
                Part of this value comes down the functions of money and the properties that make a medium more or less
                viable as a form of money.
            </p>
            <p>
                Money has three functions: a store of value, a medium of exchange, and a unit of account. This much is
                pretty textbook however, one point I find is often lost is the difference between money and currency.
                The difference is that currency has all the attributes of money except it is <i>not</i> a store of value
                and instead, a promissory note. The first examples of such notes originated in China and were known as
                &ldquo;Jiaozi.&rdquo; It is fitting from a historical perspective that China today is the first major
                economy to reinvent money with their digital Yuan. Thus, fiat is a currency and not money but the medium
                by which money is transferred. This subtle difference emerged for reasons of convenience as gold coin
                was less portable than paper notes. Which brings us to the properties of money (and currency) of which
                one is portability. Other properties include durability, divisibility, supply, fungibility (or
                uniformity), its general acceptance, and its security (or ability to counterfeit). When compared to
                traditional paper currency, cryptocurrencies have far superior properties. For example, you cannot break
                a bitcoin (although, not unlike paper money, it can be lost forever), it can be divided to 100
                millionths of a bitcoin (also known as satoshis), there is a finite supply making it deflationary, it is
                perfectly fungible, and it has security features that make forgery virtually impossible.
            </p>
            <p>
                Although not currently widely adopted, its adoption is increasing especially as nations like El Salvador
                adopt the technology as legal currency <APAInline r={r['citation-renteria-2021']} />. Moreover, sound
                money should not be useful for other purposes as it would introduce immeasurable variables that cannot
                be accounted for. For example, salt and spice were also used as money at one point in history. The issue
                with these mediums is that in addition to being used as currency, they also needed to be used for other
                purposes such as cooking or for the preservation of perishables. In comparison, gold was purely
                decorative and had no practical applications. However, today, as we very well know, gold has significant
                applications in science and technology. Additionally, Bitcoin is only one of many and not all
                cryptocurrencies have fixed supplies. Some like Ethereum implement a form of &ldquo;tokenomics&rdquo;
                which allow new ether to be issued through mining or staking and other ether to be removed by burning
                some during each transaction. This can potentially offer governments revolutionary new ways of
                self-organizing macroeconomic policy.
            </p>
            <p>
                That said, Nobel Memorial Prize in Economics winner, Friedrich August von Hayek has stated that &ldquo;I
                am more convinced than ever that if we ever again are going to have a decent money, it will not come
                from government: it will be issued by private enterprise, because providing the public with good money
                which it can trust and use can not only be an extremely profitable business; it imposes on the issuer a
                discipline to which the government has never been and cannot be subject&rdquo;{' '}
                <APAInline r={r['citation-hayek-1999']} />. This was a point he later reiterated by saying &ldquo;I
                don&apos;t believe we shall ever have a good money again before we take the thing out of the hands of
                government, that is, we can&apos;t take them violently out of the hands of government, all we can do is
                by some sly roundabout way introduce something they can&apos;t stop.&rdquo;{' '}
                <APAInline r={r['citation-smith-2019']} />. If this does not sound like cryptocurrencies, I am not sure
                what Hayek could possibly have been referring to.
            </p>
        </section>
        <section>
            <h3 id="The-Status-Quo">The Status Quo</h3>
            <p>
                However, on the other hand, Federal Reserve chair Jerome Powell and Secretary of the Treasury, Janet
                Yellen have been the most outspoken critics of cryptocurrency from within the U.S. government. Despite
                their positions, they have clear misunderstandings not just about the technology but the implications of
                it. Jerome Powell&apos;s remark that &ldquo;You wouldn&apos;t need stablecoins; you wouldn&apos;t need
                cryptocurrencies, if you had a digital U.S. currency&rdquo;{' '}
                <APAInline r={r['citation-sigalos-2021a']} /> is particularly absurd seeing as if that statement were to
                hold true, then we equally would not have a need for commodities such as gold or any currency other than
                the dollar worldwide. It is also important to note that any central bank digital currency (CBDC)
                currently being discussed will not be decentralized and will ultimately be{' '}
                <i>no different than current fiat currencies</i> beyond being in digital form and thus, completely
                collapses Mr. Powell&apos;s argument. Furthermore, his statement that &ldquo;We have a tradition in this
                country where the public&apos;s money is held in what is supposed to be a very safe asset&rdquo;{' '}
                <APAInline r={r['citation-sigalos-2021a']} /> is equally invalid seeing as that this supposedly safe
                asset is losing its purchasing power each year with wages unable to keep up with the very inflation they
                are creating.
            </p>
            <p>
                Additionally, as the U.S. dollar global reserve drops to &ldquo;its lowest level in 25 years&rdquo; with
                some analysts saying that &ldquo;this partly reflects the declining role of the US dollar in the global
                economy, in the face of competition from other currencies used by central banks for international
                transactions&rdquo; <APAInline r={r['citation-arslanalp-simpson-bell-2021']} />; with some nations like
                Russia shedding the U.S. dollar from their National Wealth Fund{' '}
                <APAInline r={r['citation-korsunskaya-marrow-2021']} />; and with the European Union looking to
                &ldquo;cut reliance on U.S. dollar&rdquo; <APAInline r={r['citation-strupczewski-2021']} />, the
                so-called &ldquo;safe-asset&rdquo; is losing its grip on the world. This is clearly not a trend limited
                to our rival nations who state, &ldquo;We need to move away from using international payment systems
                controlled by the West&rdquo; <APAInline r={r['citation-farber-osborn-2021']} /> but also friendlier
                nations that are hypercritical of the phenomenon known as the &ldquo;weaponization&rdquo; of the dollar
                and the SWIFT banking network. There is only so long that a nation can abuse its status as the world
                reserve currency before other nations decide to move on to something else. In the case of Russia, China,
                El Salvador, The EU, and many others, they are very well already on their way.
            </p>
            <p>
                So, why is the U.S. dollar the world reserve currency anyway? This goes back to the end of the second
                world war in what was known as the &ldquo;Bretton Woods System&rdquo;. In July of 1944, representatives
                from members of the U.N Monetary and Financial Conference met in Bretton Woods, New Hampshire which is
                where the agreement&apos;s name originated. The goal of the Bretton Woods System was to establish a
                system for foreign exchange. The architects of the Bretton Woods system wanted to establish a neutral
                currency to be used as the world reserve currency for which they coined the issuance the
                &ldquo;Bancor.&rdquo; In addition, the Bretton Woods System also established the International Monetary
                Fund and the World Bank. Although, the bancor did not happen as envisioned and instead, the U.S. dollar
                was used as the dollar at the time was pegged to the value of gold&mdash;this was one of the
                agreement&apos;s primary provisions. However, in 1970, then U.S. president Richard Nixon disconnected
                the dollar from the gold standard effectively dissolving the Bretton Woods System. Thus, the U.S. dollar
                being the world reserve currency is nothing more than a relic of a failed system from a bygone era and
                it is important that we recognize that and find ways to move on from it. This is especially problematic
                today as a single central bank can exercise unilateral control over a currency many nations have come to
                depend on&mdash;and as a result, has been added the United State&apos;s arsenal of weapons.
            </p>
            <p>
                Finally, Janet Yellen stated &ldquo;I think many [cryptocurrencies] are used, at least in a transaction
                sense, mainly for illicit financing&rdquo; <APAInline r={r['citation-lennon-2021']} /> when questioned
                about the technology&apos;s potential terrorism risk. Yet, the cryptocurrency market in its totality as
                of this writing sits at around $1.978 trillion which is less that the total amount reported in the
                FinCen files regarding big banks. Furthermore, her responses were not only hyperbole but flat-out
                incorrect seeing as Lennon goes on to state that in &ldquo;2020, the criminal share of all
                cryptocurrency activity fell to just 0.34% ($10.0 billion in transaction volume).&rdquo; What Yellen
                really sounds like is simply an echo from the McCarthy era. Except, today&apos;s word is
                &ldquo;terrorism&rdquo; and frankly, if terrorism financing is of actual concern to our governmental
                officials, then they should not be looking at cryptocurrency, but rather the traditional banking system.
                This is especially pressing as a &ldquo;new lawsuit filed accuses banks, including Deutsche Bank and
                Standard Chartered, of ignoring warnings that their customers were helping to finance attackers
                targeting Americans in Afghanistan&rdquo; <APAInline r={r['citation-flitter-2021']} />.
            </p>
        </section>
        <section>
            <Figure>
                <img src="/images/blog/pew-wealth-disparity.jpg" alt="Charts displaying income disparity" />
                <figcaption>
                    Pew Research Center. (2020, January 9).{' '}
                    <i>
                        <cite>Trends in income and wealth inequality</cite>
                    </i>
                    .{' '}
                    <a
                        target="_blank"
                        href="https://www.pewresearch.org/social-trends/2020/01/09/trends-in-income-and-wealth-inequality"
                        rel="noreferrer"
                    >
                        Pew Research Center
                    </a>
                    .
                </figcaption>
            </Figure>
            <h3 id="The-Rest-of-Us">The Rest of Us</h3>
            <Quote quote="Income growth has been most rapid for the top 5% of families" author="Pew Research Center" />
            <p>
                Additionally, wealth is yet to be decentralized and the current path we are on takes us in the exact
                opposite direction. The Pew Research Center shows that the &ldquo;share of American adults who live in
                middle-income households has decreased from 61% in 1971 to 51% in 2019&rdquo; and that from &ldquo;1970
                to 2018, the share of aggregate income going to middle-class households fell from 62% to 43%. Over the
                same period, the share held by upper-income households increased from 29% to 48%&rdquo;{' '}
                <APAInline r={r['citation-pew-research-center-2020']} />. At the end of 2020, the top 1% of households
                controlled $34.52T or approximately 32% of the wealth in the U.S. as well as more than the 50-90
                percentile and bottom 50 percent combined which controlled approximately 29%. This puts the top 1%
                almost 9 points higher than in 1989 while the entire bottom 50% sat at almost 10 points lower than in
                1989 <APAInline r={r['citation-the-fed-2021']} />. Additionally, the median sale price of houses in the
                last three decades has nearly quadrupled putting home ownership for many out of reach while dependance
                on banking institutions for home buying increases. This culminates into an alarming trend where the top
                1% of households are accumulating more wealth while the rest of the nation is being left with less.
            </p>
            <Figure>
                <LightBox
                    imageLight={'/images/blog/housing-prices-median.png'}
                    imageDark={'/images/blog/housing-prices-median-dark.png'}
                    imageAlt="Charts displaying median sale price of houses in the United States"
                />
                <figcaption>
                    [Data] St. Louis Fed. (2021, July 26).{' '}
                    <i>
                        <cite>Median Sales Price of Houses Sold for the United States</cite>
                    </i>
                    . FRED. https://fred.stlouisfed.org/series/MSPUS. &nbsp;
                    <a
                        target="_blank"
                        href="https://web.archive.org/web/20210829220949/https://fred.stlouisfed.org/series/MSPUS"
                        rel="noreferrer"
                    >
                        St. Louis Fed
                    </a>
                    .
                </figcaption>
            </Figure>
            <p>
                Moreover, a Federal Reserve report on U.S. household economic well-being showed that the median savings
                of American households sitting at just $5,300 <APAInline r={r['citation-the-fed-2020']} />.
                Additionally, when it comes to unexpected costs, 21% of surveyed would opt to incur some form of
                revolving debt if faced with a $400 emergency expense. 10% would borrow the money from a friend or
                family member. An additional 12% stated that they would not be able to pay for the expense as well as
                another 8% stating they would sell something. However, it should be noted that the number of people
                opting to use cash or cash equivalents has been increasing over time. Even so, the situation shows the
                vulnerability of such households as &ldquo;volatile income and low savings can turn common
                experiences&mdash;such as waiting a few days for a bank deposit to be available&mdash;into a problem for
                some&rdquo; <APAInline r={r['citation-the-fed-2019']} />. This all continues to occur as the value of
                the money these individuals do have continues to decrease as time goes on.
            </p>
        </section>
        <section>
            <h3 id="The-Forgotten">The Forgotten</h3>
            <Quote
                quote="There's no stopping crypto, [it's] the future and we won't let some old fools take our future 
                       from us ... We're Nigerians. Using the crypto is a way out of poverty for the youth."
                author="Nigerian Bitcoin User"
            />
            <p>
                Aside from the growing wealth disparities in the first world, there are those that have never had access
                to the financial system in any capacity. Despite the trillions of dollars in suspect transactions,
                assets, and revenues by banks &ldquo;too big to fail,&rdquo; nearly 2 billion people in the world remain
                unbanked or underbanked. The sad truth is that they are in this state not because it is not possible to
                provide financial inclusion for these people, it is simply not profitable to do so. In fact, in nations
                such as Ghana and Uganda, cellular airtime minutes are used as money as &ldquo;airtime&apos;s value does
                not rely directly on a government&apos;s stability or ability to hold down inflation&rdquo;{' '}
                <APAInline r={r['citation-economist-2013']} />. Despite still requiring telecom companies as an
                intermediary, this example shows that modern instruments other than central bank issued currencies can
                be used as mediums of exchange, stores of value, and units of account without the need of banks in any
                capacity.
            </p>
            <p>
                Another important scenario is the complete failure of governments. This is something that occurs far
                more often than many realize. There are two recent examples of this in 2021 alone. The first was in
                Myanmar when the country&apos;s military staged a coup d&apos;état earlier in the year after
                alleging&mdash;without evidence&mdash;that the election was the result of voter fraud. Despite the
                National League for Democracy (NLD) winning the election with an overwhelming majority and the
                nation&apos;s election commission rejecting the military&apos;s claims, the Tatmadaw seized power in the
                country, arresting elected officials and throwing the national into chaos{' '}
                <APAInline r={r['citation-maizland-2021']} />.
            </p>
            <p>
                The second example is the takeover of Afghanistan by the Taliban following the withdrawal of U.S. Forces
                from the region. The nation&apos;s financial infrastructure all but collapsed with bank runs, cash
                shortages, and a failing currency making an already devastating situation worse for millions of
                Afghanis. One individual stated, &ldquo;I live above two banks and three ATM machines, but they&apos;ve
                been off since Thursday.&rdquo; Moreover, &ldquo;Western Union has suspended all services and even the
                centuries-old &ldquo;hawala&rdquo; system &mdash; which facilitates cross-border transactions via a
                sophisticated network of money exchangers and personal contacts &mdash; for now, remains closed&rdquo;{' '}
                <APAInline r={r['citation-sigalos-2021a']} /> effectively cutting the people off from the global
                financial system. In times of need, it is clear that people in these regions cannot rely on institutions
                to come to their aid and individuals are left to fend for themselves.
            </p>
            <p>
                However, what is impressive though is that people outside of finance and banking can really make a
                difference in the world which exemplifies the very nature of decentralization. A case and point:
                Akon&apos;s Akoin. Akon is working to provide the very financial inclusion banks could care less to
                provide to people in African nations. The artist even incorporates some of the critical intricacies with
                value transfer in the region by tokenizing cellular minutes which are already being used as a form of
                money as mentioned above in places like Kenya. His message is one that is heard and felt all too often
                in such areas, that the current systems offer nothing more than &ldquo;weak and over-inflated fiat
                currencies that prevent citizens from accessing financial services western countries take for
                granted&rdquo; <APAInline r={r['citation-stevens-2020']} />. Akon&apos;s point is well made as when the
                U.S. dollar experiences inflation, second and third world nations hurt the most. It is this simple
                correlation that exposes the myth of inflation being a positive thing&mdash;inflation only benefits the
                wealthy while harming the poor.
            </p>
            <Quote
                quote="Refugees face added obstacles to obtaining proof of identity needed to claim legal rights and 
                       access all kinds of services in host communities  as documents are often lost as a result of 
                       their displacement, and they struggle to obtain new ones."
                author="Lucia Hanmer &amp; Marina Elefante"
            />
            <p>
                Thus, cryptocurrencies can have a major impact on the unbanked and underbanked providing financial
                inclusion that banks are either unable to or simply unwilling to provide. Additionally, The Pew
                Charitable Trusts has reported that &ldquo;6 in 10 unbanked consumers have a smartphone&rdquo; which
                shows that the technology can be made readily available to these individuals. Although, one challenge is
                that &ldquo;they are nearly twice as likely as banked consumers to suspend or cancel their cellphone
                plans because of the cost of maintaining coverage&rdquo;{' '}
                <APAInline r={r['citation-pew-charitable-trusts-2016']} />. As improvements to cellular infrastructure
                and even satellite internet become more readily available, some of these concerns can be remedied.
                Moreover, DLT has several other applications in these scenarios aside from facilitating payments. Some
                include ensuring identity, securing property rights, and even facilitating elections. While voting
                systems using DLT are not ready for mainstream application, the technology can eventually offer a way to
                virtually eliminate cases of voter fraud, prevent gerrymandering, and encourage more people to vote
                through an increased level of convenience. Even in countries like the United States, allegation of voter
                fraud have drawn disconcerting parallels with events in less democratic nations such as Myanmar. The
                allegations alone have had a damaging effect on reputations, undermined trust in democratic processes,
                and continue to divide an already divided nation.
            </p>
        </section>
        <section>
            <Figure>
                <img src="/images/blog/decentral-world.jpg" alt="A Decentralized World" />
                <figcaption>
                    A Decentralized World. Image credit{' '}
                    <a
                        target="_blank"
                        href="https://web.archive.org/web/20210831013812/https://pixabay.com/"
                        rel="noreferrer"
                    >
                        Pixaby
                    </a>
                </figcaption>
            </Figure>
            <h3 id="The-Future">The Future</h3>
            <Quote
                quote="The only way to discover the limits of the possible is to go beyond them into the impossible."
                author="Arthur C. Clarke"
            />
            <p>
                As the possibilities of DLT are endless, societies can begin to restore their faith in systems that have
                failed them for generations. The road ahead is not going to be easy with much of the DLT space today not
                unlike the wild west as are all new frontiers. However, as adoption increases and new networks arise, a
                world completely powered by DLT will be unrecognizable from today.
            </p>
            <p>
                While not many people think about some of the more insignificant minutia of our day-to-day, there are
                several things that are done today simply because that is how they always have been done. For example,
                payday can occur weekly, bi-weekly, semi-monthly, monthly, or by any other arbitrary denomination. It is
                not something we often think of&mdash;it just is. However, what if money could be thought of in an
                entirely new and different way? Perhaps, money could become more akin to internet bandwidth with payroll
                done every second. This approach could give individuals far more control of their finances with the
                ability to fine tune savings, bills, and even retirement in real-time.
            </p>
            <p>
                Thus, credit applications could do away with credit scores and simply determine an individual&apos;s
                average available bandwidth over a predetermined period of time. This could also change the way we pay
                bills by delegating bandwidth toward bills which automatically adjust interest rates within a
                predetermined range accepted by both parties and enforced via smart contracts. The same can apply to
                savings and retirement accounts allowing individuals to simply dial-up or dial down their various
                account streams based on their inbound and outbound streams. Account pools can allow individuals to
                predetermine their future finances whether for retirement or simply knowing exactly how long until a
                pool will run out at its current rates. Moreover, there would be far fewer surprises this way giving
                people more time to worry about other things in their lives&mdash;the very point of technology.
            </p>
            <p>
                However, money is not the only application for DLT technology. Anything from movie/plane/speeding
                tickets, licenses, academic degrees, certifications credentials, warranties, certificates of
                authenticity, and artwork can be a non-fungible or semi-fungible token (NFT/SFT). Businesses can
                leverage promotions that can span many years with loyal customers never missing out. For example, a
                movie theater can offer discounts for multi-part movies to customers that hold the ticket NFT for
                previous installments. Collectibles can be issued for those that visited a theater for a movie and
                special editions can be minted for those that saw an entire trilogy in theaters. Streaming platforms can
                simply offer the service of streaming content while allowing rights to content to be held directly by
                consumers. Simply connect your address to any streaming service and enjoy the content you own. This
                could conceivably extend to products where individuals that own an obsolete version of a product can
                receive a special promotional price for upgrading. As a result, the way advertising and direct marketing
                is done could be changed entirely. Of course, commerce is not the only aspect this technology can change
                but also property deeds, automotive titles, leases, mortgage agreements, and more can all be tokenized
                in an internet of value.
            </p>
            <p>
                Even industries like healthcare can greatly benefit from DLT and the democratization of healthcare data.
                Interoperable healthcare networks powered using DLT can offer a single source of truth for a
                patient&apos;s healthcare data. This not only eliminates issues of patient misidentification and
                incomplete records, it allows for near-perfect data liquidity. Healthcare bills, prescriptions, and
                insurance can be minted as NFTs which ensure bills, prescriptions, referrals, etc. are not lost, not
                able to be forged, and not double-charged reducing healthcare administrative costs. Data breaches would
                also not expose millions of patient records at a time. Furthermore, with improved data liquidity and
                real-time de-identification of data, organizations like the CDC and WHO can receive streams of
                population health data in real-time allowing these critical organizations to monitor possible outbreaks
                before they become epidemic. Perhaps, it may even be possible to pinpoint sources of outbreaks by
                cross-referencing regions of increased reports of say, salmonella, with agricultural supply chain data
                automatically.
            </p>
            <p>
                With governmental adoption, W2s and other tax forms can be minted by addresses with EIN NFTs which could
                trigger the start of an income stream to an employee address. However, this could conceivably open
                multiple streams of value at once: one to an employee, and the second directly to the IRS for taxes with
                the posibility of virtually eliminating tax evasion. Census data can be collected more easily and
                accurately and maintained with minimal effort especially when government networks interoperate with one
                another. Eventually, voting can be done using DLT which would not only eliminate any possible fraud,
                prevent gerrymandering, and encourage more people to vote thanks to convenience, but also, the
                legitimacy of an election cannot be called into question.
            </p>
            <p>
                Finally, no more will exist the days of guessing wildly at how to control something as complex as a
                first-world economy. Instead of massive injections of cash or removing massive amounts of cash from
                circulation using slow and antiquated methods of buying and selling bonds, self-organizing systems can
                make nano-scale changes to macroeconomic variables and automatically adjust factors to maintain and
                achieve key economic targets. These economies are as complex and interconnected as living entities and
                as such, should be treated that way using self-organizing system principles. Not only can this approach
                help ensure more stable economies, but the instantaneous feedback loops can allow governments to create
                more accurate future projections for economic growth. We can once again have sound money issued by
                central banks. Finally, software will come to life and thrive in cyberspace as self-organizing entities
                that are fully autonomous. This is all just a glimpse of the possibilities we can work toward with
                greater adoption and innovation of DLT.
            </p>
        </section>
        <section>
            <h3 id="Conclusion">Conclusion</h3>
            <Quote
                quote="If communities are to engage in exchange and forge functioning societies, they must find a way 
                       to arrive at a commonly accepted foundation of truth."
                author="Paul Vigna &amp; Michael J. Casey"
            />
            <p>
                This is the nature of self-organizing systems which enable our societies to have some measure of control
                in order to predetermine the consequences of our actions. Our societies have been traveling a path of
                decentralization for quite some time. From Martin Luther&apos;s 95 Theses and the printing press to the
                Civil Rights movement and broadcast media, until now, a technological, financial, economic, social, and
                artistic revolution&mdash;a modern renaissance&mdash;with distributed ledger technology. We have been
                breaking down centralized nexuses of power and empowering more individual people over time and with DLT,
                we are approaching a technological singularity point. The future described above may sound far-fetched
                today, but as we begin to move into a world where issues of trust become a thing of the past, anything
                is possible.
            </p>
            <p>
                The only constant in life is change and that is something we as a civilization struggle to accept. As we
                enter this brave new world, it is important to realize that humanity is at a precipice. Whether the next
                level on the Kardashev scale, a grand stage, or simply a new chapter in our story, we are entering an
                exciting era. From quantum computing, fusion energy, decentralized networks, artificial intelligence,
                and space exploration, it is hard to not think that our story is just beginning. However, there are
                grave issues such as climate change and war which threaten the very existence of our species. It is up
                to us, the people, to ensure that we have a future and demand that our leaders protect and nurture that
                future.
            </p>
            <p>
                For me, Jack Dorsey&apos;s statement where he hopes the technology &ldquo;creates world peace or helps
                create world peace&rdquo; is far more accurate than many today realize. Dorsey goes on to say that
                &ldquo;It may sound a bit ridiculous but you fix that foundational level and everything above it
                improves. It is in the long-term but my hope is definitely peace&rdquo;{' '}
                <APAInline r={r['citation-salvo-2021']} />. DLT <i>is</i> a foundational technology that may very well
                solve one of the most difficult problems in our societies: trust. Large, centralized organizations can
                no longer act as the gatekeepers to society&apos;s interests. Financial fraud will enter the halls of
                extinction and so too may the large monolithic organization. Instead of trust in money, we would have
                belief in ideas and thus, such ideas created by anyone. That is the future of DLT and consequently, the
                future of human society.
            </p>
        </section>
    </>
);

export default ADecentralizedFuture;
