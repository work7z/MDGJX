// LafTools
// 
// Date: Wed, 28 Feb 2024
// Description:
// License: AGPLv3
// Copyright (C) 2024 - Present, https://laftools.dev and https://codegen.cc

import { Dot } from "../utils/TranslationUtils";

let mottoList: (() => string)[] = [

    () => Dot("q3VjkLMsP", "Friendship, exchange, cooperation and development")
    ,

    () => Dot("71L3OI9T7", "To peruse peace, promote cooperation and seek development has become the theme of the current era.")
    ,

    () => Dot("af3158", "Everything is determined... by forces over which we have no control. -Albert Einstein")
    ,

    () => Dot("ddsdf3159", "Physics is really nothing more than a search for ultimate simplicity, but so far all we have is a kind of elegant messiness. -Bill Bryson")
    ,

    () => Dot("sdf3160", "The job of theorists, especially in biology, is to suggest new experiments. A good theory makes not only predictions, but surprising predictions that then turn out to be true. -Francis Crick")
    ,

    () => Dot("f3sd162", "Biology is the study of complicated things that have the appearance of having been designed with a purpose. -Richard Dawkins")
    ,

    () => Dot("f3sd164", "Biology gives you a brain. Life turns it into a mind. -Jeffrey Eugenides")
    ,

    () => Dot("f3sd165", "In physics, you don't have to go around making trouble for yourself - nature does it for you. -Frank Wilczek")
    ,

    () => Dot("f31sq66", "Biology is really chemistry, chemistry is really physics, physics is really math. -Matt Ridley")
    ,

    () => Dot("f3sq167", "The good thing about science is that it's true whether or not you believe in it. -Neil deGrasse Tyson")
    ,

    () => Dot("f3d169", "Physics is the only real science. The rest are just stamp collecting. -Ernest Rutherford")
    ,

    () => Dot("f31q70", "Biology is the science. Evolution is the concept that makes biology unique. -Jared Diamond")
    ,

    () => Dot("f31d71", "Physics is, hopefully, simple. Physicists are not. -Edward Teller")
    ,

    () => Dot("f31q72", "Biology is the poetry of the physical world, and human biology is the poetry of our universe. -Julian Casablancas")
    ,
    () => Dot("fd3173", "Physics is imagination in a straight jacket. -John Moffat"),

    () => Dot("f31q74", "Biology is just physics that has begun to smell bad. -Nigel Calder")
    ,

    () => Dot("f31d75", "Physics is really nothing more than a search for ultimate simplicity, but so far all we have is a kind of elegant messiness. -Bill Bryson")
    ,

    () => Dot("f31x76", "Biology is the study of the complex things in the Universe. Physics is the study of the simple ones. -Richard Dawkins")
    ,

    () => Dot("f31x77", "Physics is experience, arranged in economical order. -Ernst Mach")
    ,

    () => Dot("f3q178", "Biology is not destiny. It was never more than tendency. It was just nature's first quick and dirty way to compute with meat. Chips are destiny. -Bart Kosko")
    ,

    () => Dot("f3d179", "Physics is becoming so unbelievably complex that it is taking longer and longer to train a physicist. It is taking so long, in fact, to train a physicist to the place where he understands the nature of physical problems that he is already too old to solve them. -Eugene Wigner")
    ,

    () => Dot("f3d180", "Biology is the science of life, yet many of us do not understand the basics of our own bodies. -Kathy Reichs")
    ,

    () => Dot("f31q81", "Physics is the science of the motions and actions of physical bodies conceived in terms of cause and effect. -Arthur Compton")
    ,

    () => Dot("f31qe82", "Biology is a software process. Our bodies are made up of trillions of cells, each governed by this process. You and I are walking around with outdated software running in our bodies, which evolved in a very different era. -Ray Kurzweil")
    ,

    () => Dot("f31r83", "Physics is becoming too difficult for the physicists. -David Hilbert")
    ,

    () => Dot("f318e4", "Biology is the most powerful technology ever created. DNA is software, protein are hardware, cells are factories. -Arvind Gupta")
    ,

    () => Dot("f31q52", "Pure mathematics is, in its way, the poetry of logical ideas. -Albert Einstein")
    ,

    () => Dot("f31e53", "Mathematics is the queen of the sciences. -Carl Friedrich Gauss")
    ,

    () => Dot("f31q54", "The book of nature is written in the language of mathematics. -Galileo Galilei")
    ,

    () => Dot("f3e155", "Mathematics is the door and key to the sciences. -Roger Bacon")
    ,
    () => Dot("f31q56", "Mathematics is the music of reason. -James Joseph Sylvester"),

    () => Dot("f315e7", "Mathematics knows no races or geographic boundaries. -David Hilbert")
    ,

    () => Dot("f31q58", "Mathematics is not about numbers, equations, computations, or algorithms: it is about understanding. -William Paul Thurston")
    ,

    () => Dot("f3159", "Mathematics is a game played according to certain simple rules with meaningless marks on paper. -David Hilbert")
    ,

    () => Dot("f3160", "Mathematics is the supreme judge; from its decisions there is no appeal. -Tobias Dantzig")
    ,

    () => Dot("f3161", "In mathematics the art of proposing a question must be held of higher value than solving it. -Georg Cantor")
    ,

    () => Dot("f3162", "Mathematics is a place where you can do things which you can't do in the real world. -Marcus du Sautoy")
    ,

    () => Dot("f3163", "The advancement and perfection of mathematics are intimately connected with the prosperity of the state. -Napoleon Bonaparte")
    ,

    () => Dot("f3164", "The essence of mathematics lies in its freedom. -Georg Cantor")
    ,

    () => Dot("f3165", "Mathematics is the science of what is clear by itself. -Carl Jacobi")
    ,

    () => Dot("f3166", "Mathematics, rightly viewed, possesses not only truth, but supreme beauty. -Bertrand Russell")
    ,

    () => Dot("f3167", "Mathematics is the tool specially suited for dealing with abstract concepts of any kind. -P. Dirac")
    ,

    () => Dot("f3168", "Mathematics reveals its secrets only to those who approach it with pure love, for its own beauty. -Archimedes")
    ,

    () => Dot("f3169", "Mathematics is the most beautiful and most powerful creation of the human spirit. -Stefan Banach")
    ,

    () => Dot("f3170", "The mathematician does not study pure mathematics because it is useful; he studies it because he delights in it and he delights in it because it is beautiful. -Henri Poincaré")
    ,

    () => Dot("f3171", "The study of mathematics, like the Nile, begins in minuteness but ends in magnificence. -Charles Caleb Colton")
    ,
    () => Dot("f3151", "The biggest risk is not taking any risk. -Mark Zuckerberg"),

    () => Dot("9334e", "The greatest glory in living lies not in never falling, but in rising every time we fall. – Nelson Mandela")
    ,

    () => Dot("8692e", "There are many babblers, wholly ignorant of mathematics, who dare to condemn my hypothesis, upon the authority of some part of the Bible twisted to suit their purpose. I value them not and scorn their unfounded judgment. – Nicholas Copernicus ")
    ,

    () => Dot("57eaa", "We are just an advanced breed of monkeys on a minor planet of a very average star. But we can understand the Universe. That makes us something very special. – Stephen Hawking ")
    ,

    () => Dot("0e299", "Everything is theoretically impossible until it is done. – Robert A. Heinlein")
    ,

    () => Dot("77528", "Innovation is the driving force behind progress. -John F. Kennedy")
    ,

    () => Dot("a2849", "Science is the acceptance of what works and the rejection of what does not. That needs more courage than we might think. – Jacob Bronowski")
    ,

    () => Dot("74f90", "The science of today is the technology of tomorrow. – Edward Teller ")
    ,

    () => Dot("b4603", "Life is what happens when you're busy making other plans. — John Lennon")
    ,

    () => Dot("66f12", "Science is organized knowledge. Wisdom is organized life. – Will Durant")
    ,

    () => Dot("58c03", "Innovation is a key factor in the success of any business. -Ravi Venkatesan")
    ,

    () => Dot("79f2d", "Most good programmers do programming not because they expect to get paid or get adulation by the public, but because it is fun to program. – Linus Torvalds")
    ,

    () => Dot("9412b", "First, solve the problem. Then, write the code. – John Johnson")
    ,

    () => Dot("ab5f7", "The saddest aspect of life right now is that science gathers knowledge faster than society gathers wisdom. – Isaac Asimov ")
    ,

    () => Dot("114ee", "Coding like poetry should be short and concise. ― Santosh Kalwar")
    ,

    () => Dot("e2379", "We live in a society exquisitely dependent on science and technology, in which hardly anyone knows anything about science and technology. – Carl Sagan ")
    ,

    () => Dot("72bee", "I’m not a great programmer; I’m just a good programmer with great habits. ― Kent Beck")
    ,

    () => Dot("d1820", "Until man duplicates a blade of grass, nature can laugh at his so-called scientific knowledge. – Thomas Edison")
    ,

    () => Dot("bfb8e", "Innovation is the key to staying relevant and competitive in the market. -Mark Zuckerberg")
    ,

    () => Dot("a8dd9", "Life cannot have a random beginning… the trouble is that there are about 2000 enzymes, and the chance of obtaining them all in a random trial is only one part in 10^40,000 an outrageously small probability that could not be faced even if the whole universe consisted of organic soup. – Fred Hoyle ")
    ,

    () => Dot("ea227", "The best way to predict the future is to create it. -Peter Drucker")
    ,

    () => Dot("58c5f", "If, at first, you do not succeed, call it version 1.0. ― Khayri R.R. Woulfe")
    ,

    () => Dot("a7062", "Innovation is the spark that ignites progress. -Robyn M. D’Angelo")
    ,

    () => Dot("yCsTC", "Premature optimization is the root of all evil.")
    ,

    () => Dot("4d389", "Innovation is a way of life for the successful entrepreneur. -John Rampton")
    ,

    () => Dot("398cc", "Programmers seem to be changing the world. It would be a relief, for them and for all of us, if they knew something about it.  – Ellen Ullman")
    ,

    () => Dot("46367", "Innovation is the key to unlocking growth potential. -Omar Ishrak")
    ,

    () => Dot("43e45", "There is no law except the law that there is no law. – John Archibald Wheeler ")
    ,

    () => Dot("7c59e", "Experience is the name everyone gives to their mistakes. – Oscar Wilde")
    ,

    () => Dot("40b7f", "Innovation is the only way to win in the long run. -Jeff Immelt")
    ,

    () => Dot("9d18a", "Software comes from heaven when you have good hardware. – Ken Olsen")
    ,

    () => Dot("850c1", "The scientist only imposes two things, namely truth and sincerity, imposes them upon himself and upon other scientists. – Erwin Schrödinger")
    ,

    () => Dot("380da", "Programming today is a race between software engineers striving to build bigger and better idiot-proof programs and the Universe trying to produce bigger and better idiots. So far, the Universe is winning. ― Rick Cook")
    ,

    () => Dot("91f08", "The best thing about technology is that it allows you to concentrate on your vision and forget the machinery. – John Landis")
    ,

    () => Dot("8259a", "Programmer: A machine that turns coffee into code. – Anonymous")
    ,

    () => Dot("38127", "Testing is the process of trying to break the code - Anonymous")
    ,
    () => Dot("beb6e", "Ideas are easy. Implementation is hard. -Guy Kawasaki"),
    () => Dot("f0d15", "Computers are fast; developers keep them slow. – Anonymous"),

    () => Dot("adcca", "Any fool can write code that a computer can understand. Good programmers write code that humans can understand. ― Martin Fowler")
    ,

    () => Dot("32c8d", "If debugging is the process of removing bugs, then programming must be the process of putting them in. – Sam Redwine")
    ,

    () => Dot("19775", "Science is a way of life. It is a perspective. Science is the process that takes us from confusion to understanding in a manner that’s precise, predictive, and reliable – a transformation, for those lucky enough to experience it, that is empowering and emotional. – Brian Greene ")
    ,

    () => Dot("aa2f1", "Exploration is what you do when you don’t know what you’re doing. That’s what scientists do every day. If a scientist already knew what they were doing, they wouldn’t be discovering anything, because they already knew what they were doing. – Neil deGrasse Tyson")
    ,

    () => Dot("92941", "There’s real poetry in the real world. Science is the poetry of reality. – Richard Dawkins")
    ,

    () => Dot("9251d", "Innovation is a key factor in any company’s ability to succeed in the long run. -Elon Musk")
    ,

    () => Dot("d7dc4", "Testing is the process of evaluating a system or its component(s) with the intent to find whether it satisfies the specified requirements or not - Anonymous")
    ,

    () => Dot("63d47", "Quality is a product of a conflict between programmers and testers. ― Yegor Bugayenk")
    ,
    () => Dot("a8a34", "Innovation is the calling card of the future. -Anna Eshoo"),

    () => Dot("42641", "Web development is difficult, only then it is fun to do. You just have to set your standards. If it were to be easy, would anyone do it? ― Olawale Daniel")
    ,

    () => Dot("420b0", "Successful innovation requires a commitment to collaboration and open communication. -Rachel D. Ellison")
    ,

    () => Dot("afcb9", "Nothing has such power to broaden the mind as the ability to investigate systematically and truly all that comes under thy observation in life. – Marcus Aurelius ")
    ,

    () => Dot("321e0", "Debugging is twice as hard as writing the code in the first place.  Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it - Brian W. Kernighan")
    ,

    () => Dot("f7cf7", "There are in fact two things, science and opinion; the former begets knowledge, the latter ignorance. – Hippocrates")
    ,

    () => Dot("fdd2b", "Science is organized knowledge. Wisdom is organized life. – Immanuel Kant ")
    ,

    () => Dot("3d297", "What I love about science is that as you learn, you don’t really get answers. You just get better questions. – John Green")
    ,

    () => Dot("dc662", "The only real mistake is the one from which we learn nothing - John Powell")
    ,

    () => Dot("886d1", "We feel that even if all possible scientific questions be answered, the problems of life have still not been touched at all. – Ludwig Wittgenstein")
    ,

    () => Dot("532fd", "Innovation is the ability to see change as an opportunity, not a threat. -Steve Jobs")
    ,

    () => Dot("626bf", "If we knew what it was we were doing, it would not be called research, would it? – Albert Einstein ")
    ,

    () => Dot("9cb71", "Innovation is about creating value for customers and improving their lives. -Reed Hastings")
    ,

    () => Dot("1a8b9", "The scientist is not a person who gives the right answers, he’s one who asks the right questions. – Claude Levi-Strauss")
    ,

    () => Dot("a3508", "Equipped with his five senses, man explores the universe around him and calls the adventure Science. – Edwin Hubble")
    ,

    () => Dot("e984f", "Clean code always looks like it was written by someone who cares. — Robert C. Martin")
    ,

    () => Dot("63470", "A real scientist solves problems, not wails that they are unsolvable. – Anne McCaffrey")
    ,

    () => Dot("d10c9", "Innovation is the key to unlocking new potential and unlocking new markets. -Tim Cook")
    ,

    () => Dot("6a0da", "The art and science of asking questions is the source of all knowledge. – Thomas Berger ")
    ,

    () => Dot("f96ff", "Innovation is the driver of progress and success in business. -Satya Nadella")
    ,

    () => Dot("7714b", "Innovation is the key to unlocking new opportunities and driving growth. ")
    ,

    () => Dot("de47c", "Testing is the art of finding a black box and making it sing - James Bach")
    ,

    () => Dot("f29b1", "Progress is made by trial and failure; the failures are generally a hundred times more numerous than the successes, yet they are usually left unchronicled. – William Ramsay ")
    ,

    () => Dot("8c224", "No matter which field of work you want to go in, it is of great importance to learn at least one programming language. ― Ram Ray")
    ,

    () => Dot("e097e", "Innovation is about creating new possibilities, not just new products. -Tony Robbins")
    ,

    () => Dot("f477b", "Programming is the art of algorithm design and the craft of debugging errant code. – Ellen Ullman")
    ,

    () => Dot("277a9", "Science cannot solve the ultimate mystery of nature. And that is because, in the last analysis, we ourselves are a part of the mystery that we are trying to solve. – Max Planck")
    ,

    () => Dot("57225", "Innovation is the lifeblood of a thriving business. -Michael Dell")
    ,

    () => Dot("aa3a4", "Code is like humor. When you have to explain it, it’s bad. – Cory House")
    ,

    () => Dot("33aa4", "Science is just pure empiricism, and by virtue of its method, it excludes metaphysics. – Steve Martin")
    ,

    () => Dot("ee7d0", "The feeling of awed wonder that science can give us is one of the highest experiences of which the human psyche is capable. – Richard Dawkins")
    ,

    () => Dot("b194e", "Innovation comes from the producer – not from the customer. -W. Edwards Deming")
    ,

    () => Dot("18f46", "Rockets are cool. There’s no getting around that. – Elon Musk")
    ,

    () => Dot("cae2c", "Innovation is the process of taking ideas and turning them into a reality. -Neil Lawrence")
    ,

    () => Dot("92b29", "Innovation is the process of taking a creative idea and turning it into a commercial success. -Richard Branson")
    ,

    () => Dot("bc574", "Innovation is the lifeblood of a healthy business. -Mark Cuban")
    ,

    () => Dot("149c0", "In questions of science, the authority of a thousand is not worth the humble reasoning of a single individual. – Galileo Galilei")
    ,

    () => Dot("5a8a1", "Innovation is the process of taking an idea and turning it into reality. -Kevin O’Leary")
    ,

    () => Dot("9469a", "Everybody should learn to program a computer because it teaches you how to think. – Steve Jobs")
    ,

    () => Dot("d366a", "Innovation is the key to unlocking new growth. -Philip Kotler")
    ,

    () => Dot("74a91", "Testing leads to failure, and failure leads to understanding - Burt Rutan")
    ,

    () => Dot("da74c", "Speculation and the exploration of ideas beyond what we know with certainty are what lead to progress. – Lisa Randall")
    ,

    () => Dot("5db54", "Science is the great antidote to the poison of enthusiasm and superstition. – Adam Smith")
    ,

    () => Dot("394b6", "If you thought that science was certain ? well, that is just an error on your part. – Richard Feynman")
    ,

    () => Dot("85805", "An expert is a person who has made all the mistakes that can be made in a very narrow field. – Neils Bohr ")
    ,
    () => Dot("fc805", "Innovation is creativity with a job to do. – Tom Peters."),
    () => Dot("66187", "Talk is cheap. Show me the code. ― Linus Torvalds"),

    () => Dot("f12bb", "Innovation is the driving force behind progress in the business world. It is the process of generating new ideas and turning them into tangible products, services, or processes that deliver value to customers.")
    ,

    () => Dot("188cd", "Programming is learned by writing programs. ― Brian Kernighan")
    ,

    () => Dot("45cb0", "Innovation is not just about creating new ideas, but it’s also about executing them successfully. -Arun Pandit")
    ,

    () => Dot("4cf03", "Actually, everything that can be known as a number; for it is impossible to grasp anything with the mind or to recognize it without this. – Philolaus ")
    ,

    () => Dot("90b5e", "It’s not a bug; it’s an undocumented feature. ― Anonymous")
    ,
    () => Dot("8e5d0", "Innovation is the call of the future. – Kofi Annan"),

    () => Dot("2b7f7", "I’m sure the universe is full of intelligent life. It’s just been too intelligent to come here. – Arthur C. Clarke ")
    ,

    () => Dot("ddcc7", "Innovation is the key to success in the modern economy. -Satya Nadella")
    ,

    () => Dot("80972", "Of course, bad code can be cleaned up. But it’s very expensive. — Robert C. Martin")
    ,

    () => Dot("c7cfc", "A good test is one that has a high probability of breaking the code if there is a problem - Michael Bolton")
    ,

    () => Dot("66ef1", "Good code is its own best documentation.  As you’re about to add a comment, ask yourself, ‘How can I improve the code so that this comment isn’t needed? ’ - Steve McConnell")
    ,

    () => Dot("nh1W-", "Testing can only prove the presence of bugs, not their absence - Edsger Dijkstra")
    ,
    () => Dot("7e19d", "Confusion is part of programming. ― Felienne Hermans"),

    () => Dot("bc92f", "Successful innovation starts with a customer need. -Michael Dell")
    ,

    () => Dot("0a310", "There is no royal road to science, and only those who do not dread the fatiguing climb of its steep paths have a chance of gaining its luminous summits. – Karl Marx")
    ,

    () => Dot("4da84", "You might not think that programmers are artists, but programming is an extremely creative profession. It’s logic-based creativity. – John Romero")
    ,

    () => Dot("8582b", "If we want users to like our software, we should design it to behave like a likable person.  – Alan Cooper")
    ,

    () => Dot("cd4d1", "Innovation is the key to business growth. -Andrew R. Steinberg")
    ,

    () => Dot("dcebe", "If debugging is the process of removing software bugs, then programming must be the process of putting them in - Edsger Dijkstra")
    ,

    () => Dot("0a710", "Innovation is the lifeblood of any organization. -Dr. R. L. Bhatia")
    ,

    () => Dot("15999", "Innovation is the process of making changes in something established. -Innovation Definition Team")
    ,

    () => Dot("1d71a", "We are born at a given moment, in a given place, and like vintage years of wine, we have the qualities of the year and of the season of which we are born. Astrology does not lay claim to anything more. – Carl Jung ")
    ,

    () => Dot("0ba15", "Successful innovation requires taking calculated risks. -Harvard Pruden")
    ,
    () => Dot("98d3f", "Science is magic that works. – Kurt Vonnegut"),

    () => Dot("a0ab0", "Art is the tree of life. Science is the tree of death. – William Blake ")
    ,

    () => Dot("d0624", "Innovation is not just about coming up with new ideas, but it’s about executing them effectively. -Jeff Bezos")
    ,
    () => Dot("afe52", "There is always one more bug to fix.  – Ellen Ullman"),

    () => Dot("68518", "Software and cathedrals are much the same — first we build them, then we pray.")
    ,

    () => Dot("f814a", "When I wrote this code, only God and I understood what I did. Now only God knotools.  – Anonymous")
    ,
    () => Dot("ac615", "Make it work, make it right, make it fast. – Kent Beck"),

    () => Dot("16987", "Sometimes it pays to stay in bed on Monday, rather than spending the rest of the week debugging Monday’s code. – Dan Salomon")
    ,

    () => Dot("59f7d", "Innovation is the catalyst for progress and growth. -John Donahoe")
    ,

    () => Dot("7d4e4", "Innovation is about finding new and better ways to do things. -Jim Rohn")
    ,

    () => Dot("1ff27", "Science is what we understand well enough to explain to a computer; art is everything else. – Donald E. Knuth")
    ,

    () => Dot("fa94e", "Innovation is the key to staying ahead in the competitive race. -Paul Sloane")
    ,

    () => Dot("23f61", "Innovation is not just about having a good idea; it’s about making that idea a reality. -Erik Qualman")
    ,

    () => Dot("1da5a", "Innovation is the foundation of progress and success in the modern business world. -Larry Page")
    ,

    () => Dot("f23c2", "Innovation distinguishes between a leader and a follower. -Steve Jobs")
    ,

    () => Dot("00d36", "The best way to predict the future is to invent it. -Alan Kay")
    ,

    () => Dot("b5014", "Many of life’s failures are people who did not realize how close they were to success when they gave up.– Thomas A. Edison")
    ,

    () => Dot("b2724", "Programming is the art of telling another human being what one wants the computer to do. ― Donald Ervin Knuth")
    ,

    () => Dot("22f3a", "Innovation is the central issue in economic prosperity. – Michael Porter")
    ,

    () => Dot("a5354", "It is strange that only extraordinary man-made the discoveries twitch later appear so easy and simple. – George C. Lichtenberg ")
    ,

    () => Dot("7affb", "The world will not wait for us. The technological revolution will leave us behind if we do not catch up. – Kofi Annan")
    ,

    () => Dot("662f9", "You only live once, but if you do it right, once is enough. — Mae West")
    ,

    () => Dot("b19bb", "The day science begins to study non-physical phenomena, it will make more progress in one decade than in all the previous centuries of its existence. – Nikola Tesla")
    ,

    () => Dot("1883d", "Science is vastly more stimulating to the imagination than the classics. – J. B. S. Haldane")
    ,

    () => Dot("15424", "That’s the whole problem with science. You’ve got a bunch of empiricists trying to describe things of unimaginable wonder. – Bill Watterson")
    ,

    () => Dot("27ef9", "Innovation is the ability to convert ideas into invoices. -L. Duncan")
    ,

]

export default mottoList