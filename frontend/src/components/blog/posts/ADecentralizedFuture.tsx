import React from 'react';
import { Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import APACitation from '../../../tools/APACitation';
import Quote from '../../Quote';

const ADecentralizedFuture = (): JSX.Element => {
    const { t } = useTranslation();

    return (
        <>
            <p>
                The internet is arguably the most important innovation in our modern times. I remember the
                internet&apos;s &ldquo;Netscape moment&rdquo; though I was only a child at the time. As an engineer and
                technologist, I would have been ecstatic to live through the Netscape moment with what I know today.
                However, as we know--at least, for now--we cannot go back in time. Although, history has an interesting
                habit of rhyming and we may very well be experiencing the next technological breakthrough of our time.
            </p>
            <Container className="image-container">
                <img src="/images/blog/internet-a-fad.webp" alt="Daily Mail Internet a Fad Article" />
                <p>
                    Afshar, V. @ValaAfshar. (2018, April 18). Internet ‘may be just a passing fad as millions give up on it’,
                    December 2000.
                    &nbsp;<a target="_new" href="https://web.archive.org/web/20210523195547/https://twitter.com/ValaAfshar/status/1383904613598859270">Twitter</a>.
                </p>
            </Container>
            <p>
                What many forget is that the internet was met with a surprising amount of skepticism and at one point
                considered a &ldquo;passing fad&rdquo; by newspaper outlets like the Daily Mail. Quite frankly, it is
                easy to forget such things--when was the last time you questioned the importance of electricity? However,
                not unlike others throughout history who felt threatened by innovative technologies, the Daily Mail made
                statements that today would be considered absurd. One may even argue that today&apos;s experts may be
                tomorrow&apos;s fools and to support that point, we need only to look back in history.
            </p>
            <h3>Yesterday&apos;s Experts</h3>
            <Quote
                quote="iPhone is nothing more than a luxury bauble that will appeal to a few gadget freaks."
                author="Matthew Lynn"
            />
            <Container className="image-container">
                <img src="/images/blog/apple-iphone-jobs.jpg" alt="Steve Jobs unveiling the first iPhone" />
                <p>
                    Time Magazine. (2017, January 09). <i>Watch Steve Jobs unveil the first iPhone 10 years ago today.</i>
                    &nbsp;<a target="_new" href="https://web.archive.org/web/20170110053025if_/http://time.com/hive.org/web/20170110053025/http://time.com/4628515/steve-jobs-iphone-launch-keynote-2007">Time Magazine</a>.
                </p>
            </Container>
            <p>
                We will start with something more familiar as the further back in time we go, the more ridiculous the
                statements begin to sound. Thus, the first stop we will arrive at is the original iPhone. Some of us may
                be aware of Steve Balmer&apos;s now famous criticisms of the device for which he stated &ldquo;I said that
                is the most expensive phone in the world and it doesn&apos;t appeal to business customers because it
                doesn&apos;t have a keyboard which makes it not a very good email machine.&rdquo; Although that was not
                the only criticism as others like Matthew Lynn declared that the &ldquo;iPhone is nothing more than a
                luxury bauble that will appeal to a few gadget freaks&rdquo; or &ldquo;John Dvorak&apos;s predication
                that there was &ldquo;no likelihood&rdquo; Apple could succeed in the phone business&rdquo; (Weissmann,
                2012). Today, the iPhone is arguably the most successful electronic device ever conceived.
            </p>
            <p>
                While a keyboard-less smartphone may be more understandable in recent times, one example that I always
                like to fall back on was the original skepticism that the first automobiles faced in America. Alexander
                Winton, a pioneer of the automotive industry was once told that &ldquo;You&apos;re crazy if you think
                this fool contraption you’ve been wasting your time on will ever displace the horse.&rdquo; However,
                what was most amazing was that the horseless carriage was &ldquo;such an amazing production that no one
                believed it&rdquo; (Winton, 2017). It was this disbelief and utter lack of imagination to the possibilities
                for the technology that left so-called experts making statements which never aged well. Although, true
                futurists such as Thomas Edison saw the potential stating &ldquo;Talking of horseless carriage suggests
                to my mind that the horse is doomed. The bicycle, which, 10 years ago, was a curiosity, is now a
                necessity. It is found everywhere. Ten years from now you will be able to buy a horseless vehicle for
                what you would pay today for a wagon and a pair of horses. The money spent in the keep of the horses
                will be saved and the danger to life will be much reduced.&rdquo; (Winton, 2017).
            </p>
            <Quote
                quote="Printed books will never equal scribed books, especially because the spelling and ornamentation of some printed books is often neglected."
                author="Johannes Trithemius"
            />
            <p>
                Which brings us to our final stop in history: the printing press. The printing press is arguably the
                most important technological innovation in human history. It was here that information society took its
                first steps toward the decentralization of information starting with the authority built up around the
                Roman Catholic Church. The printing press was a splash that caused ripples throughout society leading to
                entirely new fields of study that could be written down and shared in a fungible manner. Despite this,
                the experts of the day had a different and exceedingly laughable interpretation at the time. One example
                is Johannes Trithemius, a well-known German scribe known for writing the book &ldquo;Steganographia,&rdquo;
                a book on steganography written in 1499 who wrote &ldquo;Printed books will never equal scribed books,
                especially because the spelling and ornamentation of some printed books is often neglected.&rdquo;
                (Chenoweth, 2019). Such a statement today would be utterly absurd and history is quite littered with
                these examples.
            </p>
            <Container className="image-container">
                <img src="/images/blog/crowe-fraud-small.png" alt="Crowe - Global losses of fraud equate to USD 5.127 trillion" />
                <p>
                    CroweGlobal @CroweGlobal. (2019, July 11). Report reveals #fraud costs the global economy $5.127
                    trillion with losses rising by 56% in the past decade.
                    &nbsp;<a target="_new" href="https://web.archive.org/web/20210816045808/https://twitter.com/croweglobal/status/1149375727042777088">Twitter</a>.
                </p>
            </Container>
            <h3>The Issues of Trust</h3>
            <Quote
                quote="The root problem with conventional currency is all the trust that's required to make it work."
                author="Satoshi Nakamoto"
            />
            <p>
                Over five-hundred years ago, Fra Luca Bartolomeo de Pacioli published the famous book, &ldquo;Summa de
                arithmetica&rdquo; with the help of the printing press. This book was known for describing the
                principles of double-entry bookkeeping--principles which are largely unchanged to this day. This earned
                Pacioli the moniker of &ldquo;The Father of Accounting and Bookkeeping.&rdquo; Unfortunately, a problem
                with this system was that it required trust in the bookkeeper. Even in modern times, this failure of
                trust has been felt in examples such as Enron, WorldCom, Tyco, Freddie Mac, AIG, Lehman Brothers, Bernie
                Madoff, and many others. Yet, instances of fraud can be seen throughout all of history with the first
                record of fraud occurring in 300 B.C. when a Greek merchant attempted to commit insurance fraud but
                instead drowned when he was caught in the act (Beattie, 2019).
            </p>
            <p>
                However, fraud has not subsided over time but instead, has accelerated to numbers that are
                incomprehensible. According to Crowe Global, a network of separate and independent accounting and
                consulting firms, &ldquo;fraud losses equate to a shocking US$5.127 trillion each year, which represents
                almost 70% of the $7.442 trillion which world spends on healthcare each year&rdquo; (Crowe Global,
                2019). Moreover, if this were not troubling enough, one of the major enablers of this systematic problem
                is the same group responsible for ensuring it does not occur: banks.
            </p>
            <Container className="image-container">
                <img src="/images/blog/fincen-files-top-banks.jpg" alt="Top banks suspicious transaction amounts" />
                <p>
                    ICIJ. (2020, September 20). <i>Global banks defy U.S. crackdowns by serving oligarchs, criminals and terrorists.</i>
                    &nbsp;<a target="_new" href="https://web.archive.org/web/20210630030416/https://www.icij.org/investigations/fincen-files/global-banks-defy-u-s-crackdowns-by-serving-oligarchs-criminals-and-terrorists">ICIJ</a>.
                </p>
            </Container>
            <p>
                In 2020 while the world was being ravaged by the Coronavirus, the International Consortium of Investigative
                Journalists, the same group famously known for the Panama Papers, released a damning report on the
                international banking system. The report concluded that &ldquo;more than $2 trillion in transactions
                between  1999 and 2017 that were flagged by financial institutions’ internal compliance officers&rdquo;
                with that number considered &ldquo;just a drop in a far larger flood of dirty money gushing through banks
                around the world&rdquo; (ICIJ, 2020).
            </p>
            <h3>Decentralized Ledger Technology</h3>
            <Quote
                quote="You must remember that every invention of this kind which is made adds to the general wealth by introducing a new system of greater economy of force. A great invention which facilitates commerce, enriches a country just as much as the discovery of vast hoards of gold."
                author="Alexander Winton"
            />
            <p>
                The phrase &ldquo;blockchain&rdquo; has been used a number of times to explain how cryptocurrencies
                operate however, the word &ldquo;blockchain&rdquo; is a bit of a misnomer itself. The true innovation
                is the consensus derived decentralized ledger technology (DLT). Not all cryptocurrencies
                utilize blockchains and cryptocurrencies are not the only applications for DLT.
            </p>
            <Container className="image-container">
                <img src="/images/blog/bitcoin-ether-xrp.webp" alt="Bitcoin Ethereum Ripple XRP" />
                <p>XRP, Ethereum, and Bitcoin</p>
            </Container>
            <h3>Cryptocurrencies</h3>
            <Quote quote="Anyone could create money; the problem is to get it accepted." author="Hyman Minsky" />
            <p>
                One of the most subtle differences that is lost on many individuals in regards to cryptocurrencies is
                that with traditional payment methods, what is actually occurring is the <i>communication</i> of the
                transfer of value. With cryptocurrencies, what you have is the <i>actual transfer of value</i>. This
                goes back to the history of the internet and the original dilemma of the ability to transfer value over
                the internet.
            </p>
            <p>TODO</p>
            <p>
                Moreover, Nobel Memorial Prize in Economics winner, Friedrich August von Hayek has stated that &ldquo;I
                am more convinced than ever that if we ever again are going to have a decent money, it will not come
                from government: it will be issued by private enterprise, because providing the public with good money
                which it can trust and use can not only be an extremely profitable business; it imposes on the issuer a
                discipline to which the government has never been and cannot be subject&rdquo; (Hayek 1999). This was a
                point he later reiterated by saying &ldquo;I don&apos;t believe we shall ever have a good money again
                before we take the thing out of the hands of government, that is, we can’t take them violently out of
                the hands of government, all we can do is by some sly roundabout way introduce something they can’t
                stop.&rdquo; (Smith, 2019). If this does not sound like cryptocurrencies, I am not sure what Hayek could
                possibly have been referring to.
            </p>
            <h3>Tomorrow&apos;s Fools</h3>
            <Quote
                quote="There is no evidence that we are getting a great technology--unless 'great technology' doesn't mean 'useful.'"
                author="Nassim Taleb"
            />
            <p>
                Thus, we come to the so-called experts of today and their very loud criticisms toward distributed ledger
                technology (DLT) and cryptocurrencies.
            </p>
            <h3>The Powers That Be</h3>
            <p>
                Federal Reserve chair Jerome Powell and Secretary of the Treasury, Janet Yellen have been the most
                outspoken critics of cryptocurrency from within the government. Despite their positions, they too are
                dinosaurs of a bygone era that are totally out-of-touch with reality. Jerome Powell&apos;s remark that
                &ldquo;You wouldn&apos;t need stablecoins; you wouldn&apos;t need cryptocurrencies, if you had a digital
                U.S. currency&rdquo; is particularly absurd seeing as if that statement were to hold true, then we equally
                would not have a need for commodities such as gold either. Furthermore his statement that &ldquo;We have
                a tradition in this country where the public&apos;s money is held in what is supposed to be a very safe
                asset&rdquo; is equally invalid seeing as that this supposed safe asset is losing its purchasing power
                each year with wages unable to keep up with the very inflation they are creating and clearly unable
                to control.
            </p>
            <p>
                My favorite was Janet Yellen&apos;s statements where she said &ldquo;I think many [cryptocurrencies] are
                used, at least in a transaction sense, mainly for illicit financing&rdquo; when questioned about
                the technology&apos;s potential terrorism risk. Yet, the cryptocurrency market in its totality as of
                this writing sits at around $1.978 trillion which is less that the amount reported in the FinCen files.
                Furthermore, her responses were hyperbole seeing as in &ldquo;2020, the criminal share of all
                cryptocurrency activity fell to just 0.34% ($10.0 billion in transaction volume)&rdquo; (Lennon, 2021).
                What this sounds like is simply an echo from the McCarthy era. Except, today&apos;s word is
                &ldquo;terrorism&rdquo; and quite frankly, if terrorist financing is of actual concern to our
                governmental officials then they should not be looking at cryptocurrency, but rather the traditional
                banking system.
            </p>
            <Quote
                quote="Income growth has been most rapid for the top 5% of families"
                author="Pew Research Center"
            />
            <p>
                The Pew Research Center shows that the &ldquo;share of American adults who live in middle-income
                households has decreased from 61% in 1971 to 51% in 2019&rdquo; and that from &ldquo;1970 to 2018, the
                share of aggregate income going to middle-class households fell from 62% to 43%. Over the same period,
                the share held by upper-income households increased from 29% to 48%&rdquo; ().
            </p>
            <p>
                However, despite this, what is most absurd is the hubris of our leaders for believing that a small group
                of politically appointed bureaucrats has the ability to exercise control over something as complex as
                a first world economy. An examination of the results through history shows that not only are they unable
                to meet goals, they are also unable to remain independent--a critical aspect of being a central bank.
            </p>
            <h3>The Forgotten</h3>
            <Quote
                quote="There's no stopping crypto, [it's] the future and we won't let some old fools take our future from us ... We're Nigerians. Using the crypto is a way out of poverty for the youth."
                author="Nigerian Bitcoin User"
            />
            <p>
                Aside from the growing wealth disparities in the first world, there are those that have never had
                access to the financial system in any capacity. Despite the trillions of dollars in suspect transactions,
                assets, and revenues by banks &ldquo;too big to fail,&rdquo; nearly 2 billion people in the world remain
                unbanked or underbanked. The sad truth is that they are in this state not because it is not possible to
                provide financial inclusion for these people, it is simply not profitable to do so. In fact, in nations
                such as Ghana and Uganda, cellular airtime minutes are used as money as &ldquo;airtime&apos;s value does
                not rely directly on a government&apos;s stability or ability to hold down inflation&rdquo;
                (The Economist, 2013). Despite still requiring telecom companies as an intermediary, this example shows
                that instruments other than central bank issued currencies can be used as mediums of exchange, stores
                of value, and units of account without the need of banks.
            </p>
            <p>
                Thus, cryptocurrencies can have a major impact on the unbanked and underbanked providing financial
                inclusion that banks simply cannot care to provide.
            </p>
            <h3>The Future</h3>
            <Quote
                quote="The only way to discover the limits of the possible is to go beyond them into the impossible."
                author="Arthur C. Clarke"
            />
            <p>TODO</p>
            <h3>Final Thoughts</h3>
            <p>TODO</p>
            <hr className="article-divider-bottom" />
            <p className="article-story-line capitalize">{t('references')}</p>
            <APACitation
                id="citation-aarons-2021"
                authors={[{ given: 'Steven', family: 'Arons' }]}
                date_year={2021}
                date_month="July"
                date_day={7}
                title="Deutsche bank enabled 'massive' U.S. ponzi scheme, lawsuit says"
                publisher="Bloomberg"
                archive="https://web.archive.org/web/20210724135440if_/https://www.bloomberg.com/news/articles/2021-07-23/deutsche-bank-enabled-massive-u-s-ponzi-scheme-lawsuit-says"
                url="https://www.bloomberg.com/news/articles/2021-07-23/deutsche-bank-enabled-massive-u-s-ponzi-scheme-lawsuit-says"
            />
            <APACitation
                id="citation-beattie-2019"
                authors={[{ given: 'Andrew', family: 'Beattie' }]}
                date_year={2019}
                date_month="November"
                date_day={7}
                title="The pioneers of financial fraud"
                publisher="Investopedia"
                archive="https://web.archive.org/web/20191112200830/https://www.investopedia.com/articles/financial-theory/09/history-of-fraud.asp"
                url="https://www.investopedia.com/articles/financial-theory/09/history-of-fraud.asp"
            />
            <APACitation
                id="citation-chenoweth-2019"
                authors={[{ given: 'Katie', family: 'Chenoweth' }]}
                page_start={67}
                date_year={2019}
                title="In the prosthetic tongue printing technology and the rise of the French language"
                publisher="University of Pennsylvania Press"
            />
            <APACitation
                id="citation-crowe-2019"
                date_year={2019}
                date_month="July"
                date_day={12}
                title="Fraud costs the global economy over US$5 trillion"
                site="Crowe"
                publisher="Crowe Global"
                archive="https://web.archive.org/web/20201212015823/https://www.crowe.com/global/news/fraud-costs-the-global-economy-over-us$5-trillion"
                url="https://www.crowe.com/global/news/fraud-costs-the-global-economy-over-us$5-trillion"
            />
            <APACitation
                id="citation-hertig-2021"
                authors={[{ given: 'Alyssa', family: 'Hertig' }]}
                date_year={2021}
                date_month="February"
                date_day={9}
                title="Nigerians look to P2P exchanges after crypto ban"
                site="CoinDesk"
                publisher="CoinDesk"
                archive="https://web.archive.org/web/20210209195034/https://www.coindesk.com/bitcoin-cant-be-stopped-nigerians-look-to-p2p-exchanges-after-crypto-ban"
                url="https://www.coindesk.com/bitcoin-cant-be-stopped-nigerians-look-to-p2p-exchanges-after-crypto-ban"
            />
            <APACitation
                id="citation-economist-2013"
                date_year={2013}
                date_month="January"
                date_day={19}
                title="Airtime is money"
                site="The Economist"
                publisher="The Economist"
                archive="https://web.archive.org/web/20210418020533/https://www.economist.com/finance-and-economics/2013/01/19/airtime-is-money"
                url="https://www.economist.com/finance-and-economics/2013/01/19/airtime-is-money"
            />
            <APACitation
                id="citation-hayek-1999"
                authors={[{ given: 'Friedrich', middle: 'August', family: 'Hayek' }]}
                page_start={230}
                date_year={1999}
                chapter="Toward A Free Market Monetary System"
                title="The collected works of F. A. Hayek"
                volume={6}
                publisher="University of Chicago Press"
            />
            <APACitation
                id="citation-lee-2021"
                authors={[{ given: 'Isabelle', family: 'Lee' }]}
                date_year={2021}
                date_month="June"
                date_day={23}
                title="Bitcoin is worth zero and there is no evidence that blockchain is a useful technology, Black Swan author Nassim Taleb says"
                site="Business Insider"
                publisher="Business Insider"
                archive="https://web.archive.org/web/20210730201022/https://markets.businessinsider.com/news/currencies/bitcoin-price-worth-zero-black-swan-author-nassim-taleb-blockchain-2021-6"
                url="https://markets.businessinsider.com/news/currencies/bitcoin-price-worth-zero-black-swan-author-nassim-taleb-blockchain-2021-6"
            />
            <APACitation
                id="citation-lennon-2021"
                authors={[{ given: 'Hailey', family: 'Lennon' }]}
                date_year={2021}
                date_month="January"
                date_day={19}
                title="The false narrative of Bitcoin’s role in illicit activity"
                site="Forbes"
                publisher="Forbes Magazine"
                archive="https://web.archive.org/web/20210224214412/https://www.forbes.com/sites/haileylennon/2021/01/19/the-false-narrative-of-bitcoins-role-in-illicit-activity"
                url="https://www.forbes.com/sites/haileylennon/2021/01/19/the-false-narrative-of-bitcoins-role-in-illicit-activity"
            />
            <APACitation
                id="citation-minsky-2008"
                authors={[{ given: 'Hyman', middle: 'Philip', family: 'Minsky' }]}
                page_start={17}
                date_year={2008}
                title="Stabilizing an unstable economy"
                publisher="McGraw-Hill"
            />
            <APACitation
                id="citation-nakamoto-2009"
                authors={[{ given: 'Nakamoto', family: 'Satoshi' }]}
                date_year={2009}
                date_month="February"
                date_day={11}
                title="Bitcoin open source implementation of p2p currency"
                publisher="P2P Foundation"
                archive="https://web.archive.org/web/20090221024857/https://p2pfoundation.ning.com/forum/topics/bitcoin-open-source"
                url="https://p2pfoundation.ning.com/forum/topics/bitcoin-open-source"
            />
            <APACitation
                id="citation-smith-2019"
                authors={[{ given: 'Graham', family: 'Smith' }]}
                date_year={2019}
                date_month="July"
                date_day={19}
                title="Hayek's 1984: Rediscovered footage shows Austrian economist predicting bitcoin"
                publisher="Bitcoin.com"
                archive="https://web.archive.org/web/20210225224718/https://news.bitcoin.com/hayeks-1984-rediscovered-footage-shows-austrian-economist-predicting-bitcoin"
                url="https://news.bitcoin.com/hayeks-1984-rediscovered-footage-shows-austrian-economist-predicting-bitcoin"
            />
            <APACitation
                id="citation-weissmann-2012"
                authors={[{ given: 'Jordan', family: 'Weissmann' }]}
                date_year={2012}
                date_month="June"
                date_day={29}
                title="iPhone turns 5: A short history of its famously and loudly wrong critics"
                publisher="The Atlantic"
                archive="https://web.archive.org/web/20210304042535/https://www.theatlantic.com/business/archive/2012/06/iphone-turns-5-a-short-history-of-its-famously-and-loudly-wrong-critics/259171"
                url="https://www.theatlantic.com/business/archive/2012/06/iphone-turns-5-a-short-history-of-its-famously-and-loudly-wrong-critics/259171"
            />
            <APACitation
                id="citation-winton-2017"
                authors={[{ given: 'Alexander', family: 'Winton' }]}
                date_year={2017}
                date_month="January"
                date_day={9}
                title="Get a horse! America's skepticism toward the first automobiles"
                publisher="The Saturday Evening Post"
                archive="https://web.archive.org/web/20190330062821/https://www.saturdayeveningpost.com/2017/01/get-horse-americas-skepticism-toward-first-automobiles"
                url="https://www.saturdayeveningpost.com/2017/01/get-horse-americas-skepticism-toward-first-automobiles"
            />
        </>
    );
};

export default ADecentralizedFuture;
